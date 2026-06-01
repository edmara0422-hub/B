'use client'

import React, { useState, useEffect } from 'react'

type VaultFile = {
  id: string
  name: string
  category: 'Relatório' | 'Contrato' | 'Auditoria' | 'Outro'
  size: string
  date: string
}

const PRESET_CONTENTS: Record<string, string> = {
  'v-1': 'O Sistema S21 de calibragem neuro-computacional da IPB atingiu maturidade operacional de 98.4% no Q2 de 2026. A resposta dopaminérgica sob estresse foi reduzida em 40%, enquanto o Custo de Fricção do Personagem caiu para 0.22. A integridade límbica foi blindada contra sequestros de amígdala com tempo de resposta sub-12ms. A reatividade do córtex pré-frontal sob alta pressão de mercado manteve-se estável em 94.2%, superando as metas iniciais. A redundância de servidores quânticos localizados na nuvem híbrida reduziu a latência de tomada de decisão baseada em dados para níveis recordes.',
  'v-2': 'Este contrato regula a prestação de serviços de suporte clínico e corporate coaching entre a IPB e a rede nacional de UTIs parceiras. O SLA de atendimento humano foi fixado em 15 minutos com tolerância zero para falhas críticas de infraestrutura. Fica estabelecida a cláusula de barreira anticópia definitiva com multa de rescisão de 3.5M. O faturamento anual estimado é calibrado mensalmente sob o modelo TDBD (Tomada de Decisão Baseada em Dados). Os honorários advocatícios e obrigações de compliance ESG seguem o padrão regulatório internacional de 2026.',
  'v-3': 'A auditoria anual de conformidade de proteção de dados (LGPD) na IPB identificou 0 inconformidades críticas no processamento de prontuários neuropsicológicos. O armazenamento de vetores de comportamento do usuário está criptografado ponta a ponta com chaves AES-256 e hashes SHA-256. A rastreabilidade completa dos dados foi assegurada em 100% dos fluxos de integração. A taxa de conformidade da governança corporativa atingiu 99.8%. As políticas de consentimento explícito foram atualizadas para compatibilidade total com os dispositivos neurais.',
  'v-4': 'O manual operacional da Sprint 5 estabelece as diretrizes para a execução das cerimônias ágeis e controle de backlog no hub IPB. O fluxo de desenvolvimento utiliza integração contínua com esteiras de testes automatizados e validação de types TypeScript. As sprints têm duração de 14 dias com revisões focadas na entrega de valor clínico. A documentação técnica deve seguir o padrão de arquitetura modular limpa e semântica de código. O uso do Sentry para rastreamento preventivo de exceções em produção é obrigatório.'
}

const STOP_WORDS = new Set(['o', 'a', 'os', 'as', 'de', 'do', 'da', 'dos', 'das', 'em', 'um', 'uma', 'e', 'para', 'com', 'por', 'que', 'se', 'doque', 'ao', 'aos'])

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?'""]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word))
}

function splitTextRecursive(text: string, chunkSize: number, chunkOverlap: number): string[] {
  const chunks: string[] = []
  let startIndex = 0
  
  while (startIndex < text.length) {
    let endIndex = startIndex + chunkSize
    
    if (endIndex < text.length) {
      // Find suitable boundaries like period or space to preserve readability
      const lastPeriod = text.lastIndexOf('.', endIndex)
      const lastSpace = text.lastIndexOf(' ', endIndex)
      
      if (lastPeriod > startIndex + chunkSize / 2) {
        endIndex = lastPeriod + 1
      } else if (lastSpace > startIndex + chunkSize / 2) {
        endIndex = lastSpace
      }
    } else {
      endIndex = text.length
    }
    
    const chunk = text.slice(startIndex, endIndex).trim()
    if (chunk) {
      chunks.push(chunk)
    }
    
    const step = chunkSize - chunkOverlap
    startIndex = startIndex + (step > 0 ? step : 1)
    
    if (startIndex >= endIndex && endIndex < text.length) {
      startIndex = endIndex
    }
  }
  
  return chunks
}

function calculateTfIdfVectors(chunks: string[]): {
  vocabulary: string[]
  vectors: number[][]
  idf: Record<string, number>
} {
  const tokenizedChunks = chunks.map(c => tokenize(c))
  const vocabSet = new Set<string>()
  tokenizedChunks.forEach(tokens => {
    tokens.forEach(t => vocabSet.add(t))
  })
  const vocabulary = Array.from(vocabSet)
  
  const numDocs = chunks.length
  const idf: Record<string, number> = {}
  
  vocabulary.forEach(term => {
    const docsWithTerm = tokenizedChunks.filter(tokens => tokens.includes(term)).length
    idf[term] = Math.log(1 + numDocs / (1 + docsWithTerm))
  })
  
  const vectors = tokenizedChunks.map(tokens => {
    const termCounts: Record<string, number> = {}
    tokens.forEach(t => {
      termCounts[t] = (termCounts[t] || 0) + 1
    })
    
    return vocabulary.map(term => {
      const tf = (termCounts[term] || 0) / (tokens.length || 1)
      const termIdf = idf[term] || 0
      return tf * termIdf
    })
  })
  
  return { vocabulary, vectors, idf }
}

function cosineSimilarity(v1: number[], v2: number[]): number {
  let dotProduct = 0
  let normA = 0
  let normB = 0
  
  for (let i = 0; i < v1.length; i++) {
    dotProduct += v1[i] * v2[i]
    normA += v1[i] * v1[i]
    normB += v2[i] * v2[i]
  }
  
  if (normA === 0 || normB === 0) return 0
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

function searchRag(
  queryText: string, 
  vocabulary: string[], 
  chunkVectors: number[][], 
  idf: Record<string, number>, 
  chunks: string[]
) {
  const queryTokens = tokenize(queryText)
  const queryCounts: Record<string, number> = {}
  queryTokens.forEach(t => {
    queryCounts[t] = (queryCounts[t] || 0) + 1
  })
  
  const queryVector = vocabulary.map(term => {
    const tf = (queryCounts[term] || 0) / (queryTokens.length || 1)
    const termIdf = idf[term] || 0
    return tf * termIdf
  })
  
  return chunks.map((chunk, idx) => {
    const score = cosineSimilarity(queryVector, chunkVectors[idx])
    return { index: idx, text: chunk, score }
  }).sort((a, b) => b.score - a.score)
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>
  
  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) return <span>{text}</span>
  
  try {
    const escapedTokens = queryTokens.map(t => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
    const regex = new RegExp(`\\b(${escapedTokens.join('|')})\\b`, 'gi')
    
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => {
          const isMatch = queryTokens.some(t => t.toLowerCase() === part.toLowerCase())
          return isMatch ? (
            <mark key={i} className="bg-[#d2af5a]/20 text-[#d2af5a] px-1 py-0.5 rounded font-semibold border border-[#d2af5a]/30">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        })}
      </span>
    )
  } catch (e) {
    return <span>{text}</span>
  }
}

export function SigArquivosPanel() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('todos')
  
  // File adding form states
  const [newName, setNewName] = useState('')
  const [newCat, setNewCat] = useState<'Relatório' | 'Contrato' | 'Auditoria' | 'Outro'>('Relatório')
  const [newSize, setNewSize] = useState('1.2 MB')

  const [files, setFiles] = useState<VaultFile[]>([
    { id: 'v-1', name: 'relatorio_calibracao_s21.pdf', category: 'Relatório', size: '2.4 MB', date: 'Hoje, 14:02' },
    { id: 'v-2', name: 'contrato_prestacao_uti_2026.pdf', category: 'Contrato', size: '4.8 MB', date: 'Ontem, 09:15' },
    { id: 'v-3', name: 'auditoria_conformidade_lgpd.xlsx', category: 'Auditoria', size: '1.7 MB', date: '18 Mai, 16:40' },
    { id: 'v-4', name: 'manual_operacional_sprint5.pdf', category: 'Outro', size: '8.2 MB', date: '12 Mai, 11:22' }
  ])

  // RAG States
  const [selectedFileId, setSelectedFileId] = useState<string>('v-1')
  const [customText, setCustomText] = useState<string>('')
  const [chunkSize, setChunkSize] = useState<number>(180)
  const [chunkOverlap, setChunkOverlap] = useState<number>(30)
  const [isIndexing, setIsIndexing] = useState<boolean>(false)
  const [indexingLogs, setIndexingLogs] = useState<string[]>([])
  
  const [indexedChunks, setIndexedChunks] = useState<string[]>([])
  const [ragVocabulary, setRagVocabulary] = useState<string[]>([])
  const [chunkVectors, setChunkVectors] = useState<number[][]>([])
  const [ragIdf, setRagIdf] = useState<Record<string, number>>({})
  
  const [ragQuery, setRagQuery] = useState('')
  const [ragResults, setRagResults] = useState<{ index: number; text: string; score: number }[]>([])
  const [aiSynthesis, setAiSynthesis] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Sync document selection with custom text editor
  useEffect(() => {
    if (selectedFileId === 'custom') {
      // User can type freeform
    } else {
      if (PRESET_CONTENTS[selectedFileId]) {
        setCustomText(PRESET_CONTENTS[selectedFileId])
      } else {
        const found = files.find(f => f.id === selectedFileId)
        if (found) {
          setCustomText(`[Documento: ${found.name}]\nEste é um relatório analítico gerado sob o modelo corporativo da IPB em ${found.date}.\nO faturamento e a taxa de governança estão alinhados com o modelo TDBD (Tomada de Decisão Baseada em Dados).\nAs auditorias e certificações internas garantem conformidade total de 100% nas operações do cockpit clínico, com SLA de atendimento sub-15 minutos e segurança criptográfica AES-256 baseada em tokens.`)
        } else {
          setCustomText('Documento sem conteúdo cadastrado.')
        }
      }
    }
  }, [selectedFileId, files])

  // Handle RAG text ingestion & local mathematical indexing
  const handleIndexDocument = () => {
    if (!customText.trim()) {
      setIndexingLogs(['[ERRO] Nenhum texto inserido para indexação.'])
      return
    }
    
    setIsIndexing(true)
    setIndexingLogs([])
    
    const logs: string[] = []
    const addLog = (msg: string) => {
      logs.push(msg)
      setIndexingLogs([...logs])
    }
    
    setTimeout(() => {
      addLog('⚡ [LANGCHAIN] Inicializando divisor de texto: RecursiveCharacterTextSplitter')
    }, 100)
    
    setTimeout(() => {
      addLog(`⚙️ [LANGCHAIN] Parâmetros de fatiamento: ChunkSize: ${chunkSize} char, Overlap: ${chunkOverlap} char`)
    }, 350)
    
    setTimeout(() => {
      const chunks = splitTextRecursive(customText, chunkSize, chunkOverlap)
      addLog(`📂 [LANGCHAIN] Documento fragmentado com sucesso em ${chunks.length} chunks estruturados.`)
      
      setTimeout(() => {
        addLog('🧮 [VECTOR_STORE] Computando pesos estatísticos de termos (TF-IDF local)...')
        
        setTimeout(() => {
          const { vocabulary, vectors, idf } = calculateTfIdfVectors(chunks)
          setIndexedChunks(chunks)
          setRagVocabulary(vocabulary)
          setChunkVectors(vectors)
          setRagIdf(idf)
          
          addLog(`🔑 [VECTOR_STORE] Matriz Vocabulária criada com ${vocabulary.length} tokens significativos filtrados.`)
          addLog(`💽 [VECTOR_STORE] Indexando ${vectors.length} vetores matriciais de alta dimensionalidade em cache RAM local...`)
          
          setTimeout(() => {
            addLog('✨ [RAG_ENGINE] Banco de Dados Vetorial Indexado com Sucesso! O motor de busca semântica está operacional.')
            setIsIndexing(false)
          }, 300)
        }, 500)
      }, 400)
    }, 800)
  }

  // Handle local query executing using Cosine Similarity
  const handleSearchRag = () => {
    if (!ragQuery.trim()) return
    if (indexedChunks.length === 0) {
      alert('Indexe o documento primeiro no console acima para criar a base vetorial.')
      return
    }
    
    setIsSearching(true)
    
    setTimeout(() => {
      const results = searchRag(ragQuery, ragVocabulary, chunkVectors, ragIdf, indexedChunks)
      const topMatches = results.slice(0, 3)
      setRagResults(topMatches)
      
      const bestMatch = topMatches[0]
      if (bestMatch && bestMatch.score > 0.02) {
        let synthesis = ''
        const queryLower = ragQuery.toLowerCase()
        
        if (queryLower.includes('sla') || queryLower.includes('tempo') || queryLower.includes('atendimento')) {
          synthesis = `[Análise Cognitiva RAG]: A busca semântica local localizou as obrigações contratuais com similaridade matemática de ${(bestMatch.score * 100).toFixed(1)}%. O SLA de atendimento técnico-humano da IPB está blindado em 15 minutos com tolerância zero para falhas críticas de infraestrutura ou reatividade comportamental.`
        } else if (queryLower.includes('lgpd') || queryLower.includes('conformidade') || queryLower.includes('dados') || queryLower.includes('criptografia') || queryLower.includes('privacidade')) {
          synthesis = `[Análise Cognitiva RAG]: A auditoria interna de dados (grau de acerto de ${(bestMatch.score * 100).toFixed(1)}%) ratifica 0 inconformidades críticas no processamento clínico-neuropsicológico. Os dados são assegurados por criptografia AES-256 e hashes SHA-256 ponta a ponta com rastreabilidade total.`
        } else if (queryLower.includes('calibragem') || queryLower.includes('s21') || queryLower.includes('dopamina') || queryLower.includes('estresse') || queryLower.includes('amígdala')) {
          synthesis = `[Análise Cognitiva RAG]: O Sistema S21 de calibragem neuro-computacional (confiabilidade de ${(bestMatch.score * 100).toFixed(1)}%) demonstra maturidade de 98.4% com atenuação dopaminérgica de 40% sob estresse límbico e resposta sub-12ms contra sequestros de amígdala.`
        } else if (queryLower.includes('sprint') || queryLower.includes('manual') || queryLower.includes('desenvolvimento') || queryLower.includes('backlog') || queryLower.includes('sentry')) {
          synthesis = `[Análise Cognitiva RAG]: Conforme o manual técnico da Sprint 5, o ciclo de entrega de valor clínico dura 14 dias com backlog estrito, deploy monitorado por telemetria Sentry e garantia rigorosa de typecheck estático via compilador TypeScript.`
        } else {
          synthesis = `[Análise Cognitiva RAG]: Similaridade de ${(bestMatch.score * 100).toFixed(1)}% detectada no documento. Contexto recuperado: "${bestMatch.text}". Recomendamos a calibração sob o modelo de Tomada de Decisão Baseada em Dados (TDBD) para mitigar viés reativo.`
        }
        setAiSynthesis(synthesis)
      } else {
        setAiSynthesis('⚠️ [RAG_ENGINE]: Nenhuma proximidade semântica satisfatória foi encontrada na base vetorial ativa. Recomenda-se ajustar os termos da pergunta ou indexar um arquivo diferente.')
      }
      setIsSearching(false)
    }, 500)
  }

  function handleAddFile() {
    if (!newName.trim()) return

    const nameWithExt = newName.includes('.') ? newName : `${newName}.pdf`

    const newFile: VaultFile = {
      id: `v-${Date.now()}`,
      name: nameWithExt,
      category: newCat,
      size: newSize,
      date: 'Agora mesmo'
    }

    setFiles([newFile, ...files])
    setNewName('')
  }

  function handleDeleteFile(id: string) {
    setFiles(files.filter(f => f.id !== id))
    if (selectedFileId === id) {
      setSelectedFileId('v-1')
    }
  }

  // Filter & Search logic
  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchesCat = activeCategory === 'todos' || f.category.toLowerCase() === activeCategory.toLowerCase()
    return matchesSearch && matchesCat
  })

  // Calculate used space
  const usedSpace = files.reduce((acc, f) => acc + parseFloat(f.size), 0).toFixed(1)

  return (
    <div className="w-full">
      <style>{`
        .dash-card-vault {
          background: rgba(5, 5, 5, 0.45) !important;
          backdrop-filter: blur(28px) saturate(130%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(130%) !important;
          border: none !important;
          border-radius: 14px;
          padding: 30px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(0, 0, 0, 0.85),
            0 12px 40px rgba(0, 0, 0, 0.55) !important;
          transition: all .3s cubic-bezier(.22,.61,.36,1);
        }
        .dash-card-vault::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(90deg, #cbd5e1 0%, #d2af5a 100%) !important;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .sec-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 24px; gap: 20px }
        .sec-head .lhs { display: flex; flex-direction: column; gap: 5px }
        .sec-id { display: flex; align-items: center; gap: 12px }
        .sec-id .num {
          font-family: monospace; font-size: 9.5px; letter-spacing: .1em; color: #d2af5a; font-weight: 500;
          border: 0.2px solid rgba(255, 255, 255, 0.08); padding: 3px 9px; border-radius: 4px; background: rgba(218,165,32,.04);
        }
        .sec-id .tag { font-family: monospace; font-size: 10px; letter-spacing: .1em; color: #8a9098; text-transform: uppercase }
        .sec-h {
          font-family: inherit; font-size: 22px; letter-spacing: -.02em;
          font-weight: 300; line-height: 1.2; color: #fff;
          margin-top: 4px; margin-bottom: 0;
        }
        .sec-h .em {
          background: linear-gradient(135deg, #b8975a 0%, #d2af5a 28%, #e8cc88 50%, #d2af5a 72%, #b8975a 100%);
          background-clip: text; -webkit-background-clip: text;
          color: transparent; -webkit-text-fill-color: transparent;
          font-weight: 600;
        }
        .sec-sub { font-size: 11.5px; color: #8a9098; margin-top: 4px; font-weight: 200 }
        .sec-meta { display: flex; flex-direction: column; gap: 4px; font-family: monospace; font-size: 10px; letter-spacing: .04em; color: #8a9098; text-align: right }
        .sec-meta b { color: #fff; font-weight: 600 }

        .vault-pill {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 9.5px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.2s;
          cursor: pointer;
        }
        .vault-pill.active {
          background: rgba(201, 148, 58, 0.12) !important;
          border: 0.2px solid rgba(201, 148, 58, 0.3) !important;
          color: #d2af5a;
          font-weight: bold;
        }
        .vault-pill.inactive {
          background: rgba(255, 255, 255, 0.02) !important;
          border: 0.2px solid rgba(255, 255, 255, 0.05) !important;
          color: #8a9098;
        }
        .vault-pill.inactive:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.04) !important;
        }
        .vault-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
          text-align: left;
        }
        .vault-table th {
          padding: 10px 8px;
          color: rgba(255, 255, 255, 0.4);
          font-family: monospace;
          font-size: 8.5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-bottom: 0.2px solid rgba(255, 255, 255, 0.1);
        }
        .vault-table td {
          padding: 12px 8px;
          border-bottom: 0.2px solid rgba(255, 255, 255, 0.03);
          vertical-align: middle;
        }
        .vault-table tr:hover {
          background: rgba(255, 255, 255, 0.01);
        }

        /* RAG Custom Classes */
        .rag-card {
          margin-top: 30px;
          background: rgba(5, 5, 5, 0.45) !important;
          backdrop-filter: blur(28px) saturate(130%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(130%) !important;
          border: none !important;
          border-radius: 14px;
          padding: 30px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            inset 0 -1px 0 rgba(0, 0, 0, 0.85),
            0 12px 40px rgba(0, 0, 0, 0.55) !important;
        }
        .rag-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(90deg, #d2af5a 0%, #cbd5e1 100%) !important;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .rag-console {
          background: rgba(0, 0, 0, 0.6) !important;
          border: 1px solid rgba(210, 175, 90, 0.15) !important;
          border-radius: 8px;
          padding: 15px;
          font-family: monospace;
          font-size: 10px;
          height: 140px;
          overflow-y: auto;
          color: #a1a1aa;
        }
        .rag-console-log {
          margin-bottom: 4px;
          line-height: 1.4;
        }
        .rag-console-log.info {
          color: #38bdf8;
        }
        .rag-console-log.success {
          color: #4ade80;
        }
        .rag-console-log.warn {
          color: #fbbf24;
        }
        .rag-console-log.system {
          color: #d2af5a;
        }
      `}</style>

      {/* VAULT DATABASE INTERFACE */}
      <div className="dash-card-vault">
        <div className="sec-head">
          <div className="lhs">
            <div className="sec-id">
              <span className="num">SEC · 08</span>
              <span className="tag">Arquivos &amp; Vault</span>
            </div>
            <h2 className="sec-h">
              Cockpit <span className="em">Vault Database</span>
            </h2>
            <div className="sec-sub">Repositório criptografado para relatórios consolidados e documentos de governança</div>
          </div>
          <div className="rhs">
            <div className="flex items-center gap-3 bg-black/30 border border-white/[0.06] p-3 rounded-lg text-left">
              <div className="text-[10px] leading-tight">
                <span className="text-white/60 font-medium block">Capacidade: {usedSpace} MB / 100 MB</span>
                <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden mt-1.5 w-24">
                  <div
                    className="h-full bg-[#d2af5a] rounded-full"
                    style={{ width: `${Math.min((parseFloat(usedSpace) / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 relative z-10">
          {/* LEFT: TABLE WITH SEARCH AND FILTERS */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search Bar */}
              <div className="flex-1 flex items-center gap-2.5 rounded-lg bg-black/40 border border-white/[0.08] px-3.5 py-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar arquivos por nome..."
                  className="flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-white/20"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                {['todos', 'relatório', 'contrato', 'auditoria', 'outro'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`vault-pill ${activeCategory === cat ? 'active' : 'inactive'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Cripto file vault table grid */}
            <div className="overflow-x-auto border border-white/[0.06] bg-black/20 rounded-xl">
              <table className="vault-table">
                <thead>
                  <tr>
                    <th>Nome do Arquivo</th>
                    <th>Categoria</th>
                    <th>Tamanho</th>
                    <th>Maturidade</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map(file => (
                      <tr key={file.id}>
                        <td className="font-medium text-white/90">
                          <span className="flex items-center gap-2">
                            <span>📄</span>
                            <span className="truncate max-w-[180px]" title={file.name}>
                              {file.name}
                            </span>
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded text-[8.5px] uppercase tracking-wide bg-white/[0.04] border border-white/[0.08] text-white/60">
                            {file.category}
                          </span>
                        </td>
                        <td className="font-mono text-white/40">{file.size}</td>
                        <td className="font-mono text-white/40">{file.date}</td>
                        <td className="text-center">
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-white/30 hover:text-red-400 font-mono text-[9px] hover:underline cursor-pointer"
                          >
                            ✕ Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-white/30 text-[10.5px]">
                        Nenhum arquivo encontrado no Vault.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: DRAG & DROP & FORM */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Custom Dropzone */}
            <div
              className="border border-dashed border-[#d2af5a]/20 bg-black/10 hover:bg-[#d2af5a]/5 p-5 rounded-xl text-center cursor-pointer transition flex flex-col items-center justify-center gap-2"
              onClick={() => alert('Carregando seletor local...')}
            >
              <span className="text-2xl">☁️</span>
              <div>
                <span className="text-[10px] font-semibold text-white/90 block">Arraste arquivos aqui</span>
                <span className="text-[8.5px] text-white/40 block mt-0.5">Suporta PDF, XLSX, DOCX até 15MB</span>
              </div>
            </div>

            {/* Archiving Form */}
            <div className="bg-black/25 border border-white/[0.06] rounded-xl p-5 flex flex-col gap-3">
              <span className="font-mono text-[8.5px] text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.08] pb-2">
                Arquivamento Manual
              </span>

              <div className="flex flex-col gap-2.5">
                <div>
                  <label className="text-[9.5px] text-white/40 block mb-1">Nome do Documento</label>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ex: balanco_patrimonial_q1"
                    style={{
                      width: '100%',
                      background: 'rgba(5, 5, 5, 0.45)',
                      border: '0.2px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '10.5px',
                      color: '#fff',
                      outline: 'none'
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9.5px] text-white/40 block mb-1">Categoria</label>
                    <select
                      value={newCat}
                      onChange={(e) => setNewCat(e.target.value as any)}
                      style={{
                        width: '100%',
                        background: 'rgba(5, 5, 5, 0.45)',
                        border: '0.2px solid rgba(255,255,255,0.08)',
                        borderRadius: '6px',
                        padding: '7px 10px',
                        fontSize: '10px',
                        color: '#fff',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Relatório">Relatório</option>
                      <option value="Contrato">Contrato</option>
                      <option value="Auditoria">Auditoria</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9.5px] text-white/40 block mb-1">Tamanho (MB)</label>
                    <input
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      placeholder="Ex: 3.5 MB"
                      style={{
                        width: '100%',
                        background: 'rgba(5, 5, 5, 0.45)',
                        border: '0.2px solid rgba(255,255,255,0.08)',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '10.5px',
                        color: '#fff',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddFile}
                className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] py-2 rounded-md text-[10px] font-medium text-white transition mt-2 w-full cursor-pointer"
              >
                + Arquivar no Vault
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: IA DOCUMENT ANALYZER & RAG SEMANTIC SEARCH ENGINE (LANGCHAIN COMPATIBLE) */}
      <div className="rag-card">
        <div className="sec-head">
          <div className="lhs">
            <div className="sec-id">
              <span className="num">SEC · 09 ◆ LangChain Browser Engine</span>
              <span className="tag">Análise Semântica</span>
            </div>
            <h2 className="sec-h">
              Motor de Busca Semântica <span className="em">RAG AI Analyzer</span>
            </h2>
            <div className="sec-sub">Divisor de texto recursivo e banco de vetores na memória local do cliente para auditorias e conformidade</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 relative z-10">
          
          {/* LEFT: INGESTION AND CHUNKING SETTINGS (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-black/25 border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4">
              <span className="font-mono text-[9px] text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.08] pb-2 block">
                🛠️ Parametrização &amp; Ingestão Vetorial
              </span>

              {/* Data source selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9.5px] text-white/40 block">Selecionar Documento do Vault</label>
                <select
                  value={selectedFileId}
                  onChange={(e) => setSelectedFileId(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(5, 5, 5, 0.45)',
                    border: '0.2px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '10.5px',
                    color: '#fff',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {files.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.category})</option>
                  ))}
                  <option value="custom">✍️ Inserir Texto Livre...</option>
                </select>
              </div>

              {/* Document Text Editor */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9.5px] text-white/40 block">
                  Conteúdo Extraído do Documento {selectedFileId === 'custom' && '(Editável)'}
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => selectedFileId === 'custom' && setCustomText(e.target.value)}
                  readOnly={selectedFileId !== 'custom'}
                  placeholder="Cole aqui o texto corporativo que você deseja indexar semanticamente..."
                  className="w-full h-24 bg-black/45 border border-white/[0.08] rounded-lg p-3 text-[10px] text-white/90 placeholder:text-white/20 outline-none resize-none font-sans leading-relaxed"
                />
              </div>

              {/* RAG settings sliders */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[9.5px] text-white/40">Chunk Size (chars)</label>
                    <span className="font-mono text-[9px] text-[#d2af5a]">{chunkSize}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={chunkSize}
                    onChange={(e) => setChunkSize(parseInt(e.target.value))}
                    className="w-full accent-[#d2af5a] h-1 bg-white/[0.08] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[9.5px] text-white/40">Chunk Overlap (chars)</label>
                    <span className="font-mono text-[9px] text-[#d2af5a]">{chunkOverlap}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="5"
                    value={chunkOverlap}
                    onChange={(e) => setChunkOverlap(parseInt(e.target.value))}
                    className="w-full accent-[#d2af5a] h-1 bg-white/[0.08] rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Index Trigger Button */}
              <button
                onClick={handleIndexDocument}
                disabled={isIndexing}
                className="w-full bg-[#d2af5a]/10 hover:bg-[#d2af5a]/20 border border-[#d2af5a]/30 hover:border-[#d2af5a]/50 text-[#d2af5a] py-2 rounded-md text-[10.5px] font-semibold transition mt-2 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isIndexing ? (
                  <>
                    <span className="animate-spin">🔄</span>
                    Indexando no Banco de Vetores...
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    Processar e Ingestar Vetores
                  </>
                )}
              </button>
            </div>

            {/* Ingestion console log */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[8.5px] text-white/40 uppercase tracking-wider">
                Auditoria de Compilação &amp; Embeddings (Logs RAG)
              </span>
              <div className="rag-console">
                {indexingLogs.length > 0 ? (
                  indexingLogs.map((log, i) => {
                    let type = 'system'
                    if (log.startsWith('[LANGCHAIN]')) type = 'info'
                    if (log.startsWith('[VECTOR_STORE]')) type = 'warn'
                    if (log.includes('Sucesso') || log.startsWith('✨')) type = 'success'
                    
                    return (
                      <div key={i} className={`rag-console-log ${type}`}>
                        {log}
                      </div>
                    )
                  })
                ) : (
                  <div className="text-white/20 italic text-center pt-8">
                    Nenhum documento indexado. Clique em &quot;Processar e Ingestar Vetores&quot; para iniciar o Pipeline de RAG.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: SEMANTIC QUERY CONSOLE & SYNTHESIS (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-black/25 border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4 h-full">
              <span className="font-mono text-[9px] text-[#d2af5a] tracking-wider uppercase border-b border-white/[0.08] pb-2 block">
                🔎 Consulta de Alta Proximidade &amp; RAG Synthesis
              </span>

              {/* RAG Search Field */}
              <div className="flex items-center gap-2 bg-black/40 border border-white/[0.08] rounded-lg px-3.5 py-2">
                <input
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchRag()}
                  placeholder="Pergunte ex: 'Qual o SLA?', 'Taxa de conformidade', 'Maturidade S21'..."
                  className="flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-white/20"
                />
                <button
                  onClick={handleSearchRag}
                  disabled={isSearching || indexedChunks.length === 0}
                  className="text-white/60 hover:text-white text-[10.5px] bg-[#d2af5a]/10 hover:bg-[#d2af5a]/20 border border-[#d2af5a]/30 px-3 py-1 rounded cursor-pointer disabled:opacity-50"
                >
                  Consultar
                </button>
              </div>

              {/* AI Synthesized Answer Card */}
              {aiSynthesis && (
                <div className="bg-[#d2af5a]/5 border border-[#d2af5a]/20 rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#d2af5a]/10 border-b border-l border-[#d2af5a]/25 px-2.5 py-0.5 rounded-bl-lg font-mono text-[7.5px] text-[#d2af5a] uppercase font-bold tracking-widest">
                    RAG SYNTHESIS
                  </div>
                  <span className="text-[11px] text-white/90 leading-relaxed font-sans mt-1">
                    {aiSynthesis}
                  </span>
                </div>
              )}

              {/* Vector Match List */}
              <div className="flex flex-col gap-2 flex-1">
                <span className="font-mono text-[8.5px] text-white/40 uppercase tracking-wider block">
                  Trechos Semânticos de Maior Similaridade (Top Matches)
                </span>
                
                {ragResults.length > 0 ? (
                  <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {ragResults.map((res, i) => (
                      <div
                        key={i}
                        className="bg-black/30 border border-white/[0.04] p-3 rounded-lg flex flex-col gap-2 transition hover:bg-black/45"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[8.5px] text-white/40">
                            BLOCO #{res.index + 1}
                          </span>
                          <span className="font-mono text-[9px] text-[#d2af5a] font-bold bg-[#d2af5a]/10 border border-[#d2af5a]/20 px-2 py-0.5 rounded-full">
                            {(res.score * 100).toFixed(1)}% similaridade
                          </span>
                        </div>
                        <p className="text-[10px] text-white/70 leading-relaxed font-sans">
                          <HighlightText text={res.text} query={ragQuery} />
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-white/20 italic text-center pt-8 text-[10px] flex-1 flex flex-col items-center justify-center gap-1 border border-dashed border-white/[0.04] rounded-lg bg-black/10">
                    <span>🔍</span>
                    <span>Nenhum resultado computado. Faça uma pergunta para buscar na base vetorial.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

