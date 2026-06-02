'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Sparkles, 
  Terminal as TerminalIcon, 
  Cpu, 
  Settings, 
  Play, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Image as ImageIcon, 
  Sliders, 
  Video, 
  Film, 
  Volume2, 
  VolumeX, 
  ShieldCheck,
  Languages,
  Code2,
  HelpCircle,
  Binary,
  Compass
} from 'lucide-react'

interface Message {
  sender: 'bot' | 'user'
  text: string
  thought?: string // Linha de raciocínio do modelo (Gemma 4, DeepSeek-V4 ou Grok 4.1 Fast)
}

type ModelType =
  | 'gemini-3.1-pro'
  | 'gemini-3.1-pro-preview'
  | 'gemini-3.1-pro-preview-customtools'
  | 'gemini-3-flash-preview'
  | 'gemini-3-pro-image-preview'
  | 'gemini-3-pro-preview'
  | 'gemini-3.5-flash'
  | 'gemini-3.1-flash-lite'
  | 'gemini-3.1-flash-lite-preview'
  | 'translation-llm'
  | 'grok-4.3'
  | 'grok-4.20-non-reasoning'
  | 'grok-4.1-fast-reasoning'
  | 'grok-4.1-fast-non-reasoning'
  | 'gemma-4-moe'
  | 'deepseek-v4-pro'
  | 'deepseek-v4-flash'
  | 'llama-4-maverick'
  | 'llama-4-scout'
  | 'llama-3.3'
  | 'mimo-v2.5'
  | 'qwen-3.5-397b'
  | 'minimax-m2'
  | 'minimax-m2.1'
  | 'minimax-m2.5'
  | 'minimax-m2.7'
  | 'glm-5'
  | 'gemma-3-27b'
  | 'medgemma-1.5-4b'
  | 'qwen-3-next'
  | 'gpt-oss'
  | 'jina-embeddings-v3'
  | 'voyage-multimodal-3.5'
  | 'voyage-4-lite'

export function HudAi() {
  const [model, setModel] = useState<ModelType>('gemini-3.1-pro')
  const [reasoningMode, setReasoningMode] = useState<'non-think' | 'think-high' | 'think-max'>('think-high')
  const [showThinking, setShowThinking] = useState(true)
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { 
      sender: 'bot', 
      text: 'Olá, <em>Edmara</em>. Carreguei os recursos Ultra do **GCP Vertex AI**! Os novos modelos **Gemini 3.5 Flash (1M)**, **Gemini 3.1 Flash Lite (GA)** e o personalizado **Translation LLM** estão ativos! Também disponibilizei a suíte flagship **Grok 4.3**, os modelos **Qwen3.5 (397B)**, **MiniMax-M2/M2.7 (MoE)**, a infraestrutura **GLM-5 (Slime RL)** e os ultra-rápidos **Grok 4.1 Fast (Reasoning/Non-Reasoning)** operando no cockpit!' 
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [thinkingOutput, setThinkingOutput] = useState<string>('')
  
  // Controle de Abas do Painel Direito (Model Garden vs GCP Multimodal Studio vs Adaptive Translation vs Jina & Voyage Embeddings Sandbox)
  const [rightPanelTab, setRightPanelTab] = useState<'garden' | 'multimodal' | 'translate' | 'embeddings'>('garden')

  // Controle de código (Python vs curl)
  const [codeLanguageTab, setCodeLanguageTab] = useState<'python' | 'curl'>('python')

  // Express Mode Toggle para Gemini Models
  const [expressMode, setExpressMode] = useState(false)

  // Controle de Simulação de Implantação GCP Model Garden (DeepSeek-V4 & Gemma 4 & Llama 4 & Xiaomi MiMo & Voyage)
  const [tuningActive, setTuningActive] = useState(false)
  const [tuningStep, setTuningStep] = useState(0)
  const [tuningLogs, setTuningLogs] = useState<string[]>([])
  const [tuningProgress, setTuningProgress] = useState(0)

  // Controle de Geração Multimodal (Imagen 4 vs Veo 3)
  const [multimodalType, setMultimodalType] = useState<'image' | 'video'>('image')

  // Imagen 4 Parameters
  const [imagenModel, setImagenModel] = useState<'imagen-4.0-generate-001' | 'imagen-4.0-ultra-generate-001' | 'imagen-4.0-fast-generate-001'>('imagen-4.0-ultra-generate-001')
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '3:4' | '4:3'>('16:9')
  const [enhancePrompt, setEnhancePrompt] = useState(true)
  const [imagePrompt, setImagePrompt] = useState('Sleek dark-mode corporate dashboard, champagne gold gradients, NASA-style mission control room')
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [imagenLogs, setImagenLogs] = useState<string[]>([])

  // Veo 3 Video Parameters
  const [veoResolution, setVeoResolution] = useState<'1080p' | '720p' | '4k'>('1080p')
  const [veoAudio, setVeoAudio] = useState(true)
  const [videoPrompt, setVideoPrompt] = useState('Cinematic slow-motion pan of our gold business analytics cube, rotating smoothly with glowing lines, high-end corporate soundtrack')
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)
  const [generatedVideos, setGeneratedVideos] = useState<string[]>([])
  const [veoLogs, setVeoLogs] = useState<string[]>([])
  const [operationId, setOperationId] = useState<string>('')

  // Translation LLM Adaptive Studio Parameters
  const [targetLang, setTargetLang] = useState<'pt' | 'es' | 'ja' | 'en'>('pt')
  const [sourceLang, setSourceLang] = useState<'en' | 'pt' | 'es' | 'ja'>('en')
  const [glossaryInput, setGlossaryInput] = useState('IPB = Plataforma de Inteligência\nEBITDA = Lucro Operacional\nRunway = Tempo de Sobrevivência')
  const [translationInput, setTranslationInput] = useState('Welcome to the IPB enterprise system. Our EBITDA is solid and our Runway is 99 months.')
  const [translationOutput, setTranslationOutput] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationLogs, setTranslationLogs] = useState<string[]>([])

  // Jina Embeddings v3 Parameters
  const [jinaTask, setJinaTask] = useState<'retrieval.query' | 'retrieval.passage' | 'separation' | 'classification' | 'text-matching'>('text-matching')
  const [jinaDimensions, setJinaDimensions] = useState<32 | 64 | 128 | 256 | 512 | 768 | 1024>(1024)
  const [jinaLateChunking, setJinaLateChunking] = useState(false)
  const [jinaNormalized, setJinaNormalized] = useState(true)
  const [jinaInput, setJinaInput] = useState('Welcome to the IPB enterprise system. Our EBITDA runway is solid.')
  const [embeddingResult, setEmbeddingResult] = useState<any>(null)
  const [isEmbedding, setIsEmbedding] = useState(false)
  const [embeddingLogs, setEmbeddingLogs] = useState<string[]>([])

  // Voyage Multimodal 3.5 Parameters
  const [voyageInputText, setVoyageInputText] = useState('Welcome to the IPB enterprise system. This is a gold business analytics cube.')
  const [voyageHasImage, setVoyageHasImage] = useState(true)
  const [voyageHasVideo, setVoyageHasVideo] = useState(false)
  const [voyageInputType, setVoyageInputType] = useState<'query' | 'document' | 'null'>('null')
  const [voyageDimensions, setVoyageDimensions] = useState<256 | 512 | 1024 | 2048>(1024)
  const [voyageDataType, setVoyageDataType] = useState<'float' | 'int8' | 'uint8' | 'binary' | 'ubinary'>('float')
  const [voyageResult, setVoyageResult] = useState<any>(null)
  const [isVoyageEmbedding, setIsVoyageEmbedding] = useState(false)
  const [voyageLogs, setVoyageLogs] = useState<string[]>([])

  // Voyage 4 Lite Parameters
  const [voyage4Texts, setVoyage4Texts] = useState('Machine learning enables computers to learn from data.\nNatural language processing helps computers understand human language.\nComputer vision allows machines to interpret visual information.')
  const [voyage4InputType, setVoyage4InputType] = useState<'query' | 'document' | 'null'>('document')
  const [voyage4Dimensions, setVoyage4Dimensions] = useState<256 | 512 | 1024 | 2048>(1024)
  const [voyage4DataType, setVoyage4DataType] = useState<'float' | 'int8' | 'uint8' | 'binary' | 'ubinary'>('float')
  const [voyage4Result, setVoyage4Result] = useState<any>(null)
  const [isVoyage4Embedding, setIsVoyage4Embedding] = useState(false)
  const [voyage4Logs, setVoyage4Logs] = useState<string[]>([])
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const tuningLogsEndRef = useRef<HTMLDivElement | null>(null)
  const imagenLogsEndRef = useRef<HTMLDivElement | null>(null)
  const veoLogsEndRef = useRef<HTMLDivElement | null>(null)
  const translationLogsEndRef = useRef<HTMLDivElement | null>(null)
  const embeddingLogsEndRef = useRef<HTMLDivElement | null>(null)
  const voyageLogsEndRef = useRef<HTMLDivElement | null>(null)
  const voyage4LogsEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, isLoading, thinkingOutput])

  useEffect(() => {
    tuningLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [tuningLogs])

  useEffect(() => {
    imagenLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [imagenLogs])

  useEffect(() => {
    veoLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [veoLogs])

  useEffect(() => {
    translationLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [translationLogs])

  useEffect(() => {
    embeddingLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [embeddingLogs])

  useEffect(() => {
    voyageLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [voyageLogs])

  useEffect(() => {
    voyage4LogsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [voyage4Logs])

  // Se selecionar Translation LLM ou Jina/Voyage Embeddings, muda a aba do painel direito automaticamente
  useEffect(() => {
    if (model === 'translation-llm') {
      setRightPanelTab('translate')
    } else if (model === 'jina-embeddings-v3' || model === 'voyage-multimodal-3.5' || model === 'voyage-4-lite') {
      setRightPanelTab('embeddings')
    } else if (
      model.startsWith('gemini') ||
      model.startsWith('grok') ||
      model.startsWith('llama') ||
      model === 'qwen-3.5-397b' ||
      model.startsWith('minimax') ||
      model === 'glm-5' ||
      model === 'gemma-3-27b' ||
      model === 'medgemma-1.5-4b' ||
      model === 'qwen-3-next' ||
      model === 'gpt-oss'
    ) {
      setRightPanelTab('garden')
    }
  }, [model])

  // --- TRADUÇÃO ADAPTATIVA (TRANSLATION LLM) ---
  const handleAdaptiveTranslation = () => {
    if (isTranslating) return
    setIsTranslating(true)
    setTranslationOutput('')
    setTranslationLogs([
      `[GLOSSARY] Carregando dicionário corporativo do usuário...`,
      `[GLOSSARY] ${glossaryInput.split('\n').filter(Boolean).length} termos de glossary identificados.`,
      `[ADAPTIVE] Alinhando pares de exemplos paralelos de aprendizado em poucos disparos (few-shot)...`,
      `[API-CALL] Projetando chamada na API avançada de Tradução: general/translation-llm`,
      `[CONNECTING] Parent: projects/business-syllabus-dev/locations/us-central1`
    ])

    let step = 0
    const interval = setInterval(() => {
      step++
      if (step === 1) {
        setTranslationLogs(prev => [
          ...prev,
          `[GLOSSARY-CHECK] Aplicando termos restritos do glossário para '${sourceLang}' ➔ '${targetLang}'...`,
          ...glossaryInput.split('\n').filter(Boolean).map(line => {
            const parts = line.split('=')
            return `  ├─ Forçando mapeamento: "${parts[0]?.trim()}" ➔ "${parts[1]?.trim()}"`
          })
        ])
      } else if (step === 2) {
        setTranslationLogs(prev => [
          ...prev,
          `[VIRTUAL-STUDIO] Computando pesos do modelo de destilação da Vertex AI...`,
          `[SUCCESS] Retornado objeto de predição em 14ms (alta eficiência de transferência).`
        ])
      } else if (step === 3) {
        clearInterval(interval)
        setIsTranslating(false)

        let translatedText = ""
        if (targetLang === 'pt') {
          translatedText = "Bem-vindo ao sistema corporativo da **Plataforma de Inteligência**. Nosso **Lucro Operacional** é sólido e nosso **Tempo de Sobrevivência** é de 99 meses."
        } else if (targetLang === 'es') {
          translatedText = "Bienvenido al sistema corporativo de la **Plataforma de Inteligência**. Nuestro **Lucro Operacional** es sólido y nuestro **Tempo de Sobrevivência** es de 99 meses."
        } else if (targetLang === 'ja') {
          translatedText = "**Plataforma de Inteligência**のエンタープライズシステムへようこそ。私たちの**Lucro Operacional**は堅実で、**Tempo de Sobrevivência**は99ヶ月です。"
        } else {
          translatedText = "Welcome to the **Plataforma de Inteligência** enterprise system. Our **Lucro Operacional** is solid and our **Tempo de Sobrevivência** is 99 months."
        }

        const pairs = glossaryInput.split('\n').filter(Boolean)
        pairs.forEach(pair => {
          const parts = pair.split('=')
          if (parts.length === 2) {
            const pt = parts[1].trim()
            if (pt) {
              if (pt === 'Plataforma de Inteligência') translatedText = translatedText.replace('Plataforma de Inteligência', `**${pt}**`)
              else if (pt === 'Lucro Operacional') translatedText = translatedText.replace('Lucro Operacional', `**${pt}**`)
              else if (pt === 'Tempo de Sobrevivência') translatedText = translatedText.replace('Tempo de Sobrevivência', `**${pt}**`)
            }
          }
        })

        setTranslationOutput(translatedText)
        
        setChatHistory(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `<b>[Tradução Adaptativa Concluída]</b> O modelo <b>Translation LLM</b> executou a tradução de <i>"${translationInput}"</i> respeitando os termos do Glossário:<br/><br/>${translatedText}`
          }
        ])
      }
    }, 1500)
  }

  // --- JINA EMBEDDINGS V3 VECTOR SANDBOX ---
  const handleJinaEmbedding = () => {
    if (isEmbedding) return
    setIsEmbedding(true)
    setEmbeddingResult(null)
    setEmbeddingLogs([
      `[JINA] Inicializando pipeline de embedding de texto (Jina Embeddings v3)...`,
      `[CONNECTING] Conectando ao endpoint Vertex AI: jina-embeddings-v3-endpoint`,
      `[REGION] Região ativa: us-central1 (GPU NVIDIA L4 alocada)`,
      `[CONFIG] Parâmetros: Dimensões=${jinaDimensions} | Late Chunking=${jinaLateChunking ? 'Ativo' : 'Desativado'}`,
      `[LORA] Selecionando adaptador task: "${jinaTask}"`
    ])

    let step = 0
    const interval = setInterval(() => {
      step++
      if (step === 1) {
        setEmbeddingLogs(prev => [
          ...prev,
          `[MATRYOSHKA] Aplicando Matryoshka Representation Learning para truncagem a ${jinaDimensions} dimensões...`,
          jinaLateChunking 
            ? `[LATE-CHUNKING] Concatenando inputs e mantendo cross-chunk context com RoPE...`
            : `[TOKENIZER] Tokenizando texto de entrada (tamanho: ${jinaInput.split(' ').length} palavras)...`,
          `[GPU-COMPUTE] Disparando forward pass em XLM-RoBERTa (570M parâmetros)...`
        ])
      } else if (step === 2) {
        setEmbeddingLogs(prev => [
          ...prev,
          `[L2-NORM] Normalização vetorial L2 aplicada: ${jinaNormalized ? 'Sim' : 'Não'}`,
          `[SUCCESS] Resposta recebida da GPU. Uso de tokens: ${jinaInput.split(' ').length + 3}`
        ])
      } else if (step === 3) {
        clearInterval(interval)
        setIsEmbedding(false)

        const vector: number[] = []
        for (let i = 0; i < 8; i++) {
          vector.push(Number((Math.random() * 2 - 1).toFixed(4)))
        }

        setEmbeddingResult({
          dimensions: jinaDimensions,
          tokenUsage: jinaInput.split(' ').length + 3,
          vector: vector,
          adapter: jinaTask
        })

        setChatHistory(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `<b>[Jina Embeddings v3]</b> Gerei com sucesso o vetor denso na dimensão <b>${jinaDimensions}</b> usando o adaptador LoRA de <b>${jinaTask}</b>. A retenção de fidelidade via Matryoshka está em <b>92%</b>!`
          }
        ])
      }
    }, 1500)
  }

  // --- VOYAGE MULTIMODAL 3.5 VECTOR SANDBOX ---
  const handleVoyageEmbedding = () => {
    if (isVoyageEmbedding) return
    setIsVoyageEmbedding(true)
    setVoyageResult(null)
    setVoyageLogs([
      `[VOYAGE-AI] Conectando ao endpoint: /multimodalembeddings`,
      `[REGION] Região padrão: us-central1 (Vertex AI Dedicated Endpoint)`,
      `[INPUT-MIX] Agrupando entradas do mixer:`,
      `  ├─ Texto: "${voyageInputText.slice(0, 30)}..."`,
      voyageHasImage ? `  ├─ Imagem: gs://generativeai-downloads/images/banana.jpg` : ``,
      voyageHasVideo ? `  ├─ Vídeo: gs://ipb-video-bucket/example_video_01.mp4` : ``,
      `[CONFIG] Output Dimensions: ${voyageDimensions} | Output Data Type: ${voyageDataType}`,
      `[PRE-PROCESS] Calculando tensores para mídias intercaladas...`
    ].filter(Boolean))

    let step = 0
    const interval = setInterval(() => {
      step++
      if (step === 1) {
        setVoyageLogs(prev => [
          ...prev,
          `[VECT-CALC] Executando processo de forward pass em Voyage Multimodal 3.5 (32K Context)...`,
          voyageHasImage ? `  ├─ Processando Image Pixels: 250,000 pixels (normalizados)` : ``,
          voyageHasVideo ? `  ├─ Processando Video Pixels: 480,000 pixels (temporal attention)` : ``,
          `[QUANTIZATION] Convertendo floats de 32 bits para formato quantizado "${voyageDataType}"...`
        ].filter(Boolean))
      } else if (step === 2) {
        setVoyageLogs(prev => [
          ...prev,
          voyageDataType === 'binary' || voyageDataType === 'ubinary' 
            ? `[STORAGE-SAVE] Otimização: 32x menos armazenamento ativada (bit-packed vector)` 
            : voyageDataType !== 'float' 
              ? `[STORAGE-SAVE] Otimização: 4x menos armazenamento ativada (int8 scale)` 
              : `[PRECISION] Mantendo precisão máxima nativa de 32-bit float`,
          `[SUCCESS] Vetor multimodal recebido do endpoint dedicado Vertex.`
        ])
      } else if (step === 3) {
        clearInterval(interval)
        setIsVoyageEmbedding(false)

        const vector: any[] = []
        const isBinary = voyageDataType.includes('binary')
        const isInt8 = voyageDataType.includes('int8') || voyageDataType.includes('uint8')

        for (let i = 0; i < 8; i++) {
          if (isBinary) {
            vector.push(Math.random() > 0.5 ? 1 : 0)
          } else if (isInt8) {
            vector.push(Math.floor(Math.random() * 255 - 128))
          } else {
            vector.push(Number((Math.random() * 2 - 1).toFixed(4)))
          }
        }

        setVoyageResult({
          dimensions: voyageDimensions,
          dataType: voyageDataType,
          vector: vector,
          textTokens: voyageInputText.split(' ').length + 2,
          imagePixels: voyageHasImage ? 250000 : 0,
          videoPixels: voyageHasVideo ? 480000 : 0,
          totalTokens: voyageInputText.split(' ').length + 2 + (voyageHasImage ? 120 : 0)
        })

        setChatHistory(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `<b>[Voyage Multimodal 3.5]</b> Vetorizei com sucesso o mix de texto${voyageHasImage ? ' + imagem' : ''}${voyageHasVideo ? ' + vídeo' : ''} em um vetor multimodal de <b>${voyageDimensions}</b> dimensões no formato <b>${voyageDataType}</b>!`
          }
        ])
      }
    }, 1500)
  }

  // --- VOYAGE 4 LITE BATCH EMBEDDING SANDBOX ---
  const handleVoyage4Embedding = () => {
    if (isVoyage4Embedding) return
    setIsVoyage4Embedding(true)
    setVoyage4Result(null)
    
    const lines = voyage4Texts.split('\n').filter(Boolean)
    setVoyage4Logs([
      `[VOYAGE-4] Inicializando batch text embedding (voyage-4-lite)...`,
      `[CONNECTING] Conectando ao endpoint dedicado Vertex AI em us-central1...`,
      `[HARDWARE] Executando em VM a3-highgpu-1g (NVIDIA H100 80GB)...`,
      `[BATCH] Lote identificado: ${lines.length} textos para vetorização conjunta.`,
      `[CONFIG] Dimensions: ${voyage4Dimensions} | Format: ${voyage4DataType} | Input Type: ${voyage4InputType}`,
      `[VECT-CALC] Codificando sentenças no Shared Embedding Space...`
    ])

    let step = 0
    const interval = setInterval(() => {
      step++
      if (step === 1) {
        setVoyage4Logs(prev => [
          ...prev,
          ...lines.map((t, idx) => `  ├─ Vetorizando [${idx}]: "${t.slice(0, 40)}..."`),
          `[MATRYOSHKA] Mapeando tensores nos eixos de compressão da Voyage 4...`
        ])
      } else if (step === 2) {
        setVoyage4Logs(prev => [
          ...prev,
          `[QUANTIZATION] Compactando lote de vetores em "${voyage4DataType}"...`,
          `[SUCCESS] Lote de embeddings criado em 8ms (latência otimizada lite).`
        ])
      } else if (step === 3) {
        clearInterval(interval)
        setIsVoyage4Embedding(false)

        // Gerar lote de vetores representativos
        const isBinary = voyage4DataType.includes('binary')
        const isInt8 = voyage4DataType.includes('int8') || voyage4DataType.includes('uint8')
        
        const results = lines.map((line, lineIdx) => {
          const vector: any[] = []
          for (let i = 0; i < 6; i++) {
            if (isBinary) {
              vector.push(Math.random() > 0.5 ? 1 : 0)
            } else if (isInt8) {
              vector.push(Math.floor(Math.random() * 255 - 128))
            } else {
              vector.push(Number((Math.random() * 2 - 1).toFixed(4)))
            }
          }
          return {
            text: line,
            vector: vector
          }
        })

        setVoyage4Result({
          dimensions: voyage4Dimensions,
          dataType: voyage4DataType,
          embeddings: results,
          totalTexts: lines.length
        })

        setChatHistory(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `<b>[Voyage 4 Lite]</b> Concluí a vetorização em lote de <b>${lines.length}  // --- ANIMAÇÃO DE IMPLANTAÇÃO GCP VERTEX AI (DEEPSEEK-V4 & GEMMA 4 & LLAMA 4 & XIAOMI MIMO) ---
  const startModelDeployment = () => {
    if (tuningActive) return
    setTuningActive(true)
    setTuningStep(1)
    setTuningProgress(0)

    const isLlama = model.startsWith('llama')
    const isDeepSeek = model.startsWith('deepseek')
    const isMiMo = model === 'mimo-v2.5'
    const isQwen = model === 'qwen-3.5-397b'
    const isQwenNext = model === 'qwen-3-next'
    const isMinimax = model.startsWith('minimax')
    const isGlm = model === 'glm-5'
    const isGemma3 = model === 'gemma-3-27b'
    const isMedGemma = model === 'medgemma-1.5-4b'
    const isGptOss = model === 'gpt-oss'
    const isVoyage = model === 'voyage-multimodal-3.5'
    const isVoyage4 = model === 'voyage-4-lite'
    
    let activeModelName = 'Gemma-4-26B-A4B'
    let publisherPath = 'publishers/google/models/gemma4@gemma-4-26b-a4b-it'
    let region = 'us-central1'
    let endpointUrl = 'us-central1-aiplatform.googleapis.com'

    if (isLlama) {
      if (model === 'llama-3.3') {
        activeModelName = 'Llama-3.3-70B-Instruct'
        publisherPath = 'publishers/meta/models/llama3-3'
        region = 'us-central1'
        endpointUrl = 'us-central1-aiplatform.googleapis.com'
      } else {
        activeModelName = model === 'llama-4-maverick' ? 'Llama-4-Maverick-17B-128E' : 'Llama-4-Scout-17B-16E'
        publisherPath = model === 'llama-4-maverick' 
          ? 'publishers/meta/models/llama-4-maverick-17b-128e-instruct-maas' 
          : 'publishers/meta/models/llama-4-scout-17b-16e-instruct-maas'
        region = 'us-east5' 
        endpointUrl = 'us-east5-aiplatform.googleapis.com'
      }
    } else if (isDeepSeek) {
      activeModelName = model === 'deepseek-v4-pro' ? 'DeepSeek-V4-Pro' : 'DeepSeek-V4-Flash'
      publisherPath = model === 'deepseek-v4-pro'
        ? 'publishers/deepseek-ai/models/deepseek-v4@deepseek-v4-pro'
        : 'publishers/deepseek-ai/models/deepseek-v4@deepseek-v4-flash'
    } else if (isMiMo) {
      activeModelName = 'MiMo-V2.5'
      publisherPath = 'XiaomiMiMo/MiMo-V2.5@MiMo-V2.5'
      region = 'us-south1'
      endpointUrl = 'us-south1-aiplatform.googleapis.com'
    } else if (isQwen) {
      activeModelName = 'Qwen3.5-397B-A17B'
      publisherPath = 'publishers/qwen/models/qwen3-5@qwen3.5-397b-a17b'
      region = 'us-central1'
      endpointUrl = 'us-central1-aiplatform.googleapis.com'
    } else if (isQwenNext) {
      activeModelName = 'Qwen3-Next-80B'
      publisherPath = 'qwen/qwen3-next@Qwen3-Next-80B-A3B-Instruct'
      region = 'us-south1'
      endpointUrl = 'us-south1-aiplatform.googleapis.com'
    } else if (isMinimax) {
      activeModelName = model === 'minimax-m2.7' ? 'MiniMax-M2.7' : model === 'minimax-m2.5' ? 'MiniMax-M2.5' : model === 'minimax-m2.1' ? 'MiniMax-M2.1' : 'MiniMax-M2'
      publisherPath = `publishers/minimaxai/models/minimax-m2@${model.replace('minimax-', '')}`
      region = 'us-east1'
      endpointUrl = 'us-east1-aiplatform.googleapis.com'
    } else if (isGlm) {
      activeModelName = 'GLM-5 Flagship'
      publisherPath = 'publishers/glm/models/glm5@latest'
      region = 'us-central1'
      endpointUrl = 'us-central1-aiplatform.googleapis.com'
    } else if (isGemma3) {
      activeModelName = 'Gemma-3-27B-IT'
      publisherPath = 'publishers/google/models/gemma3@gemma-3-27b-it'
      region = 'us-central1'
      endpointUrl = 'us-central1-aiplatform.googleapis.com'
    } else if (isMedGemma) {
      activeModelName = 'MedGemma-1.5-4B-IT'
      publisherPath = 'publishers/google/models/medgemma@medgemma-1.5-4b-it'
      region = 'us-central1'
      endpointUrl = 'us-central1-aiplatform.googleapis.com'
    } else if (isGptOss) {
      activeModelName = 'GPT-OSS-20B'
      publisherPath = 'openai/gpt-oss@gpt-oss-20b'
      region = 'europe-west4'
      endpointUrl = 'europe-west4-aiplatform.googleapis.com'
    } else if (isVoyage) {
      activeModelName = 'Voyage Multimodal 3.5'
      publisherPath = 'mongodb/voyage-multimodal-3.5@latest'
      region = 'us-central1'
      endpointUrl = 'us-central1-aiplatform.googleapis.com'
    } else if (isVoyage4) {
      activeModelName = 'Voyage 4 Lite'
      publisherPath = 'mongodb/voyage-4-lite@latest'
      region = 'us-central1'
      endpointUrl = 'us-central1-aiplatform.googleapis.com'
    }

    setTuningLogs([
      `[GCP] Autenticando com credenciais da Vertex AI (gcloud auth login)...`,
      `[VERTEX-AI] Conectando ao Model Garden - Região: ${region}`,
      `[MODEL-GARDEN] Carregando pesos gerenciados de: ${publisherPath}`,
      isLlama 
        ? `[LICENÇA] Aceitando os termos da ${model === 'llama-3.3' ? 'Llama 3.3' : 'Llama 4'} Community License Agreement... Aceito`
        : `[LICENÇA] Aceitando os termos de licença de uso aberto... Aceito`
    ])

    let step = 1
    const interval = setInterval(() => {
      step++
      setTuningStep(step)
      if (step === 2) {
        setTuningLogs(prev => [
          ...prev,
          `[GCP-CONFIG] Configurando host e alocando TPUs na região ${region}...`,
          isLlama 
            ? (model === 'llama-3.3'
                ? `[GPU-ALLOC] Llama 3.3 70B carregado. GPU Cluster H100 TDP 700W otimizado e ativo (7.0M hours pre-trained baseline)`
                : `[MOE-ALLOC] Llama 4 carregado. Experts MoE ativos: ${model === 'llama-4-maverick' ? '128 experts (400B total / 17B ativos)' : '16 experts (109B total / 17B ativos)'}`)
            : isDeepSeek 
              ? `[MOE-ALLOC] DeepSeek MoE ativado (1.6T total params, 49B ativos por token com precisão FP4/FP8 misto)`
              : isMiMo 
                ? `[MOE-ALLOC] MiMo-V2.5 Sparse MoE ativo (310B total / 15B ativos, 8 experts por token)`
                : isQwen
                  ? `[MOE-ALLOC] Qwen3.5 MoE ativado (397B total, 17B experts ativos por token)`
                  : isQwenNext
                    ? `[TPU-ALLOC] Qwen3 Next 80B Model Garden loading (Auto-scaling with A3B-Thinking active)`
                    : isMinimax
                      ? `[FORGE-ALLOC] MiniMax ${activeModelName} no framework Forge ativado (${model === 'minimax-m2.7' ? 'Auto-Evolution 100+ rounds' : '100 tokens/segundo RL runtime'})`
                      : isGlm
                        ? `[SLIME-ALLOC] GLM-5 Slime Asynchronous RL Infrastructure ativada (alta taxa de transferência e eficácia de amostras)`
                        : isGemma3
                          ? `[TPU-ALLOC] Alocando TPUv5e para Gemma 3 27B IT (14 Trillion tokens pre-trained context)`
                          : isMedGemma
                            ? `[CLINICAL-ALLOC] Alocando GPU com SigLIP image encoder de MedGemma 1.5 4B (radiology & dermatology classification model)`
                            : isGptOss
                              ? `[TPU-ALLOC] GPT OSS 20B Model Garden loading (OpenAI open-weight inference enabled)`
                              : isVoyage || isVoyage4 
                                ? `[ENDPOINT-ALLOC] Inicializando Dedicated Endpoint Vertex AI para Voyage...`
                                : `[PLE-ALLOC] Ativando Per-Layer Embeddings (PLE) nos decodificadores da arquitetura Gemma 4`,
          isMiMo 
            ? `[ENCODER-ALLOC] Alocando 729M-param ViT (28 camadas) + 261M-param Audio Transformer`
            : isQwen
              ? `[VISION-ENCODER] Alocando codificador de visão nativo de alta fidelidade e resolução variável`
              : isGemma3
                ? `[MULTIMODAL] Inicializando JAX e Pathways Jigsaw vision projection layers`
                : isMedGemma
                  ? `[SIGLIP] Inicializando SigLIP image encoder (896x896 resolution, 256 image tokens mapped)`
                  : isVoyage4 
                    ? `[GPU-SPECS] Configurando VM a3-highgpu-1g com NVIDIA H100 80GB...`
                    : isLlama
                      ? (model === 'llama-3.3'
                          ? `[QUANT] Otimizando pesos de inferência para 70B parâmetros em FP8 no cluster us-central1`
                          : `[QUANT] Carregando pesos FP8 compilados de fábrica para otimização de VRAM`)
                      : isDeepSeek
                        ? `[PRECISION] Carregando pesos de decodificadores MoE em FP4 e atenção central em FP8`
                        : isGlm
                          ? `[RL-QUANT] Otimizando pesos de inferência para decodificadores esparsos via feedback de recompensa de processo`
                          : `[ATTENTION] Configurando Hybrid Attention com sliding window de 1024 tokens`
        ])
        setTuningProgress(30)
      } else if (step === 3) {
        setTuningLogs(prev => [
          ...prev,
          isMiMo
            ? `[MTP] Multi-Token Prediction (MTP) de 3 camadas activa (329M parâmetros)...`
            : isQwen
              ? `[vLLM] Configurando suporte a contextos astronômicos de 262,144 tokens nativos (extensíveis até 1,010,000 tokens)`
              : isQwenNext
                ? `[vLLM] Configurando suporte a contextos gigantescos de 80B params via auto-scaling`
                : isGlm
                  ? `[SLIME-INF] Configurando paralelismo de pipeline e balanceamento dinâmico de carga com slime`
                  : isGemma3
                    ? `[vLLM] Ativando Grouped-query attention (GQA) com 128K context length`
                    : isMedGemma
                      ? `[EHRQA] Ativando EHR-specific clinical reasoning context window de 128K tokens`
                      : isGptOss
                        ? `[vLLM] Configurando suporte a contextos de 128K com auto-scaling TPUv5e`
                        : isLlama
                          ? (model === 'llama-3.3'
                              ? `[vLLM] Configurando suporte a contextos de 128K com GQA de alta fidelidade`
                              : model === 'llama-4-scout'
                                ? `[vLLM] Configurando suporte a contextos astronômicos de 10 MILHÕES de tokens (10M Context Window)...`
                                : `[vLLM] Configurando suporte a contextos de 1 milhão de tokens (1M Context Intelligence)...`)
                          : isVoyage || isVoyage4 
                            ? `[MODEL-GARDEN] Instanciando MongoDB Voyage com 32K context window...`
                            : `[vLLM] Configurando suporte a contextos de 1 milhão de tokens (1M Context Intelligence)...`,
          `[MEMORY] Checkpoints de segurança validados no cluster host...`,
          `[INF-TEST] Disparando requisição chat.completions de teste a frio no endpoint...`
        ])
        setTuningProgress(60)
      } else if (step === 4) {
        setTuningLogs(prev => [
          ...prev,
          `[INF-TEST] Inferência concluída com sucesso.`,
          `[ENDPOINT] Criado Endpoint GCP: https://${endpointUrl}/v1/projects/business-syllabus-dev/locations/${region}/endpoints/openapi/predict`,
          `[SUCCESS] O modelo ${activeModelName} está ativado no plano de desenvolvedor gratuito (sem cobranças de API).`
        ])
        setTuningProgress(100)
        clearInterval(interval)
        
        setTimeout(() => {
          setChatHistory(prev => [
            ...prev,
            {
              sender: 'bot',
              text: `<b>[Deploy / Open Model Ativo!]</b> O modelo <b>${activeModelName}</b> foi implantado com sucesso no endpoint de <b>${region}</b>.`
            }
          ])
        }, 1000)
      }
    }, 3000)
  }     text: `<b>[Deploy / Open Model Ativo!]</b> O modelo <b>${activeModelName}</b> foi implantado com sucesso no endpoint de <b>${region}</b>.`
            }
          ])
        }, 1000)
      }
    }, 3000)
  }

  // --- IMAGEN 4 IMAGE GENERATION SIMULATOR (GCP VERTEX AI IMAGEN 4) ---
  const generateImagen4Image = () => {
    if (isGeneratingImage) return
    setIsGeneratingImage(true)
    setGeneratedImages([])
    setImagenLogs([
      `[GCP] Inicializando chamada à API do Vertex AI Imagen 4...`,
      `[MODEL] Alocando endpoint: publishers/google/models/${imagenModel === 'imagen-4.0-ultra' ? 'imagen-4.0-ultra-generate-001' : 'imagen-4.0-fast-generate-001'}:predict`,
      `[CONFIG] Formato de saída: Aspect Ratio ${aspectRatio} | SynthID Watermark: Ativa`,
      enhancePrompt 
        ? `[ENHANCE] Prompt Enhancement ativado! Reescrevendo prompt original via modelo linguístico do GCP...`
        : `[ENHANCE] Prompt Enhancement desativado. Mantendo entrada pura.`
    ])

    let step = 0
    const interval = setInterval(() => {
      step++
      if (step === 1) {
        setImagenLogs(prev => [
          ...prev,
          enhancePrompt 
            ? `[ENHANCE] Prompt otimizado para: "Sleek and hyper-realistic dark-mode corporate dashboard console, ultra high-end telemetry charts, flowing champagne gold neon grid lines, floating financial node particles in 3D perspective, NASA mission control room environment, professional photography, 4k, cinematic lighting"`
            : `[IMAGEN] Processando prompt puro: "${imagePrompt}"`,
          `[IMAGEN] Executando processo de difusão latente em 2k de resolução...`
        ])
      } else if (step === 2) {
        setImagenLogs(prev => [
          ...prev,
          `[WATERMARK] Aplicando marca d'água invisível de segurança SynthID do Google DeepMind...`,
          `[ENCODING] Convertendo matriz tridimensional de pixels em string base64 encapsulada...`,
          `[SUCCESS] Retornados com sucesso bytes codificados da imagem.`
        ])
      } else if (step === 3) {
        clearInterval(interval)
        setIsGeneratingImage(false)
        
        const selectedImage = Math.random() > 0.5 
          ? '/business_cube_silver_gold.png' 
          : '/business_cube_final.png'
          
        setGeneratedImages([selectedImage])
        
        setChatHistory(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `<b>[Geração Imagen 4 Ultra!]</b> Gerei com sucesso a imagem no formato <b>${aspectRatio}</b> usando a API do <b>${imagenModel === 'imagen-4.0-ultra' ? 'Imagen 4 Ultra' : 'Imagen 4 Fast'}</b> na us-central1. O prompt foi enriquecido e a marca d'água <b>SynthID</b> foi incorporada de forma invisível nos metadados.`
          }
        ])
      }
    }, 3000)
  }

  // --- VEO 3 VIDEO GENERATION & LONG-RUNNING OPERATION SIMULATOR (GCP VERTEX AI VEO 3) ---
  const generateVeo3Video = () => {
    if (isGeneratingVideo) return
    setIsGeneratingVideo(true)
    setGeneratedVideos([])
    
    const randomOpId = `op-veo-${Math.floor(100000 + Math.random() * 900000)}`
    setOperationId(randomOpId)

    setVeoLogs([
      `[GCP] Inicializando veo-3.0-generate-001:predictLongRunning...`,
      `[CONFIG] Resolução: ${veoResolution} | Gerar Áudio: ${veoAudio ? 'True' : 'False'} | Sample Count: 1`,
      `[VEO-3] Lançando operação de longa duração (Long-Running Operation)...`,
      `[RESPONSE] Operação iniciada. ID retornado: projects/business-syllabus/locations/us-central1/publishers/google/models/veo-3.0-generate-001/operations/${randomOpId}`,
      `[POLL-INIT] Iniciando loop de checagem veo-3.0-generate-001:fetchPredictOperation...`
    ])

    let step = 0
    const interval = setInterval(() => {
      step++
      if (step === 1) {
        setVeoLogs(prev => [
          ...prev,
          `[POLL-1] Status do Job: RUNNING (operationName: .../operations/${randomOpId})`,
          `[VEO-3] Processando frames e renderização do volume 3D em difusão latente temporal...`,
          `[VEO-3] Processamento de áudio ativado: gerando trilha sonora corporativa sutil...`
        ])
      } else if (step === 2) {
        setVeoLogs(prev => [
          ...prev,
          `[POLL-2] Status do Job: RUNNING (operationName: .../operations/${randomOpId})`,
          `[VEO-3] Compilando sequência de imagens no formato de vídeo mp4...`,
          `[WATERMARK] Aplicando marca d'água SynthID temporal em frames...`
        ])
      } else if (step === 3) {
        setVeoLogs(prev => [
          ...prev,
          `[POLL-3] Status do Job: DONE! Operação concluída.`,
          `[SUCCESS] Vídeo salvo no bucket GCP Cloud Storage:`,
          `  └─ URI: gs://ipb-video-bucket/timestamps/sample_0.mp4`,
          `[SUCCESS] Transcrevendo bytes de vídeo para execução no cockpit.`
        ])
      } else if (step === 4) {
        clearInterval(interval)
        setIsGeneratingVideo(false)
        
        setGeneratedVideos(['/business_cube_final.png']) 
        
        setChatHistory(prev => [
          ...prev,
          {
            sender: 'bot',
            text: `<b>[Geração Veo 3 Concluída!]</b> O modelo <b>Veo 3.0</b> gerou com sucesso o vídeo corporativo 3D com áudio em resolução <b>${veoResolution}</b>! O job assíncrono <code>${randomOpId}</code> foi concluído na GCP e os arquivos estão prontos no bucket <code>gs://ipb-video-bucket/</code>.`
          }
        ])
      }
    }, 2800)
  }

  // --- CONTROLE DE MENSAGENS COM SIMULADOR DE THINKING ---
  const sendChatMessage = (text: string) => {
    if (!text.trim()) return

    setChatHistory((prev) => [...prev, { sender: 'user', text }])
    setInputValue('')
    setIsLoading(true)
    setThinkingOutput('')

    const isDeepSeek = model.startsWith('deepseek')
    const isGemma4 = model.startsWith('gemma')
    const isLlama4 = model.startsWith('llama') && model !== 'llama-3.3'
    const isLlama3_3 = model === 'llama-3.3'
    const isGrokReasoning = model === 'grok-4.1-fast-reasoning'
    const isQwen = model === 'qwen-3.5-397b'
    const isQwenNext = model === 'qwen-3-next'
    const isMinimax = model.startsWith('minimax')
    const isGlm = model === 'glm-5'
    const isGemma3 = model === 'gemma-3-27b'
    const isMedGemma = model === 'medgemma-1.5-4b'
    const isGptOss = model === 'gpt-oss'

    const hasReasoning =
      isDeepSeek ||
      isGemma4 ||
      isLlama3_3 ||
      isGrokReasoning ||
      isQwen ||
      isQwenNext ||
      isMinimax ||
      isGlm ||
      isGemma3 ||
      isMedGemma ||
      isGptOss

    if (hasReasoning && showThinking && reasoningMode !== 'non-think') {
      let tText = ''
      
      const dsThoughts = [
        '<think>',
        `[Modelo: ${model === 'deepseek-v4-pro' ? 'DeepSeek-V4-Pro (1.6T)' : 'DeepSeek-V4-Flash (284B)'}]`,
        `[Modo de Raciocínio: ${reasoningMode === 'think-max' ? 'Think Max' : 'Think High'}]`,
        `[Precisão: FP4 Experts + FP8 mixed attention]`,
        `1. Entrada do usuário: "${text}"`,
        `2. Analisando o ecossistema de negócios de Business Syllabus:`,
        `   - Receita Mensal: R$ 150k`,
        `   - OPEX fixo: R$ 60k`,
        `   - Pressão de metas atual do cockpit: escala 5`,
        `3. Calculando o custo invisível do burnout:`,
        `   - Clima Maslach indica exaustão EEB de 34% sob pressão 5.`,
        `   - Turnover projetado anual de 28% em equipe de 120 colaboradores.`,
        `   - Demissões consequentes: ~3 colaboradores por mês.`,
        `   - Custo por demissão: R$ 30k (Rescisão + Recrutamento + Produtividade).`,
        `   - Custo real invisível gerado no EBITDA: 3 * 30k = R$ 90k/mês.`,
        `4. Formando árvore de decisões e filtrando por baixo atrito:`,
        `   - Decisão A: Manter faturamento R$ 150k e pressão 5 ➔ EBITDA final R$ 60k.`,
        `   - Decisão B: Reduzir metas em 20% (faturamento R$ 120k) ➔ Reduz estresse ➔ Turnover cai a zero ➔ EBITDA final R$ 90k (Mais rentável!).`,
        `5. Concluindo pensamento lógico e gerando resposta estruturada.`,
        `</think>`
      ]

      const gemmaThoughts = [
        '<|think|>',
        `[Modelo: Gemma 4 26B A4B MoE]`,
        `[Recurso: PLE - Per-Layer Embeddings ativos]`,
        `1. Comando recebido: "${text}"`,
        `2. Varrendo base de telemetria macroeconômica:`,
        `   - SELIC nominal em 14.40% (API Banco Central)`,
        `   - IPCA da inflação em 4.39%`,
        `   - Juro Real projetado: 10.01%`,
        `3. Raciocínio de investimento:`,
        `   - A taxa real de 10.01% livre de risco é altamente atraente contra investimentos produtivos de alto risco.`,
        `   - Se o capital de giro é de R$ 850k, alocar R$ 340k em CDI gera receita financeira líquida e blindagem.`,
        `4. Formatando resposta com embeddings gemma-4.`,
        `<|channel>thought\nConcluído.<channel|>`
      ]

      const grokThoughts = [
        '<think>',
        `[Modelo: Grok 4.1 Fast (Reasoning) - Alocação e Síntese de Conhecimento]`,
        `1. Comando recebido: "${text}"`,
        `2. Analisando as regras do negócio com lógica avançada de xAI:`,
        `   - Caixa disponível: R$ 850k`,
        `   - Arbitragem de taxa Selic (14.40%) vs OPEX empresarial.`,
        `3. Estratégia de síntese: equilibrar a necessidade de liquidez com resiliência do time.`,
        `4. Conclusão rápida em hardware de inferência otimizado.`,
        `</think>`
      ]

      const qwenThoughts = [
        '<think>',
        `[Modelo: Qwen3.5-397B-A17B MoE (Causal Language Model with Vision Encoder)]`,
        `[Modo de Raciocínio: ${reasoningMode === 'think-max' ? 'Think Max' : 'Think High'}]`,
        `1. Entrada do usuário: "${text}"`,
        `2. Processando telemetria e imagens da dashboard com Vision Encoder.`,
        `3. CPC Meta Ads: US$ 12.40 vs TikTok Ads: US$ 6.80. Curva LTV/CAC saturando no Meta.`,
        `4. Decisão: Realocar 30% do orçamento para TikTok Ads barateia o CAC e otimiza o EBITDA.`,
        `5. Finalizando a resposta em conformidade com benchmarks de STEM e Coding.`,
        `</think>`
      ]

      const qwenNextThoughts = [
        '<think>',
        `[Modelo: Qwen3-Next-80B-A3B-Thinking - Serving for text generation]`,
        `1. Entrada de comando capturada: "${text}"`,
        `2. Varrendo pesos de raciocínio de 80B com Auto-scaling da GCP.`,
        `3. Formulando resposta lógica para o ecossistema do Business Syllabus.`,
        `4. Lançando tokens formatados com alta fidelidade.`,
        `</think>`
      ]

      const minimaxThoughts = [
        '<thought>',
        `[Modelo: ${model === 'minimax-m2.7' ? 'MiniMax-M2.7 (Auto-Evolution)' : model === 'minimax-m2.5' ? 'MiniMax-M2.5 (100 tok/sec)' : 'MiniMax-M2'}]`,
        `[Framework: Forge RL Engine (decodificadores esparsos ativos)]`,
        `1. Comando recebido no cockpit: "${text}"`,
        `2. Analisando OPEX (R$ 60k) e Runway operacional (99 meses).`,
        `3. Executando rastro de pensamento interleaved com regras de compliance MiniMax.`,
        `4. Sugerindo blindagem via Renda Fixa/CDI e otimização de campanhas.`,
        `</thought>`
      ]

      const glmThoughts = [
        '<think>',
        `[Modelo: GLM-5 Flagship - Asynchronous RL Infrastructure (slime)]`,
        `1. Comando SWOT Viva em andamento com RL pipeline.`,
        `2. Correlacionando PESTEL score (${averagePestel()}%) com margem de lucro operacional.`,
        `3. Realocando budget digital para TikTok Ads (CPM de US$ 6.80 vs US$ 12.40).`,
        `</think>`
      ]

      const gemma3Thoughts = [
        '<|think|>',
        `[Modelo: Gemma 3 27B IT - Lightweight state-of-the-art open model from Google]`,
        `[Mapeamento: 14 Trillion Tokens pre-training context]`,
        `1. Entrada do usuário: "${text}"`,
        `2. Analisando o runway estrutural (99 meses) e o EBITDA (R$ 90k/mês).`,
        `3. Recomendação: Alocação CDI contra volatilidade operacional.`,
        `<|channel>thought\nConcluído.<channel|>`
      ]

      const medGemmaThoughts = [
        '<think>',
        `[Modelo: MedGemma 1.5 4B Multimodal IT - Clinical Reasoning Engine]`,
        `[Input Modality: Multimodal Text/Vision (896x896 resolution, 256 SigLIP image tokens)]`,
        `1. Entrada médica/operacional: "${text}"`,
        `2. Analisando EHR data e discharge summaries de saúde corporativa.`,
        `3. Diagnosticando estresse na equipe (turnover indicando fadiga do time de 34% sob pressão 5).`,
        `4. Tratamento prescrito: Reajuste imediato de metas de 150k para 120k.`,
        `</think>`
      ]

      const gptOssThoughts = [
        '<think>',
        `[Modelo: GPT OSS 20B/120B (OpenAI Open-Weights Reasoning)]`,
        `1. Entrada de comando capturada: "${text}"`,
        `2. Varrendo pesos de raciocínio de 20B/120B do GPT OSS.`,
        `3. Formulando resposta lógica para o ecossistema do Business Syllabus.`,
        `4. Lançando tokens formatados com alta fidelidade e aderência a benchmarks.`,
        `</think>`
      ]

      const llama3_3Thoughts = [
        '<think>',
        `[Modelo: Llama 3.3 70B Instruct - Meta's Custom Built GPU Cluster]`,
        `[Benchmarks CoT: GPQA Diamond (50.5% Acc) | MATH CoT (77.0% Score)]`,
        `1. Comando de entrada recebido no cockpit: "${text}"`,
        `2. Analisando telemetria operacional com o modelo Llama 3.3.`,
        `3. Processando recomendação estratégica para Business Syllabus.`,
        `4. Estruturando resposta em conformidade com a licença de uso comunitária Meta.`,
        `</think>`
      ]

      const thoughts = isDeepSeek 
        ? dsThoughts 
        : isGemma4 
          ? gemmaThoughts 
          : isGrokReasoning 
            ? grokThoughts 
            : isQwen 
              ? qwenThoughts 
              : isQwenNext
                ? qwenNextThoughts
                : isMinimax 
                  ? minimaxThoughts 
                  : isGlm 
                    ? glmThoughts 
                    : isGemma3 
                      ? gemma3Thoughts 
                      : isMedGemma
                        ? medGemmaThoughts
                        : isGptOss
                          ? gptOssThoughts
                          : llama3_3Thoughts

      let idx = 0

      const thinkInterval = setInterval(() => {
        if (idx < thoughts.length) {
          tText += thoughts[idx] + '\n'
          setThinkingOutput(tText)
          idx++
        } else {
          clearInterval(thinkInterval)
          setIsLoading(false)
          
          let finalReply = ""
          if (isDeepSeek) {
            finalReply = `<b>[${model === 'deepseek-v4-pro' ? 'DeepSeek-V4-Pro' : 'DeepSeek-V4-Flash'}]:</b> 
            A análise indica que a pressão de metas atual (escala 5) está gerando atrito invisível de <b>R$ -90k/mês</b> devido à rotatividade de pessoal. 
            <br/><br/>
            Para otimizar o EBITDA Líquido final para <b>R$ 90k</b>, recomendo diminuir as metas em 20% no curto prazo. Isso desacelera o esgotamento humano, reduz o turnover a zero e economiza em multas rescisórias.`
          } else if (isGemma4) {
            finalReply = `<b>[Gemma 4 MoE]:</b> Com a taxa SELIC a 14.40% e juro real a 10.01%, o rebalanceamento estratégico ideal é **alocar 40% do caixa livre (R$ 340k)** em títulos de renda fixa atrelados ao CDI. Isso gera receita recorrente passiva e blinda a operação de atritos operacionais.`
          } else if (isQwen) {
            finalReply = `<b>[Qwen3.5-397B-A17B]:</b> Análise multimodal concluída! Minha engine identificou uma ineficiência na alocação de anúncios digitais. Direcionar 30% do budget para o TikTok Ads (CPM US$ 6.80) contra o Meta Ads (CPM US$ 12.40) otimizará o LTV/CAC e reduzirá o custo operacional em <b>18%</b>, fortalecendo a saúde financeira do Business Syllabus.`
          } else if (isQwenNext) {
            finalReply = `<b>[Qwen3-Next-80B]:</b> Análise com raciocínio profundo concluída! O cockpit integrado do Business Syllabus indica eficiência máxima na realocação de verba de Ads. Recomendo direcionar 30% do orçamento para o TikTok Ads.`
          } else if (isMinimax) {
            finalReply = `<b>[${model.toUpperCase()} Interleaved]:</b> <thought>Processando resposta final no formato intercalado no cockpit.</thought> Minha engine interleaved estruturou as respostas do cockpit com a saúde financeira mantendo-se em patamares excelentes, indicando que o CDI a 14.40% nominal oferece ROI atrativo livre de risco.`
          } else if (isGlm) {
            finalReply = `<b>[GLM-5 Flagship]:</b> Varredura operacional via slime RL concluída! Para combater o desgaste de margem e o CAC médio, a migração de 30% do budget de anúncios digitais para TikTok Ads é o movimento de maior eficiência comprovada.`
          } else if (isGemma3) {
            finalReply = `<b>[Gemma 3 27B IT]:</b> Com a taxa SELIC de 14.40% e juros reais a 10.01%, recomendo blindar a operação de Business Syllabus alocando 40% do caixa disponível (R$ 340k) no CDI. Isso gera receita recorrente de baixo atrito.`
          } else if (isMedGemma) {
            finalReply = `<b>[MedGemma-1.5-4B]:</b> Diagnóstico clínico do Business Syllabus concluído! Identifiquei fadiga crítica no time sob pressão de escala 5. O tratamento recomendado é readequar as metas para 120k de faturamento. Isso reduz o burnout e otimiza o EBITDA para R$ 90k/mês.`
          } else if (isGptOss) {
            finalReply = `<b>[GPT-OSS-20B/120B]:</b> Processamento de raciocínio da OpenAI Open-Weights concluído. O EBITDA de R$ 90k/mês e o runway de 99 meses podem ser otimizados alocando 40% do caixa excedente no CDI livre de risco (Selic 14.40%).`
          } else if (isLlama3_3) {
            finalReply = `<b>[Llama 3.3 70B Instruct (Built with Llama)]:</b> 
            Edmara, com base em 15 trilhões de tokens de treinamento e raciocínio estruturado, a análise do cockpit do Business Syllabus aponta que o turnover da equipe sob pressão alta (escala 5) gera um custo invisível de <b>R$ -90k/mês</b>.
            <br/><br/>
            Para reverter essa ineficiência e consolidar a saúde financeira, a redução imediata de 20% nas metas de faturamento é a decisão ideal. Isso estabiliza o time e mantém a margem saudável.`
          } else {
            finalReply = `<b>[Grok 4.1 Fast (Reasoning)]:</b> Minha engine rápida sintetizou os custos e validou que a arbitragem de canais (Meta vs TikTok) derruba o CAC em <b>22%</b> instantaneamente. Excelente janela de realocação.`
          }
          
          setChatHistory((prev) => [
            ...prev,
            { 
              sender: 'bot', 
              text: finalReply,
              thought: tText
            }
          ])
          setThinkingOutput('')
        }
      }, 600)
    } else {
      setTimeout(() => {
        setIsLoading(false)
        let reply = ""

        if (isLlama4) {
          reply = `<b>[${model === 'llama-4-maverick' ? 'Llama 4 Maverick' : 'Llama 4 Scout'} (Built with Llama)]:</b>
          Edmara, vamos bater um papo reto sobre essa operação. Analisei os números do Business Syllabus e, cara, o CAC médio a R$ ${cenarioCac()} está consumindo seu capital de giro muito rápido. 
          Seu faturamento de R$ ${cenarioFaturamento()}k sustenta a empresa, mas a pressão alta gera turnover e morde seu EBITDA operacional. 
          Eu recomendo equilibrar essa meta para dar um fôlego pros analistas e manter o caixa crescendo de forma sólida.`
        } else if (model === 'llama-3.3') {
          reply = `<b>[Llama 3.3 70B (Built with Llama)]:</b> Edmara, operando com inferência de alta velocidade! O faturamento de R$ ${cenarioFaturamento()}k sustenta o Business Syllabus, e o runway de 99 meses garante estabilidade.`
        } else if (model === 'translation-llm') {
          reply = `<b>[Translation LLM]:</b> Tradução adaptativa com glossário ativa!<br/><br/>
          Entrada: <i>"${text}"</i><br/>
          Saída traduzida (PT): <i>"Olá Edmara. Analisei a telemetria com os termos restritos de Glossary integrados."</i><br/><br/>
          <i>Use o painel lateral <b>Adaptive Translation Studio</b> para configurar seus próprios glossários e ver o alinhamento de terminologia em tempo real!</i>`
        } else if (model === 'jina-embeddings-v3') {
          reply = `<b>[Jina Embeddings v3]:</b> API de embeddings ativa! Converta as telemetrias financeiras do Business Syllabus em vetores densos e compacte-os via Matryoshka.<br/><br/><i>Use o painel lateral <b>Jina & Voyage Sandbox</b> para gerar e compactar vetores em tempo real!</i>`
        } else if (model === 'voyage-multimodal-3.5') {
          reply = `<b>[Voyage Multimodal 3.5]:</b> API de embeddings multimodais ativada! Consigo vetorizar de forma integrada textos, imagens e vídeos em um único vetor denso de até 2048 dimensões. Ideal para buscas semânticas profundas em bancos de dados vectoriais.<br/><br/><i>Use o painel lateral <b>Embed Sandbox</b> para misturar mídias e gerar vetores quantizados (int8, binary) em tempo real!</i>`
        } else if (model === 'voyage-4-lite') {
          reply = `<b>[Voyage 4 Lite]:</b> API de embeddings de texto ultra-rápida e de baixo custo ativada! Com uma janela de contexto de 32K e suporte à quantização avançada (float, int8, binary) em um espaço de embeddings compartilhado, sou ideal para realizar buscas semânticas rápidas de baixo atrito.<br/><br/><i>Use o painel lateral <b>Embed Sandbox</b> para vetorizar em lote e comparar taxas de compressão Matryoshka live!</i>`
        } else if (model === 'mimo-v2.5') {
          reply = `<b>[MiMo-V2.5 (310B MoE)]:</b> Conexão de inferência multimodal estabelecida! Minha arquitetura com decodificadores esparsos (15B ativos) e encoders ViT (729M) e Audio (261M) está pronta para processar textos, imagens, áudios e vídeos de até 1M de tokens no cockpit.`
        } else if (model === 'qwen-3.5-397b') {
          reply = `<b>[Qwen 3.5 397B]:</b> Inferência instantânea ativa! EBITDA operacional está em R$ 90k/mês com Runway de 99 meses. A análise macroeconômica do Business Syllabus indica alta resiliência.`
        } else if (model === 'qwen-3-next') {
          reply = `<b>[Qwen3-Next-80B]:</b> Canal de inferência rápida operacional. As métricas de LTV/CAC e margem EBITDA estão alinhadas com as projeções do cockpit.`
        } else if (model.startsWith('minimax')) {
          reply = `<b>[${model.toUpperCase()}]:</b> Inferência rápida de 100 tokens/segundo ativa no Forge RL Runtime! EBITDA do Business Syllabus está estável.`
        } else if (model === 'glm-5') {
          reply = `<b>[GLM-5 Flagship]:</b> Inferência rápida com suporte a Slime RL ativa. O cockpit exibe conformidade estratégica de alto nível.`
        } else if (model === 'gemma-3-27b') {
          reply = `<b>[Gemma 3 27B IT]:</b> Resposta gerada via modelo aberto do Google. A saúde financeira está estável com CAC médio sob controle.`
        } else if (model === 'medgemma-1.5-4b') {
          reply = `<b>[MedGemma-1.5-4B]:</b> Inferência clínica rápida concluída. Telemetria de estresse corporativo do Business Syllabus mapeada.`
        } else if (model === 'gpt-oss') {
          reply = `<b>[GPT-OSS-20B]:</b> Conexão instantânea de inferência estabelecida com o endpoint europe-west4. EBITDA operacional robusto.`
        } else if (model === 'gemini-3.5-flash') {
          reply = `<b>[Gemini 3.5 Flash]:</b> Resposta gerada com o novo modelo Flash. O custo de token foi reduzido e a latência de processamento de contexto de 1M caiu para <b>12ms</b>! O seu EBITDA de R$ 90k/mês está estável e seu runway é robusto.`
        } else if (model === 'gemini-3.1-flash-lite') {
          reply = `<b>[Gemini 3.1 Flash Lite]:</b> Operando com o modelo otimizado Lite (GA). Ideal para transações em tempo real de alto volume e custo sensível.`
        } else if (model === 'gemini-3.1-flash-lite-preview') {
          reply = `<b>[Gemini 3.1 Flash Lite Preview]:</b> Conexão estabelecida com a prévia pública do modelo Lite. Desempenho idêntico ao Flash, mas com faturamento de custos operacionais mitigado.`
        } else if (model === 'gemini-3.1-pro') {
          reply = `<b>[Gemini 3.1 Pro Preview]:</b> Analisei a sua estrutura com a janela de 1M de tokens. Sugiro otimizar a alocação de anúncios digitais direcionando 20% do orçamento do Meta Ads (CPM US$ 12.40) para o TikTok Ads (CPM US$ 6.80) para otimizar o LTV/CAC.`
        } else if (model === 'gemini-3.1-pro-preview') {
          reply = `<b>[Gemini 3.1 Pro Preview]:</b> Analisei a telemetria do Business Syllabus com o modelo flagship. Suporte nativo a 1 milhão de tokens de contexto e raciocínio profundo de agentes ativo.`
        } else if (model === 'gemini-3.1-pro-preview-customtools') {
          reply = `<b>[Gemini 3.1 Pro Preview (Custom Tools)]:</b> Conectado ao endpoint especializado em chamadas de ferramentas personalizadas. Processando ações com bash, view_file e search_code em alto desempenho.`
        } else if (model === 'gemini-3-flash-preview') {
          reply = `<b>[Gemini 3 Flash Preview]:</b> Nosso modelo de inferência de agente de alto desempenho ativado! Trazendo inteligência de codificação e compreensão multimodal próxima do Pro, com equilíbrio otimizado de custo e latência.`
        } else if (model === 'gemini-3-pro-image-preview') {
          reply = `<b>[Gemini 3 Pro Image Preview]:</b> Inicializado canal criativo de alta fidelidade! Integrando geração de imagens e edição conversacional live. Suporta saída multimodal [TEXT, IMAGE] nativa com latência de resposta aprimorada.`
        } else if (model === 'gemini-3-pro-preview') {
          reply = `<b>[Gemini 3 Pro Preview]:</b> Nosso modelo flagship de inteligência agentica e codificação ativado no cockpit de Business Syllabus! Com janela de 1M de tokens e compreensão multimodal superior para tarefas analíticas complexas.`
        } else if (model === 'grok-4.3') {
          reply = `<b>[Grok 4.3]:</b> Flagship de última geração da xAI implantado globalmente. Menor taxa de alucinação e excelentes capacidades estruturadas em tomados de decisão.`
        } else if (model === 'grok-4.20-non-reasoning') {
          reply = `<b>[Grok 4.20 Non-Reasoning]:</b> Flagship do cockpit configurado sem raciocínio explícito. Ideal para comandos rápidos estruturados com latência estável.`
        } else if (model === 'grok-4.1-fast-non-reasoning') {
          reply = `<b>[Grok 4.1 Fast (Non-Reasoning)]:</b> Modelo de baixo custo da xAI otimizado para latência e chamadas de ferramenta estruturadas. Resposta instantânea enviada.`
        } else {
          reply = `<b>[${model.toUpperCase()}]:</b> A inferência rápida e não-pensante está ativa (Non-think). O EBITDA atual está em R$ 90k/mês com Runway de 99 meses. A saúde financeira está estável.`
        }

        setChatHistory((prev) => [...prev, { sender: 'bot', text: reply }])
      }, 1500)
    }
  }

  const cenarioFaturamento = () => {
    if (typeof window !== 'undefined') {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry?.faturamento) return telemetry.faturamento
    }
    return 150
  }

  const cenarioCac = () => {
    if (typeof window !== 'undefined') {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry?.cac) return telemetry.cac
    }
    return 350
  }

  const triggerQuickAi = (option: string) => {
    setChatHistory((prev) => [...prev, { sender: 'user', text: option }])
    setIsLoading(true)
    setThinkingOutput('')

    const isDeepSeek = model.startsWith('deepseek')
    const isGemma4 = model.startsWith('gemma')
    const isLlama4 = model.startsWith('llama')

    if ((isDeepSeek || isGemma4) && showThinking && reasoningMode !== 'non-think') {
      let tText = ''
      const thoughts = isDeepSeek 
        ? [
            '<think>',
            `[DeepSeek-V4-Pro MoE - Raciocinando em Rastro Rápido]`,
            `1. Comando SWOT Viva selecionado.`,
            `2. PESTEL score consolidado: ${averagePestel()}%`,
            `3. Estratégia de Ads: Meta CPM US$ 12.40 | TikTok CPM US$ 6.80`,
            `4. Ação: Realocar budget para reverter a queda orgânica de 4.2% no share da marca.`,
            `</think>`
          ]
        : [
            '<|think|>',
            `[Gemma 4 26B - Análise de Arbitragem de Renda Fixa]`,
            `1. SELIC nominal: 14.40% | IPCA: 4.39%`,
            `2. Recomendação: Alocação CDI contra risco produtivo.`,
            `<|channel>thought\nConcluído.<channel|>`
          ]

      let idx = 0
      const thinkInterval = setInterval(() => {
        if (idx < thoughts.length) {
          tText += thoughts[idx] + '\n'
          setThinkingOutput(tText)
          idx++
        } else {
          clearInterval(thinkInterval)
          setIsLoading(false)
          
          let finalReply = isDeepSeek 
            ? `<b>[DeepSeek-V4-Pro]:</b> Varredura SWOT Viva concluída. Seu custo CPM no Meta Ads está excessivo (US$ 12.40). Recomendo migrar 30% do orçamento para TikTok Ads (CPM US$ 6.80) para baratear o CAC e maximizar o LTV/CAC.`
            : `<b>[Gemma 4 MoE]:</b> Decisão CDI validada. Alocar 40% do excedente de caixa em ativos indexados ao CDI renderá 10.01% líquido real ao ano, gerando blindagem estratégica segura.`
          
          setChatHistory((prev) => [
            ...prev,
            { 
              sender: 'bot', 
              text: finalReply,
              thought: tText
            }
          ])
          setThinkingOutput('')
        }
      }, 500)
    } else {
      setTimeout(() => {
        setIsLoading(false)
        let reply = ""
        if (option.includes('SWOT')) {
          reply = isLlama4 
            ? `<b>[${model.toUpperCase()} (Built with Llama)]:</b> Cara, analisei os custos no Meta Ads. O CPM tá batendo US$ 12.40. No TikTok tá US$ 6.80 e o share caiu 4.2%. A jogada certa é passar 20% do orçamento pro TikTok Ads. Isso derruba seu CAC médio na hora.`
            : `<b>[Gemini 3.1 Pro]:</b> A análise SWOT viva integrada ao BigQuery aponta oportunidade em arbitragem de canais digitais. Reduza 20% do orçamento do Meta Ads e realoque no TikTok Ads para otimizar o LTV/CAC.`
        } else if (option.includes('CDI')) {
          reply = isLlama4
            ? `<b>[${model.toUpperCase()} (Built with Llama)]:</b> A SELIC a 14.40% entrega moleza com taxa real a 10.01% livre de risco. Sem estresse de gerenciar metas abusivas pro time, alocar R$ 340k no CDI é o caminho lógico.`
            : `<b>[Grok 4.3]:</b> A taxa SELIC de 14.40% oferece rentabilidade real líquida livre de riscos de 10.01%. Recomendo fortemente alocar R$ 340k do caixa disponível em CDI.`
        } else if (option.includes('Deploy')) {
          setRightPanelTab('garden')
          reply = `<b>[Gemini 3.1 Pro]:</b> Transicionei seu painel direito para o <b>Model Garden</b>. Use o botão 'DEPLOY MODEL VERTEX SDK' para carregar a TPU.`
        }
        setChatHistory((prev) => [...prev, { sender: 'bot', text: reply }])
      }, 1000)
    }
  }

  const averagePestel = () => {
    if (typeof window !== 'undefined') {
      const telemetry = (window as any).IPBTelemetry
      if (telemetry?.cenario === 'juros_altos') return 33
    }
    return 67
  }

  // --- GERADOR DINÂMICO DE CÓDIGOS SDK (PYTHON & CURL) ---
  const renderDynamicCode = () => {
    const isGemini = model.startsWith('gemini')
    const isGrok = model.startsWith('grok')
    const isOpenModel =
      model.startsWith('gemma') ||
      model.startsWith('deepseek') ||
      model.startsWith('llama') ||
      model === 'mimo-v2.5' ||
      model === 'qwen-3.5-397b' ||
      model.startsWith('minimax') ||
      model === 'glm-5' ||
      model === 'qwen-3-next' ||
      model === 'gpt-oss' ||
      model === 'gemma-3-27b' ||
      model === 'medgemma-1.5-4b'

    if (model === 'voyage-4-lite') {
      if (codeLanguageTab === 'python') {
        return `# Vertex AI Voyage 4 Lite SDK Python
import json
import vertexai

PROJECT_ID = "YOUR_PROJECT_ID"
LOCATION = "us-central1"
vertexai.init(project=PROJECT_ID, location=LOCATION)

# MongoDB Model Garden reference
MODEL_NAME = "mongodb/voyage-4-lite@latest"
model = model_garden.OpenModel(MODEL_NAME)
endpoint = model.deploy(
    machine_type="a3-highgpu-1g",
    accelerator_type="NVIDIA_H100_80GB",
    accelerator_count=1,
    accept_eula=True,
    use_dedicated_endpoint=True
)

# Predict batch embeddings
body = {
    "input": [
        "Machine learning enables computers to learn from data.",
        "Natural language processing helps computers understand human language."
    ],
    "output_dimension": ${voyage4Dimensions},
    "input_type": "${voyage4InputType}",
    "output_type": "${voyage4DataType}"
}
response = endpoint.invoke(
    request_path="/embeddings",
    body=json.dumps(body).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)
print(response.json())`
      } else {
        return `# Vertex AI Voyage 4 Lite API curl call
curl -X POST \\
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/endpoints/YOUR_ENDPOINT_ID:invoke \\
  -d '{
    "model": "voyage-4-lite",
    "input": [
      "Machine learning enables computers to learn from data.",
      "Natural language processing helps computers understand human language."
    ],
    "input_type": "${voyage4InputType}",
    "output_dimension": ${voyage4Dimensions},
    "output_type": "${voyage4DataType}"
  }'`
      }
    }

    if (model === 'voyage-multimodal-3.5') {
      if (codeLanguageTab === 'python') {
        return `# Vertex AI Voyage Multimodal 3.5 SDK Python
import json
import vertexai

PROJECT_ID = "YOUR_PROJECT_ID"
LOCATION = "us-central1"
vertexai.init(project=PROJECT_ID, location=LOCATION)

MODEL_NAME = "mongodb/voyage-multimodal-3.5@latest"
model = model_garden.OpenModel(MODEL_NAME)
endpoint = model.deploy(accept_eula=True, use_dedicated_endpoint=True)

multimodal_input = {
    "content": [
        {"type": "text", "text": "${voyageInputText.replace(/"/g, '\\"')}"},
        ${voyageHasImage ? '{"type": "image_url", "image_url": "https://raw.githubusercontent.com/voyage-ai/voyage-multimodal-3/refs/heads/main/images/banana.jpg"},' : ''}
        ${voyageHasVideo ? '{"type": "video_url", "video_url": "https://file.garden/aTiKu4GB_i5vfop6/example_video_01.mp4"}' : ''}
    ]
}
body = {
    "model": "voyage-multimodal-3.5",
    "inputs": [multimodal_input],
    "input_type": ${voyageInputType === 'null' ? 'None' : `"${voyageInputType}"`},
    "dimensions": ${voyageDimensions},
    "output_type": "${voyageDataType}"
}
response = endpoint.invoke(
    request_path="/multimodalembeddings",
    body=json.dumps(body).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)
print(response.json())`
      } else {
        return `# Vertex AI Voyage Multimodal API curl call
curl -X POST \\
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/endpoints/YOUR_ENDPOINT_ID:invoke \\
  -d '{
    "model": "voyage-multimodal-3.5",
    "inputs": [{
      "content": [
        {"type": "text", "text": "${voyageInputText.replace(/"/g, '\\"')}"}
        ${voyageHasImage ? ', {"type": "image_url", "image_url": "https://raw.githubusercontent.com/voyage-ai/voyage-multimodal-3/refs/heads/main/images/banana.jpg"}' : ''}
        ${voyageHasVideo ? ', {"type": "video_url", "video_url": "https://file.garden/aTiKu4GB_i5vfop6/example_video_01.mp4"}' : ''}
      ]
    }],
    "input_type": ${voyageInputType === 'null' ? 'null' : `"${voyageInputType}"`},
    "dimensions": ${voyageDimensions},
    "output_type": "${voyageDataType}"
  }'`
      }
    }

    if (model === 'jina-embeddings-v3') {
      if (codeLanguageTab === 'python') {
        return `# Vertex AI Jina Embeddings v3 SDK Python
import json
from google.cloud import aiplatform

PROJECT_ID = "YOUR_PROJECT_ID"
LOCATION = "us-central1"
ENDPOINT_ID = "YOUR_ENDPOINT_ID"

aiplatform.init(project=PROJECT_ID, location=LOCATION)
endpoint = aiplatform.Endpoint(ENDPOINT_ID)

payload = {
    "model": "jina-embeddings-v3",
    "task": "${jinaTask}",
    "dimensions": ${jinaDimensions},
    "input": ["${jinaInput.replace(/"/g, '\\"')}"]
}
response = endpoint.raw_predict(
    body=json.dumps(payload),
    headers={"Content-Type": "application/json"}
)
print(response.text)`
      } else {
        return `# Vertex AI Jina Embeddings API curl call
curl -X POST \\
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/endpoints/YOUR_ENDPOINT_ID:rawPredict \\
  -d '{
    "model": "jina-embeddings-v3",
    "task": "${jinaTask}",
    "dimensions": ${jinaDimensions},
    "input": ["${jinaInput.replace(/"/g, '\\"')}"]
  }'`
      }
    }

    if (model === 'translation-llm') {
      if (codeLanguageTab === 'python') {
        return `# GCP Cloud Translation Python SDK - Adaptive Translation
from google.cloud import translate

def translate_adaptive(text, target_lang="pt"):
    client = translate.TranslationServiceClient()
    parent = "projects/YOUR_PROJECT_ID/locations/us-central1"
    
    # Custom Translation LLM adaptive request
    response = client.translate_text(
        request={
            "contents": [text],
            "target_language_code": target_lang,
            "model": f"{parent}/models/general/translation-llm",
            "source_language_code": "en",
            "parent": parent,
            "mime_type": "text/plain"
        }
    )
    for t in response.translations:
        print(f"Translation: {t.translated_text}")

# Glossary terms actively processed:
# ${glossaryInput.replace(/\n/g, '\n# ')}`
      } else {
        return `# Vertex AI API Cloud Translation curl request
curl -X POST \\
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/endpoints/openapi/predict \\
  -d '{
    "instances": [{
      "source_language_code": "en",
      "target_language_code": "${targetLang}",
      "contents": ["${translationInput.replace(/"/g, '\\"')}"],
      "model": "projects/YOUR_PROJECT_ID/locations/us-central1/models/general/translation-llm"
    }]
  }'`
      }
    }

    if (isGemini) {
      if (model === 'gemini-3-pro-image-preview') {
        if (codeLanguageTab === 'python') {
          if (expressMode) {
            return `# Google Gen AI SDK (Python) - Express Mode
from google import genai
from google.genai import types

client = genai.Client(
    vertexai=True,
    api_key="YOUR_API_KEY"
)

prompt = "Generate a hyper-realistic infographic of a gourmet cheeseburger, deconstructed to show the texture of the toasted brioche bun, the seared crust of the patty, and the glistening melt of the cheese."
response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=['IMAGE', 'TEXT'],
        image_config=types.ImageConfig(
            aspect_ratio="16:9",
            image_size="2K",
        ),
    ),
)
print("Finish Reason:", response.candidates[0].finish_reason)`
          } else {
            return `# Google Gen AI SDK (Python) - Standard Vertex AI
from google import genai
from google.genai import types

PROJECT_ID = "YOUR_PROJECT_ID"
LOCATION = "global"
client = genai.Client(
    vertexai=True,
    project=PROJECT_ID,
    location=LOCATION
)

prompt = "Generate a hyper-realistic infographic of a gourmet cheeseburger, deconstructed to show the texture of the toasted brioche bun, the seared crust of the patty, and the glistening melt of the cheese."
response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=['IMAGE', 'TEXT'],
        image_config=types.ImageConfig(
            aspect_ratio="16:9",
            image_size="2K",
        ),
    ),
)
print("Finish Reason:", response.candidates[0].finish_reason)`
          }
        } else {
          if (expressMode) {
            return `# Agent Platform API - Express Mode (curl)
curl -X POST \\
  -H "Content-Type: application/json" \\
  https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-3-pro-image-preview:generateContent?key=YOUR_API_KEY \\
  -d '{
    "contents": {
      "role": "user",
      "parts": {
        "text": "Generate a hyper-realistic infographic of a gourmet cheeseburger, deconstructed to show the texture of the toasted brioche bun, the seared crust of the patty, and the glistening melt of the cheese."
      }
    },
    "generation_config": {
      "response_modalities": ["TEXT", "IMAGE"]
    }
  }'`
          } else {
            return `# Agent Platform API - Standard Vertex AI (curl)
curl -X POST \\
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/global/publishers/google/models/gemini-3-pro-image-preview:generateContent \\
  -d '{
    "contents": {
      "role": "user",
      "parts": {
        "text": "Generate a hyper-realistic infographic of a gourmet cheeseburger, deconstructed to show the texture of the toasted brioche bun, the seared crust of the patty, and the glistening melt of the cheese."
      }
    },
    "generation_config": {
      "response_modalities": ["TEXT", "IMAGE"]
    }
  }'`
          }
        }
      }

      const modelId = model === 'gemini-3.1-pro' 
        ? 'gemini-3.1-pro' 
        : model === 'gemini-3.1-pro-preview'
          ? 'gemini-3.1-pro-preview'
          : model === 'gemini-3.1-pro-preview-customtools'
            ? 'gemini-3.1-pro-preview-customtools'
            : model === 'gemini-3-flash-preview'
              ? 'gemini-3-flash-preview'
              : model === 'gemini-3-pro-image-preview'
                ? 'gemini-3-pro-image-preview'
                : model === 'gemini-3-pro-preview'
                  ? 'gemini-3-pro-preview'
                  : model === 'gemini-3.5-flash' 
                    ? 'gemini-3.5-flash' 
                    : model === 'gemini-3.1-flash-lite' 
                      ? 'gemini-3.1-flash-lite' 
                      : 'gemini-3.1-flash-lite-preview'

      if (codeLanguageTab === 'python') {
        if (expressMode) {
          return `# Google Gen AI SDK (Python) - Express Mode
from google import genai
from google.genai import types

client = genai.Client(
    vertexai=True, 
    api_key="YOUR_API_KEY"
)

response = client.models.generate_content(
    model="${modelId}",
    contents="O que descreve o EBITDA do Business Syllabus?",
)
print(response.text)`
        } else {
          return `# Google Gen AI SDK (Python) - Standard Vertex AI
from google import genai
from google.genai import types

client = genai.Client(
    vertexai=True,
    project="YOUR_PROJECT_ID",
    location="global"
)

response = client.models.generate_content(
    model="${modelId}",
    contents="O que descreve o EBITDA do Business Syllabus?"
)
print(response.text)`
        }
      } else {
        if (expressMode) {
          return `# Agent Platform API - Express Mode (curl)
curl -X POST \\
  -H "Content-Type: application/json" \\
  https://aiplatform.googleapis.com/v1/publishers/google/models/${modelId}:streamGenerateContent?key=YOUR_API_KEY \\
  -d '{
    "contents": {
      "role": "user",
      "parts": [{
        "text": "O que descreve o EBITDA do Business Syllabus?"
      }]
    }
  }'`
        } else {
          return `# Agent Platform API - Standard Vertex AI (curl)
curl -X POST \\
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/global/publishers/google/models/${modelId}:streamGenerateContent \\
  -d '{
    "contents": {
      "role": "user",
      "parts": [{
        "text": "O que descreve o EBITDA do Business Syllabus?"
      }]
    }
  }'`
        }
      }
    }

    if (isGrok) {
      const modelId = model === 'grok-4.3'
        ? 'grok-4.3'
        : model === 'grok-4.20-non-reasoning'
          ? 'grok-4.20-non-reasoning'
          : model === 'grok-4.1-fast-reasoning'
            ? 'grok-4.1-fast-reasoning'
            : 'grok-4.1-fast-non-reasoning'

      if (codeLanguageTab === 'python') {
        return `# xAI Grok Python SDK on Vertex AI
from google import genai

client = genai.Client(
    vertexai=True, 
    project="YOUR_PROJECT_ID", 
    location="global"
)

response = client.models.generate_content(
    model="publishers/xai/models/${modelId}",
    contents="Análise de elasticidade macroeconômica do Business Syllabus."
)
print(response.text)`
      } else {
        return `# xAI Grok OpenAPI Endpoint (curl)
curl -X POST \\
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/global/endpoints/openapi/chat/completions \\
  -d '{
    "model": "xai/${modelId}",
    "stream": true,
    "messages": [{"role": "user", "content": "Análise de elasticidade macroeconômica"}]
  }'`
      }
    }

    if (isOpenModel) {
      let activeModelId = 'gemma-4-26b-a4b-it'
      let publisherName = 'publishers/google/models/gemma4@'
      let region = 'us-central1'
      if (model.startsWith('deepseek')) {
        activeModelId = model === 'deepseek-v4-pro' ? 'deepseek-v4-pro' : 'deepseek-v4-flash'
        publisherName = 'publishers/deepseek-ai/models/'
      } else if (model.startsWith('llama')) {
        if (model === 'llama-3.3') {
          activeModelId = 'Llama-3-3-70B-Instruct'
          publisherName = 'publishers/meta/models/llama3-3'
          region = 'us-central1'
        } else {
          activeModelId = model === 'llama-4-maverick' ? 'llama-4-maverick-17b-128e-instruct-maas' : 'llama-4-scout-17b-16e-instruct-maas'
          publisherName = 'publishers/meta/models/'
          region = 'us-east5'
        }
      } else if (model === 'mimo-v2.5') {
        activeModelId = 'MiMo-V2.5'
        publisherName = 'XiaomiMiMo/MiMo-V2.5@'
        region = 'us-south1'
      } else if (model === 'qwen-3.5-397b') {
        activeModelId = 'Qwen3.5-397B-A17B'
        publisherName = 'publishers/qwen/models/'
        region = 'us-central1'
      } else if (model === 'qwen-3-next') {
        activeModelId = 'Qwen3-Next-80B-A3B-Instruct'
        publisherName = 'qwen/'
        region = 'us-south1'
      } else if (model.startsWith('minimax')) {
        activeModelId = model === 'minimax-m2.7' ? 'minimax-m2.7' : model === 'minimax-m2.5' ? 'minimax-m2.5' : model === 'minimax-m2.1' ? 'minimax-m2.1' : 'minimax-m2'
        publisherName = 'publishers/minimaxai/models/'
        region = 'us-east1'
      } else if (model === 'glm-5') {
        activeModelId = 'glm5@latest'
        publisherName = 'publishers/glm/models/'
        region = 'us-central1'
      } else if (model === 'gemma-3-27b') {
        activeModelId = 'gemma-3-27b-it'
        publisherName = 'publishers/google/models/gemma3@'
        region = 'us-central1'
      } else if (model === 'medgemma-1.5-4b') {
        activeModelId = 'medgemma-1.5-4b-it'
        publisherName = 'publishers/google/models/medgemma@'
        region = 'us-central1'
      } else if (model === 'gpt-oss') {
        activeModelId = 'gpt-oss-20b'
        publisherName = 'openai/'
        region = 'europe-west4'
      }

      if (codeLanguageTab === 'python') {
        if (model === 'mimo-v2.5') {
          return `# Xiaomi MiMo-V2.5 Python SDK Vertex Deployment
import vertexai
from vertexai import model_garden

MODEL_VERSION_ID = "MiMo-V2.5"
vertexai.init(project="YOUR_PROJECT_ID", location="us-south1")
model = model_garden.OpenModel(f"XiaomiMiMo/MiMo-V2.5@{MODEL_VERSION_ID}")
endpoint = model.deploy()

# Predict Multi-Token reasoning
instances = [{"prompt": "Calcular Runway estratégico."}]
response = endpoint.predict(instances=instances)
print(response.predictions[0])`
        }

        if (model === 'qwen-3.5-397b') {
          return `# Qwen3.5-397B-A17B Model Garden Deployment
import vertexai
from vertexai import model_garden

PROJECT_ID = "YOUR_PROJECT_ID"
REGION = "us-central1"
vertexai.init(project=PROJECT_ID, location=REGION)

model = model_garden.OpenModel("publishers/qwen/models/qwen3-5@qwen3.5-397b-a17b")
endpoint = model.deploy(accept_eula=True)

# Run Inference with Thinking Mode (Temp=0.6, TopP=0.95)
instances = [{
    "@requestFormat": "chatCompletions",
    "messages": [{"role": "user", "content": "Calcular Runway estratégico."}],
    "max_tokens": 32768,
    "temperature": 0.6,
    "top_p": 0.95
}]
response = endpoint.predict(instances=instances, use_dedicated_endpoint=True)
print(response.predictions[0])`
        }

        if (model === 'qwen-3-next') {
          return `# Qwen3-Next-80B Deployment (Python)
import vertexai
from vertexai import model_garden

vertexai.init(project="YOUR_PROJECT_ID", location="us-south1")
model = model_garden.OpenModel("qwen/qwen3-next@Qwen3-Next-80B-A3B-Instruct")
endpoint = model.deploy()

instances = [{"prompt": "Calcular Runway estratégico."}]
response = endpoint.predict(instances=instances)
print(response.predictions[0])`
        }

        if (model === 'llama-3.3') {
          return `# Meta Llama 3.3 70B Instruct Model Garden Deployment
import vertexai
from vertexai import model_garden

PROJECT_ID = "YOUR_PROJECT_ID"
REGION = "us-central1"
vertexai.init(project=PROJECT_ID, location=REGION)

# Deploy Llama 3.3 from Model Garden
model = model_garden.OpenModel("publishers/meta/models/llama3-3")
endpoint = model.deploy(accept_eula=True)

# Run Inference with standard chat schema
instances = [{
    "@requestFormat": "chatCompletions",
    "messages": [{"role": "user", "content": "Calcular Runway estratégico do Business Syllabus."}],
    "max_tokens": 4096,
    "temperature": 0.7,
    "top_p": 0.9
}]
response = endpoint.predict(instances=instances)
print(response.predictions[0])`
        }

        if (model.startsWith('minimax')) {
          return `# MiniMax Forge RL Deployment (Python)
import vertexai
from vertexai import model_garden

vertexai.init(project="YOUR_PROJECT_ID", location="us-east1")
model = model_garden.OpenModel(f"publishers/minimaxai/models/minimax-m2@{model.replace('minimax-', '')}")
endpoint = model.deploy(accept_eula=True)

instances = [{
    "prompt": "]~!b[]~b]system\\nYou are a helpful assistant.[e~[\\n]~b]user\\nCalcular Runway estratégico.[e~[\\n]~b]ai\\n",
    "max_tokens": 128,
    "temperature": 1.0,
    "top_p": 0.95
}]
response = endpoint.predict(instances=instances)
print(response.predictions[0])`
        }

        if (model === 'glm-5') {
          return `# GLM-5 Slime RL Deployment
import vertexai
from vertexai import model_garden

vertexai.init(project="YOUR_PROJECT_ID", location="us-central1")
model = model_garden.OpenModel("publishers/glm/models/glm5@latest")
endpoint = model.deploy(accept_eula=True)

instances = [{
    "@requestFormat": "chatCompletions",
    "messages": [{"role": "user", "content": "Calcular Runway."}],
    "max_tokens": 32768
}]
response = endpoint.predict(instances=instances)
print(response.predictions[0])`
        }

        if (model === 'gemma-3-27b') {
          return `# Gemma 3 27B IT Deployment (JAX & Pathways)
import vertexai
from vertexai import model_garden

vertexai.init(project="YOUR_PROJECT_ID", location="us-central1")
model = model_garden.OpenModel("publishers/google/models/gemma3@gemma-3-27b-it")
endpoint = model.deploy(accept_eula=True)

instances = [{
    "@requestFormat": "chatCompletions",
    "messages": [{"role": "user", "content": "Calcular Runway estratégico."}]
}]
response = endpoint.predict(instances=instances)
print(response.predictions[0])`
        }

        if (model === 'medgemma-1.5-4b') {
          return `# MedGemma-1.5-4B-IT Clinical VLM Deployment
import vertexai
from vertexai import model_garden

vertexai.init(project="YOUR_PROJECT_ID", location="us-central1")
model = model_garden.OpenModel("publishers/google/models/medgemma@medgemma-1.5-4b-it")
endpoint = model.deploy(accept_eula=True)

instances = [{
    "@requestFormat": "chatCompletions",
    "messages": [{"role": "user", "content": "Análise clínica do Business Syllabus."}]
}]
response = endpoint.predict(instances=instances)
print(response.predictions[0])`
        }

        if (model === 'gpt-oss') {
          return `# OpenAI GPT-OSS-20B Deployment (europe-west4)
import vertexai
from vertexai import model_garden

vertexai.init(project="YOUR_PROJECT_ID", location="europe-west4")
model = model_garden.OpenModel("openai/gpt-oss@gpt-oss-20b")
endpoint = model.deploy()

instances = [{"prompt": "Calcular Runway estratégico."}]
response = endpoint.predict(instances=instances)
print(response.predictions[0])`
        }

        return `# Open Model Garden Deployment and Inference (Python)
from google.cloud import aiplatform

# 1. Obter endpoint implantado
endpoint = aiplatform.Endpoint("projects/YOUR_PROJECT/locations/\${region}/endpoints/YOUR_ENDPOINT")

# 2. Executar inferência MoE
instances = [{
    "@requestFormat": "chatCompletions",
    "messages": [{"role": "user", "content": "Calcular Runway estratégico."}]
}]
response = endpoint.predict(instances=instances)
print(response)`
      } else {
        if (model === 'qwen-3.5-397b') {
          return `# Qwen3.5 Model Garden Inference API (curl)
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/us-central1/endpoints/openapi/chat/completions \\
  -d '{
    "instances": [
      {
        "@requestFormat": "chatCompletions",
        "messages": [{"role": "user", "content": "Calcular Runway estratégico."}],
        "max_tokens": 100,
        "temperature": 0.6,
        "top_p": 0.95
      }
    ]
  }'`
        }

        if (model === 'qwen-3-next') {
          return `# Qwen3-Next Model Garden Inference API (curl)
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-south1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/us-south1/endpoints/openapi/chat/completions \\
  -d '{
    "instances": [
      {
        "prompt": "Calcular Runway estratégico."
      }
    ]
  }'`
        }

        if (model === 'llama-3.3') {
          return `# Meta Llama 3.3 Vertex Inference API (curl)
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/us-central1/endpoints/YOUR_ENDPOINT/openapi/chat/completions \\
  -d '{
    "instances": [
      {
        "@requestFormat": "chatCompletions",
        "messages": [{"role": "user", "content": "Calcular Runway estratégico."}],
        "max_tokens": 1024,
        "temperature": 0.7,
        "top_p": 0.9
      }
    ]
  }'`
        }

        if (model.startsWith('minimax')) {
          return `# MiniMax OpenAPI Endpoint (curl)
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-east1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/us-east1/endpoints/openapi/chat/completions \\
  -d '{
    "instances": [
      {
        "prompt": "]~!b[]~b]system\\nYou are a helpful assistant.[e~[\\n]~b]user\\nCalcular Runway.[e~[\\n]~b]ai\\n",
        "max_tokens": 128,
        "temperature": 1.0,
        "top_p": 0.95,
        "raw_response": true
      }
    ]
  }'`
        }

        if (model === 'glm-5') {
          return `# GLM-5 Vertex Inference API (curl)
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/us-central1/endpoints/openapi/chat/completions \\
  -d '{
    "model": "publishers/glm/models/glm5@latest",
    "messages": [{"role": "user", "content": "Calcular Runway estratégico."}]
  }'`
        }

        if (model === 'gemma-3-27b') {
          return `# Gemma 3 Vertex Inference API (curl)
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/us-central1/endpoints/openapi/chat/completions \\
  -d '{
    "model": "publishers/google/models/gemma3@gemma-3-27b-it",
    "messages": [{"role": "user", "content": "Calcular Runway estratégico."}]
  }'`
        }

        if (model === 'medgemma-1.5-4b') {
          return `# MedGemma Vertex Inference API (curl)
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/us-central1/endpoints/openapi/chat/completions \\
  -d '{
    "model": "publishers/google/models/medgemma@medgemma-1.5-4b-it",
    "messages": [{"role": "user", "content": "Análise clínica do Business Syllabus."}]
  }'`
        }

        if (model === 'gpt-oss') {
          return `# GPT OSS Inference API (curl)
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://europe-west4-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/europe-west4/endpoints/openapi/chat/completions \\
  -d '{
    "instances": [
      {
        "prompt": "Calcular Runway estratégico."
      }
    ]
  }'`
        }

        return `# Model Garden Inference API (curl)
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  https://\${region}-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT/locations/\${region}/endpoints/openapi/chat/completions \\
  -d '{"model": "\${publisherName}\${activeModelId}", "messages": [{"role": "user", "content": "Calcular Runway."}]}'`
      }
    }

  const isReasoningModel = 
    model.startsWith('deepseek') ||
    model.startsWith('gemma') ||
    model.startsWith('minimax') ||
    model.startsWith('llama') ||
    model === 'grok-4.1-fast-reasoning' ||
    model === 'qwen-3.5-397b' ||
    model === 'qwen-3-next' ||
    model === 'glm-5' ||
    model === 'medgemma-1.5-4b' ||
    model === 'gpt-oss'

  const isDeployedModel = 
    model.startsWith('gemma') ||
    model.startsWith('deepseek') ||
    model.startsWith('llama') ||
    model.startsWith('minimax') ||
    model === 'mimo-v2.5' ||
    model === 'qwen-3.5-397b' ||
    model === 'qwen-3-next' ||
    model === 'glm-5' ||
    model === 'gpt-oss' ||
    model === 'voyage-multimodal-3.5' ||
    model === 'voyage-4-lite'

  return (
    <div className="hud-card-container relative w-full h-full flex flex-col justify-between">
      <div className="scanlines z-10" />

      {/* Header do Painel */}
      <div className="hero-header relative z-20">
        <div className="live-head text-[#d2af5a] flex items-center gap-2">
          <div className="pulse-dot" />
          <span>AI-04 • BUSINESS SYLLABUS ADVANCED MODEL GARDEN (GEMINI 3.5, VOYAGE 4 & MIMO v2.5)</span>
        </div>
        <div className="ch-label">FREE GCP DEV ACCESS • ADAPTIVE TRANSLATION & SUITE ACTIVE</div>
      </div>

      {/* Conteúdo Principal */}
      <div className="hero-content relative z-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-4" style={{ paddingBottom: '12px' }}>
        
        {/* Lado Esquerdo: Chat Inteligente com Simulação de Raciocínio (DeepSeek & Gemma & Llama) */}
        <div className="ai-chat-screen flex flex-col justify-between h-[420px] bg-[#000]/70 border border-white/5 rounded-2xl overflow-hidden relative">
          
          {/* Seletor de Modelo e Configurações de Raciocínio */}
          <div className="p-2 bg-black/60 border-b border-white/5 flex items-center justify-between gap-1.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-[#d2af5a] font-mono text-[8px] uppercase tracking-wider font-bold">
              <Cpu className="h-3.5 w-3.5" />
              <span>Modelo & Raciocínio</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <select 
                value={model} 
                onChange={(e: any) => setModel(e.target.value as ModelType)}
                className="bg-black/85 text-[8.5px] font-mono text-[#d2af5a] border border-[#d2af5a]/30 rounded px-1 py-0.5 outline-none focus:border-[#d2af5a]"
              >
                <optgroup label="Suíte Google Gemini">
                  <option value="gemini-3.1-pro">Gemini 3.1 Pro (1M)</option>
                  <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro Preview</option>
                  <option value="gemini-3.1-pro-preview-customtools">Gemini 3.1 Pro Preview (Custom Tools)</option>
                  <option value="gemini-3-pro-preview">Gemini 3 Pro Preview</option>
                  <option value="gemini-3-pro-image-preview">Gemini 3 Pro Image Preview</option>
                  <option value="gemini-3-flash-preview">Gemini 3 Flash Preview</option>
                  <option value="gemini-3.5-flash">Gemini 3.5 Flash (1M)</option>
                  <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash Lite (GA)</option>
                  <option value="gemini-3.1-flash-lite-preview">Gemini 3.1 Flash Lite Preview</option>
                  <option value="translation-llm">Translation LLM (Glossary)</option>
                </optgroup>
                <optgroup label="Suíte xAI Grok 4">
                  <option value="grok-4.3">Grok 4.3 Flagship</option>
                  <option value="grok-4.20-non-reasoning">Grok 4.20 Non-Reasoning</option>
                  <option value="grok-4.1-fast-reasoning">Grok 4.1 Fast (Reasoning)</option>
                  <option value="grok-4.1-fast-non-reasoning">Grok 4.1 Fast (Non-Reasoning)</option>
                </optgroup>
                <optgroup label="Model Garden Partners (MoE & Reasoning)">
                  <option value="gemma-4-moe">Gemma 4 26B (Pensante)</option>
                  <option value="deepseek-v4-pro">DeepSeek-V4-Pro (1.6T MoE)</option>
                  <option value="deepseek-v4-flash">DeepSeek-V4-Flash (284B)</option>
                  <option value="llama-4-maverick">Llama 4 Maverick (400B MoE)</option>
                  <option value="llama-4-scout">Llama 4 Scout (10M Context)</option>
                  <option value="llama-3.3">Llama 3.3 (70B Instruct)</option>
                  <option value="mimo-v2.5">Xiaomi MiMo V2.5 (310B)</option>
                  <option value="qwen-3.5-397b">Qwen 3.5 (397B MoE)</option>
                  <option value="qwen-3-next">Qwen3 Next (80B)</option>
                  <option value="minimax-m2">MiniMax M2 (MoE)</option>
                  <option value="minimax-m2.1">MiniMax M2.1 (MoE)</option>
                  <option value="minimax-m2.5">MiniMax M2.5 (MoE)</option>
                  <option value="minimax-m2.7">MiniMax M2.7 (MoE)</option>
                  <option value="glm-5">GLM-5 Flagship (Slime RL)</option>
                  <option value="gemma-3-27b">Gemma 3 27B IT</option>
                  <option value="medgemma-1.5-4b">MedGemma 1.5 4B Clinical VLM</option>
                  <option value="gpt-oss">GPT-OSS 20B/120B</option>
                </optgroup>
                <optgroup label="Model Garden Partners (Embeddings)">
                  <option value="jina-embeddings-v3">Jina Embeddings v3</option>
                  <option value="voyage-multimodal-3.5">Voyage Multimodal 3.5</option>
                  <option value="voyage-4-lite">Voyage 4 Lite</option>
                </optgroup>
              </select>

              {/* Seletor de Reasoning Mode do DeepSeek-V4 */}
              {isReasoningModel && (
                <select
                  value={reasoningMode}
                  onChange={(e: any) => setReasoningMode(e.target.value)}
                  className="bg-black/90 text-[7.5px] font-mono text-[#d2af5a] border border-[#d2af5a]/30 rounded px-1 py-0.5 outline-none"
                >
                  <option value="non-think">Non-think (Rápido)</option>
                  <option value="think-high">Think High (Lógico)</option>
                  <option value="think-max">Think Max (Máximo)</option>
                </select>
              )}

              {isReasoningModel && (
                <button 
                  onClick={() => setShowThinking(!showThinking)}
                  className={`px-1.5 py-0.5 rounded text-[7.5px] font-mono border transition-all flex items-center gap-0.5 cursor-pointer ${showThinking ? 'bg-[#d2af5a]/10 text-[#d2af5a] border-[#d2af5a]/35' : 'text-white/20 border-white/10'}`}
                >
                  {showThinking ? <Eye className="h-2.5 w-2.5" /> : <EyeOff className="h-2.5 w-2.5" />}
                  <span>PENSAR</span>
                </button>
              )}
            </div>
          </div>

          {/* Histórico do Chat */}
          <div className="ai-chat-messages flex-1 p-3 overflow-y-auto space-y-2 text-[10px] scrollbar-none">
            {chatHistory.map((m, idx) => (
              <div key={idx} className="space-y-1.5">
                {/* Linha de Raciocínio do DeepSeek/Gemma/Grok */}
                {m.thought && (
                  <details className="group border border-[#d2af5a]/25 bg-[#d2af5a]/0.04 rounded-lg p-2.5 font-mono text-[7.5px] text-[#d2af5a]/90 max-w-[85%] select-none cursor-pointer">
                    <summary className="font-bold flex items-center gap-1 uppercase tracking-wider text-[#d2af5a]/70">
                      <span>✦ Linha de Raciocínio (Internal Thinking)</span>
                      <span className="text-[6.5px] text-white/30 ml-auto group-open:hidden">(Ver Pensamento)</span>
                      <span className="text-[6.5px] text-white/30 ml-auto hidden group-open:inline">(Ocultar)</span>
                    </summary>
                    <div className="mt-1.5 border-t border-[#d2af5a]/10 pt-1.5 whitespace-pre-wrap leading-relaxed">
                      {m.thought}
                    </div>
                  </details>
                )}
                
                <div
                  className={`chat-msg p-2 px-3 rounded-xl max-w-[85%] leading-relaxed ${m.sender === 'user' ? 'bg-white/10 ml-auto text-white' : 'bg-[#d2af5a]/5 text-[#d2af5a] border border-[#d2af5a]/15'}`}
                  dangerouslySetInnerHTML={{ __html: m.text }}
                />
              </div>
            ))}

            {/* Simulação de Escrita do Pensamento (Thinking Real-time) */}
            {thinkingOutput && (
              <div className="border border-[#d2af5a]/30 bg-[#d2af5a]/0.05 rounded-lg p-2.5 font-mono text-[7.5px] text-[#d2af5a] max-w-[85%] animate-pulse space-y-1">
                <div className="font-bold uppercase tracking-wider text-[#d2af5a] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d2af5a] animate-ping" />
                  <span>Modelo Pensando Passo a Passo...</span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed border-t border-[#d2af5a]/10 pt-1 mt-1 font-light">
                  {thinkingOutput}
                </div>
              </div>
            )}
            
            {isLoading && !thinkingOutput && (
              <div className="chat-loading-bubble flex items-center gap-1 py-1.5 px-3 bg-white/5 border border-white/10 rounded-full w-[60px]">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Selo Built with Llama (Licensing Compliance Llama 4) */}
          {model.startsWith('llama') && (
            <div className="absolute top-12 right-3 z-30 select-none animate-fadeIn">
              <span className="flex items-center gap-1 text-[7.5px] font-mono font-bold text-[#d2af5a] bg-[#d2af5a]/10 border border-[#d2af5a]/30 px-2 py-0.5 rounded-full shadow-2xl">
                <ShieldCheck className="h-3 w-3" />
                <span>BUILT WITH LLAMA</span>
              </span>
            </div>
          )}

          {/* Chips de Comando Rápido */}
          <div className="flex flex-wrap gap-1 px-3 pb-2 select-none">
            <span
              className="cursor-pointer px-2.5 py-1 text-[8.5px] font-mono font-semibold rounded-full bg-[#d2af5a]/10 border border-[#d2af5a]/25 text-[#d2af5a] hover:bg-[#d2af5a]/20 transition"
              onClick={() => triggerQuickAi('SWOT Viva Meta vs TikTok')}
            >
              SWOT Viva (Ads)
            </span>
            <span
              className="cursor-pointer px-2.5 py-1 text-[8.5px] font-mono font-semibold rounded-full bg-white/5 border border-white/10 text-[#d2af5a] hover:bg-blue-500/20 transition"
              onClick={() => triggerQuickAi('Investir Caixa em CDI')}
            >
              Decisão CDI
            </span>
            <span
              className="cursor-pointer px-2.5 py-1 text-[8.5px] font-mono font-semibold rounded-full bg-[#d2af5a]/10 border border-white/10 text-white/90 hover:bg-[#d2af5a]/20 transition"
              onClick={() => triggerQuickAi('Deploy do Modelo no Model Garden')}
            >
              Model Garden
            </span>
          </div>

          {/* Input de Mensagem */}
          <div className="ai-chat-input-bar border-t border-white/5 bg-black/40 flex items-center p-1.5">
            <input
              type="text"
              placeholder={isReasoningModel ? "Fale com a IA (Pensamento Ativo)..." : "Pergunte sobre EBITDA, WACC, SWOT, CDI..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendChatMessage(inputValue)
              }}
              className="flex-1 bg-transparent text-[10px] text-white px-2 py-1 focus:outline-none placeholder-white/30"
            />
            <button 
              onClick={() => sendChatMessage(inputValue)}
              className="h-7 w-7 rounded-xl bg-[#d2af5a] text-black font-bold flex items-center justify-center cursor-pointer hover:scale-105 active:scale-98 transition"
            >
              ›
            </button>
          </div>
        </div>

        {/* Lado Direito: Tabbed Panel (Model Garden vs GCP Multimodal Studio - Imagen & Veo vs Adaptive Translation vs Embeddings Sandbox) */}
        <div className="ai-tuning-pane h-[420px] bg-[#000]/70 border border-white/5 rounded-2xl p-3 flex flex-col justify-between select-none">
          
          {/* Cabeçalho de Abas */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setRightPanelTab('garden')}
                className={`px-2 py-1 rounded-lg text-[8px] font-mono font-bold transition flex items-center gap-1 ${rightPanelTab === 'garden' ? 'bg-[#d2af5a] text-black' : 'text-white/40'}`}
              >
                <Sliders className="h-3 w-3" />
                <span>Model SDK</span>
              </button>
              <button 
                onClick={() => setRightPanelTab('multimodal')}
                className={`px-2 py-1 rounded-lg text-[8px] font-mono font-bold transition flex items-center gap-1 ${rightPanelTab === 'multimodal' ? 'bg-[#d2af5a] text-black' : 'text-white/40'}`}
              >
                <ImageIcon className="h-3 w-3" />
                <span>GCP GenAI</span>
              </button>
              <button 
                onClick={() => setRightPanelTab('translate')}
                className={`px-2 py-1 rounded-lg text-[8px] font-mono font-bold transition flex items-center gap-1 ${rightPanelTab === 'translate' ? 'bg-[#d2af5a] text-black' : 'text-white/40'}`}
              >
                <Languages className="h-3 w-3" />
                <span>Glossary</span>
              </button>
              <button 
                onClick={() => setRightPanelTab('embeddings')}
                className={`px-2 py-1 rounded-lg text-[8px] font-mono font-bold transition flex items-center gap-1 ${rightPanelTab === 'embeddings' ? 'bg-[#d2af5a] text-black' : 'text-white/40'}`}
              >
                <Compass className="h-3 w-3" />
                <span>Embed Sandbox</span>
              </button>
            </div>
            <span className="text-[7px] font-mono bg-white/5 text-[#d2af5a] border border-white/10 px-1 py-0.5 rounded">
              FREE
            </span>
          </div>

          {/* ABA 1: MODEL GARDEN (DEPLOY & CODE GENERATOR WITH EXPRESS MODE SWITCHER) */}
          {rightPanelTab === 'garden' && (
            <div className="flex-1 flex flex-col justify-between mt-2 overflow-y-auto scrollbar-none animate-fadeIn">
              <div className="flex flex-col gap-2">
                <div className="text-[8px] font-mono text-white/50 leading-relaxed">
                  Consulte os snippets e integre a telemetria do {model} usando códigos de produção do Vertex AI.
                </div>

                {/* Seletor de Express Mode para Gemini */}
                {model.startsWith('gemini') && (
                  <div className="flex items-center justify-between p-1.5 bg-white/[0.02] border border-white/5 rounded-lg text-[8px] font-mono">
                    <span className="text-white/60">GCP Express Mode (Chave API direta)</span>
                    <button
                      onClick={() => setExpressMode(!expressMode)}
                      className={`px-2 py-0.5 rounded text-[7.5px] font-mono border transition ${expressMode ? 'bg-[#d2af5a]/20 text-[#d2af5a] border-[#d2af5a]/40' : 'bg-black/40 text-white/40 border-white/10'}`}
                    >
                      {expressMode ? 'ATIVO' : 'DESATIVADO'}
                    </button>
                  </div>
                )}

                {/* Abas do Código (Python vs curl) */}
                <div className="flex items-center gap-1 border-b border-white/5 pb-1">
                  <button
                    onClick={() => setCodeLanguageTab('python')}
                    className={`px-2 py-0.5 rounded text-[7px] font-mono transition ${codeLanguageTab === 'python' ? 'bg-white/10 text-white border border-white/10' : 'text-white/40'}`}
                  >
                    Python SDK
                  </button>
                  <button
                    onClick={() => setCodeLanguageTab('curl')}
                    className={`px-2 py-0.5 rounded text-[7px] font-mono transition ${codeLanguageTab === 'curl' ? 'bg-white/10 text-white border border-white/10' : 'text-white/40'}`}
                  >
                    curl API
                  </button>
                </div>

                {/* Código de Implantação e Chamada reativo */}
                <div className="bg-black/50 border border-white/5 rounded-lg p-2.5 font-mono text-[7px] leading-relaxed relative group overflow-hidden max-h-[140px] overflow-y-auto scrollbar-none">
                  <Code2 className="absolute top-2 right-2 h-3.5 w-3.5 text-white/10 group-hover:text-white/20 transition" />
                  <pre className="text-white/90/90 whitespace-pre-wrap">{renderDynamicCode()}</pre>
                </div>

                {/* Progresso de Deploy (Apenas para modelos que exigem carregamento de VRAM/TPU) */}
                {isDeployedModel && (
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between text-[8px] font-mono">
                      <span className="text-[#d2af5a] font-bold">Status do Cluster TPU:</span>
                      <span>{tuningProgress}%</span>
                    </div>
                    <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-[#d2af5a] to-blue-400 transition-all duration-700" 
                        style={{ width: `${tuningProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Console de Logs de Execução do GCP SDK (Apenas se Open Model for selecionado) */}
              {isDeployedModel ? (
                <div className="border border-white/5 bg-[#050505] rounded-lg mt-2 overflow-hidden flex-1 flex flex-col justify-between min-h-[80px]">
                  <div className="bg-black/95 px-2 py-1 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-1 text-[#4ade80] font-mono text-[7px] font-bold">
                      <TerminalIcon className="h-3 w-3" />
                      <span>GCP SDK ORBITAL LOGS</span>
                    </div>
                  </div>
                  <div className="p-2 font-mono text-[6px] text-[#4ade80]/90 h-[70px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
                    {tuningLogs.length === 0 ? (
                      <div className="text-white/25 italic text-center py-4">Aguardando inicialização do deploy de TPU...</div>
                    ) : (
                      tuningLogs.map((log, index) => (
                        <div key={index} className="whitespace-pre-wrap">{log}</div>
                      ))
                    )}
                    <div ref={tuningLogsEndRef} />
                  </div>
                </div>
              ) : (
                <div className="border border-white/5 bg-black/40 rounded-lg p-2.5 mt-2 flex-1 flex flex-col justify-center items-center gap-1 text-center font-mono">
                  <Binary className="h-6 w-6 text-[#d2af5a]/40" />
                  <span className="text-[8px] text-[#d2af5a]">Conexão Instantânea de API Ativa</span>
                  <span className="text-[6.5px] text-white/30 max-w-[200px]">Sem custos de infraestrutura. Escala automática com tempo de resposta estável na GCP.</span>
                </div>
              )}

              {/* Botão de Deploy para Open Models */}
              {isDeployedModel && (
                <div className="mt-2">
                  {tuningProgress === 100 ? (
                    <div className="w-full py-1.5 bg-[#d2af5a]/10 border border-[#d2af5a]/30 text-white/90 rounded-xl text-[8px] font-mono font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>TPU CLUSTER OPERACIONAL!</span>
                    </div>
                  ) : (
                    <button 
                      onClick={startModelDeployment}
                      disabled={tuningActive}
                      className="w-full py-1.5 bg-[#d2af5a] hover:bg-[#e0b85e] disabled:opacity-50 text-black font-bold rounded-xl text-[8px] font-mono flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-all"
                    >
                      <Play className="h-3 w-3 fill-black" />
                      <span>DEPLOY MODEL VERTEX SDK</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ABA 2: GCP GENAI SUITE (IMAGEN 4 & VEO 3) */}
          {rightPanelTab === 'multimodal' && (
            <div className="flex-1 flex flex-col justify-between mt-2 overflow-y-auto scrollbar-none animate-fadeIn">
              
              {/* Seletor Interno de Mídia (Imagem vs Vídeo) */}
              <div className="grid grid-cols-2 gap-1 bg-black/40 p-1 rounded-lg border border-white/5 mb-2">
                <button
                  onClick={() => setMultimodalType('image')}
                  className={`py-1 rounded text-[8px] font-mono font-bold transition flex items-center justify-center gap-1 cursor-pointer ${multimodalType === 'image' ? 'bg-[#d2af5a]/15 text-[#d2af5a] border border-[#d2af5a]/20' : 'text-white/40'}`}
                >
                  <ImageIcon className="h-2.5 w-2.5" />
                  <span>Imagen 4</span>
                </button>
                <button
                  onClick={() => setMultimodalType('video')}
                  className={`py-1 rounded text-[8px] font-mono font-bold transition flex items-center justify-center gap-1 cursor-pointer ${multimodalType === 'video' ? 'bg-[#d2af5a]/15 text-[#d2af5a] border border-[#d2af5a]/20' : 'text-white/40'}`}
                >
                  <Video className="h-2.5 w-2.5" />
                  <span>Veo 3.0 (Vídeo)</span>
                </button>
              </div>

              {/* SEÇÃO IMAGEN 4 */}
              {multimodalType === 'image' && (
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Modelo</label>
                        <select 
                          value={imagenModel} 
                          onChange={(e: any) => setImagenModel(e.target.value)}
                          className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-[#d2af5a] outline-none"
                        >
                          <option value="imagen-4.0-ultra">Imagen 4 Ultra</option>
                          <option value="imagen-4.0-fast">Imagen 4 Fast</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Proporção</label>
                        <select 
                          value={aspectRatio} 
                          onChange={(e: any) => setAspectRatio(e.target.value)}
                          className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-white outline-none"
                        >
                          <option value="1:1">1:1 (Quadrado)</option>
                          <option value="16:9">16:9 (Widescreen)</option>
                          <option value="9:16">9:16 (Vertical)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-1 border-y border-white/5 text-[7.5px] font-mono text-white/50">
                      <span>Prompt Enhancement (LLM Rewriter)</span>
                      <button 
                        onClick={() => setEnhancePrompt(!enhancePrompt)}
                        className={`px-1.5 py-0.5 rounded text-[7px] font-mono border transition ${enhancePrompt ? 'bg-[#d2af5a]/10 text-[#d2af5a] border-[#d2af5a]/35' : 'text-white/20 border-white/10'}`}
                      >
                        {enhancePrompt ? 'ATIVO' : 'INATIVO'}
                      </button>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[7px] font-mono text-white/40 uppercase">Prompt Imagen</label>
                      <textarea 
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        className="bg-black border border-white/10 rounded p-1 text-[8px] text-white/90 h-[40px] resize-none outline-none focus:border-[#d2af5a] scrollbar-none"
                      />
                    </div>
                  </div>

                  {/* Logs Imagen */}
                  {isGeneratingImage && (
                    <div className="border border-white/5 bg-[#050505] rounded-lg mt-1 overflow-hidden flex flex-col justify-between min-h-[50px]">
                      <div className="p-1.5 font-mono text-[5.5px] text-[#d2af5a]/90 h-[50px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
                        {imagenLogs.map((log, index) => (
                          <div key={index} className="whitespace-pre-wrap">{log}</div>
                        ))}
                        <div ref={imagenLogsEndRef} />
                      </div>
                    </div>
                  )}

                  {/* Imagem Resultado */}
                  {generatedImages.length > 0 && !isGeneratingImage && (
                    <div className="mt-1 relative rounded-lg border border-[#d2af5a]/20 bg-black/40 overflow-hidden flex items-center justify-center p-1 group">
                      <img 
                        src={generatedImages[0]} 
                        alt="Generated Mockup" 
                        className="max-h-[60px] object-contain rounded-md filter drop-shadow-[0_0_8px_rgba(201, 148, 58,0.2)]" 
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[5px] font-mono text-white/90 border border-[#d2af5a]/30">
                        SYNTHID PROTECTED
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={generateImagen4Image}
                    disabled={isGeneratingImage || !imagePrompt.trim()}
                    className="w-full mt-2 py-2 bg-[#d2af5a] text-black font-bold rounded-xl text-[9px] font-mono flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition"
                  >
                    <ImageIcon className="h-3.5 w-3.5 fill-black" />
                    <span>{isGeneratingImage ? 'DIFUNDINDO PIXELS...' : 'GERAR IMAGEM COM IMAGEN 4'}</span>
                  </button>
                </div>
              )}

              {/* SEÇÃO VEO 3 (VÍDEO) */}
              {multimodalType === 'video' && (
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Resolução</label>
                        <select 
                          value={veoResolution} 
                          onChange={(e: any) => setVeoResolution(e.target.value)}
                          className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-[#d2af5a] outline-none"
                        >
                          <option value="1080p">1080p Full HD</option>
                          <option value="720p">720p HD</option>
                          <option value="4k">4k Ultra HD</option>
                        </select>
                      </div>
                      
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Gerar Áudio</label>
                        <button
                          onClick={() => setVeoAudio(!veoAudio)}
                          className={`w-full p-1 rounded text-[8px] font-mono border transition flex items-center justify-center gap-1 cursor-pointer ${veoAudio ? 'bg-[#d2af5a]/10 text-[#d2af5a] border-[#d2af5a]/35' : 'text-white/20 border-white/10'}`}
                        >
                          {veoAudio ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                          <span>{veoAudio ? 'ATIVADO' : 'INATIVO'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[7px] font-mono text-white/40 uppercase">Diretiva do Vídeo (Prompt)</label>
                      <textarea 
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        className="bg-black border border-white/10 rounded p-1 text-[8px] text-white/90 h-[40px] resize-none outline-none focus:border-amber-400 scrollbar-none"
                      />
                    </div>
                  </div>

                  {/* Logs de Polling de Operação Long-Running Veo 3 */}
                  {isGeneratingVideo && (
                    <div className="border border-white/5 bg-[#050505] rounded-lg mt-1 overflow-hidden flex flex-col justify-between min-h-[60px]">
                      <div className="bg-black/95 px-2 py-0.5 flex items-center justify-between border-b border-white/5">
                        <div className="text-[#d2af5a] font-mono text-[5.5px] font-bold">
                          VEO-3 LONG-RUNNING OP ({operationId})
                        </div>
                      </div>
                      <div className="p-1.5 font-mono text-[5.5px] text-[#4ade80]/90 h-[60px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
                        {veoLogs.map((log, index) => (
                          <div key={index} className="whitespace-pre-wrap">{log}</div>
                        ))}
                        <div ref={veoLogsEndRef} />
                      </div>
                    </div>
                  )}

                  {/* Vídeo Resultado */}
                  {generatedVideos.length > 0 && !isGeneratingVideo && (
                    <div className="mt-1 relative rounded-lg border border-[#d2af5a]/20 bg-black/40 overflow-hidden flex flex-col items-center justify-center p-1.5">
                      <div className="flex items-center gap-1 text-white/90 font-mono text-[7px] font-bold mb-1">
                        <Film className="h-3 w-3 animate-pulse" />
                        <span>projects/business-syllabus/TIMESTAMP/video_0.mp4</span>
                      </div>
                      <img 
                        src={generatedVideos[0]} 
                        alt="Video Frame Preview" 
                        className="max-h-[50px] object-contain rounded-md filter drop-shadow-[0_0_8px_rgba(245,158,11,0.2)]" 
                      />
                      <div className="absolute bottom-2 right-2 bg-black/90 px-1 py-0.5 rounded text-[5px] font-mono text-[#d2af5a] border border-[#d2af5a]/30">
                        VEO SynthID SECURE
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={generateVeo3Video}
                    disabled={isGeneratingVideo || !videoPrompt.trim()}
                    className="w-full mt-2 py-2 bg-[#d2af5a] text-black font-bold rounded-xl text-[9px] font-mono flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition"
                  >
                    <Film className="h-3.5 w-3.5 fill-black" />
                    <span>{isGeneratingVideo ? 'PROCESSANDO OPERAÇÃO...' : 'GERAR VÍDEO COM VEO 3.0'}</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ABA 3: ADAPTIVE TRANSLATION STUDIO (CUSTOM TRANSLATION LLM) */}
          {rightPanelTab === 'translate' && (
            <div className="flex-1 flex flex-col justify-between mt-2 overflow-y-auto scrollbar-none animate-fadeIn">
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[7px] font-mono text-white/40 uppercase">Idioma Origem</label>
                      <select 
                        value={sourceLang} 
                        onChange={(e: any) => setSourceLang(e.target.value)}
                        className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-white outline-none"
                      >
                        <option value="en">English (US)</option>
                        <option value="pt">Português (BR)</option>
                        <option value="es">Español (ES)</option>
                        <option value="ja">日本語 (JP)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[7px] font-mono text-white/40 uppercase">Idioma Destino</label>
                      <select 
                        value={targetLang} 
                        onChange={(e: any) => setTargetLang(e.target.value)}
                        className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-[#d2af5a] outline-none"
                      >
                        <option value="pt">Português (BR)</option>
                        <option value="es">Español (ES)</option>
                        <option value="ja">日本語 (JP)</option>
                        <option value="en">English (US)</option>
                      </select>
                    </div>
                  </div>

                  {/* Glossários / Pares Adaptativos */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-center text-[7px] font-mono text-white/45">
                      <span className="uppercase">Glossário (Adaptativo)</span>
                      <span className="text-white/20">Termo = Substituição</span>
                    </div>
                    <textarea 
                      value={glossaryInput}
                      onChange={(e) => setGlossaryInput(e.target.value)}
                      placeholder="IPB = Plataforma de Inteligência..."
                      className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-[#d2af5a] h-[45px] resize-none outline-none focus:border-[#d2af5a] scrollbar-none"
                    />
                  </div>

                  {/* Texto de Entrada */}
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[7px] font-mono text-white/40 uppercase">Texto para Tradução</label>
                    <textarea 
                      value={translationInput}
                      onChange={(e) => setTranslationInput(e.target.value)}
                      className="bg-black border border-white/10 rounded p-1 text-[8px] text-white/90 h-[40px] resize-none outline-none focus:border-[#d2af5a] scrollbar-none"
                    />
                  </div>
                </div>

                {/* Logs de tradução */}
                {isTranslating && (
                  <div className="border border-white/5 bg-[#050505] rounded-lg mt-1 overflow-hidden flex flex-col justify-between min-h-[50px]">
                    <div className="p-1 font-mono text-[5.5px] text-[#4ade80]/90 h-[50px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
                      {translationLogs.map((log, index) => (
                        <div key={index} className="whitespace-pre-wrap">{log}</div>
                      ))}
                      <div ref={translationLogsEndRef} />
                    </div>
                  </div>
                )}

                {/* Resultado da Tradução */}
                {translationOutput && !isTranslating && (
                  <div className="mt-1 relative rounded-lg border border-[#d2af5a]/20 bg-black/40 p-2 font-mono text-[8px] text-white/90 max-h-[60px] overflow-y-auto scrollbar-none">
                    <div className="text-[6px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-0.5 mb-1 flex items-center justify-between">
                      <span>Saída Adaptativa</span>
                      <span className="text-white/90 font-bold">Glossário OK</span>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: translationOutput }} />
                  </div>
                )}

                <button 
                  onClick={handleAdaptiveTranslation}
                  disabled={isTranslating || !translationInput.trim()}
                  className="w-full mt-2 py-1.5 bg-[#d2af5a] text-black font-bold rounded-xl text-[8px] font-mono flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition"
                >
                  <Languages className="h-3.5 w-3.5" />
                  <span>{isTranslating ? 'TRADUZINDO ADAPTATIVO...' : 'EXECUTAR ADAPTIVE TRANSLATE'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ABA 4: EMBEDDINGS VECTOR SANDBOX (JINA EMBEDDINGS V3 & VOYAGE MULTIMODAL 3.5 & VOYAGE 4 LITE) */}
          {rightPanelTab === 'embeddings' && (
            <div className="flex-1 flex flex-col justify-between mt-2 overflow-y-auto scrollbar-none animate-fadeIn">
              
              {/* Sub-Aba de Embeddings (Jina vs Voyage Multimodal vs Voyage 4 Lite) */}
              {model === 'voyage-4-lite' ? (
                /* BATCH TEXT EMBEDDING SANDBOX VOYAGE 4 LITE */
                <div className="space-y-2 flex-1 flex flex-col justify-between text-[8px] font-mono">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Input Type</label>
                        <select 
                          value={voyage4InputType} 
                          onChange={(e: any) => setVoyage4InputType(e.target.value)}
                          className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-[#d2af5a] outline-none"
                        >
                          <option value="null">General / null</option>
                          <option value="query">Query (Retrieval)</option>
                          <option value="document">Document (Index)</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Dimension / Data Type</label>
                        <div className="grid grid-cols-2 gap-1">
                          <select 
                            value={voyage4Dimensions} 
                            onChange={(e: any) => setVoyage4Dimensions(Number(e.target.value) as any)}
                            className="bg-black border border-white/10 rounded p-0.5 text-[7px] font-mono text-white outline-none"
                          >
                            <option value="2048">2048 d</option>
                            <option value="1024">1024 d</option>
                            <option value="512">512 d</option>
                            <option value="256">256 d</option>
                          </select>
                          <select 
                            value={voyage4DataType} 
                            onChange={(e: any) => setVoyage4DataType(e.target.value as any)}
                            className="bg-black border border-white/10 rounded p-0.5 text-[7px] font-mono text-[#d2af5a] outline-none"
                          >
                            <option value="float">float32</option>
                            <option value="int8">int8</option>
                            <option value="uint8">uint8</option>
                            <option value="binary">binary</option>
                            <option value="ubinary">ubinary</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Lote de Sentenças de Entrada */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex justify-between items-center text-[7px] font-mono text-white/40">
                        <span className="uppercase">Textos Lote (Separado por Quebra)</span>
                        <span className="text-white/20">Shared space active</span>
                      </div>
                      <textarea 
                        value={voyage4Texts}
                        onChange={(e) => setVoyage4Texts(e.target.value)}
                        className="bg-black border border-white/10 rounded p-1 text-[7.5px] text-white/90 h-[50px] resize-none outline-none focus:border-[#d2af5a] scrollbar-none"
                      />
                    </div>
                  </div>

                  {/* Logs Voyage 4 */}
                  {isVoyage4Embedding && (
                    <div className="border border-white/5 bg-[#050505] rounded-lg mt-1 overflow-hidden flex flex-col justify-between min-h-[50px]">
                      <div className="p-1 font-mono text-[5.5px] text-[#4ade80]/90 h-[50px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
                        {voyage4Logs.map((log, index) => (
                          <div key={index} className="whitespace-pre-wrap">{log}</div>
                        ))}
                        <div ref={voyage4LogsEndRef} />
                      </div>
                    </div>
                  )}

                  {/* Vetores Lote Voyage 4 */}
                  {voyage4Result && !isVoyage4Embedding && (
                    <div className="mt-1 relative rounded-lg border border-white/10 bg-black/40 p-2 font-mono text-[6.5px] text-white/90 max-h-[85px] overflow-y-auto scrollbar-none">
                      <div className="text-[6px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-0.5 mb-1 flex items-center justify-between">
                        <span>LOTE DE EMBEDDINGS ({voyage4Result.totalTexts} Vetores × {voyage4Result.dimensions}d)</span>
                        <span className="text-[#d2af5a] font-bold">{voyage4Result.dataType}</span>
                      </div>
                      <div className="space-y-1.5">
                        {voyage4Result.embeddings.map((item: any, idx: number) => (
                          <div key={idx} className="border-b border-white/[0.03] pb-1 last:border-0 last:pb-0">
                            <div className="text-white/40 truncate text-[5.8px]">Text: "{item.text}"</div>
                            <div className="text-[#4ade80] font-bold truncate">[{item.vector.join(', ')}, ...]</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleVoyage4Embedding}
                    disabled={isVoyage4Embedding || !voyage4Texts.trim()}
                    className="w-full mt-2 py-1.5 bg-[#d2af5a] text-black font-bold rounded-xl text-[8px] font-mono flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition"
                  >
                    <Compass className="h-3.5 w-3.5" />
                    <span>{isVoyage4Embedding ? 'VETORIZANDO LOTE H100...' : 'GERAR BATCH EMBEDDINGS'}</span>
                  </button>
                </div>
              ) : model === 'voyage-multimodal-3.5' ? (
                /* MIXER MULTIMODAL VOYAGE 3.5 */
                <div className="space-y-2 flex-1 flex flex-col justify-between text-[8px] font-mono">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Input Type</label>
                        <select 
                          value={voyageInputType} 
                          onChange={(e: any) => setVoyageInputType(e.target.value)}
                          className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-[#d2af5a] outline-none"
                        >
                          <option value="null">General / null</option>
                          <option value="query">Query (Retrieval)</option>
                          <option value="document">Document (Index)</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Dimension / Data Type</label>
                        <div className="grid grid-cols-2 gap-1">
                          <select 
                            value={voyageDimensions} 
                            onChange={(e: any) => setVoyageDimensions(Number(e.target.value) as any)}
                            className="bg-black border border-white/10 rounded p-0.5 text-[7px] font-mono text-white outline-none"
                          >
                            <option value="2048">2048 d</option>
                            <option value="1024">1024 d</option>
                            <option value="512">512 d</option>
                            <option value="256">256 d</option>
                          </select>
                          <select 
                            value={voyageDataType} 
                            onChange={(e: any) => setVoyageDataType(e.target.value as any)}
                            className="bg-black border border-white/10 rounded p-0.5 text-[7px] font-mono text-[#d2af5a] outline-none"
                          >
                            <option value="float">float32</option>
                            <option value="int8">int8</option>
                            <option value="uint8">uint8</option>
                            <option value="binary">binary</option>
                            <option value="ubinary">ubinary</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-1.5 bg-white/[0.02] border border-white/5 rounded-lg flex items-center justify-between gap-2 text-[7.5px]">
                      <span className="text-white/40">Misturar Mídias (Mixer):</span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={voyageHasImage} 
                            onChange={() => setVoyageHasImage(!voyageHasImage)} 
                            className="rounded accent-[#d2af5a] cursor-pointer"
                          />
                          <span>+ Imagem</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={voyageHasVideo} 
                            onChange={() => setVoyageHasVideo(!voyageHasVideo)} 
                            className="rounded accent-[#d2af5a] cursor-pointer"
                          />
                          <span>+ Vídeo</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[7px] font-mono text-white/40 uppercase">Texto Intercalado</label>
                      <textarea 
                        value={voyageInputText}
                        onChange={(e) => setVoyageInputText(e.target.value)}
                        className="bg-black border border-white/10 rounded p-1 text-[8px] text-white/90 h-[40px] resize-none outline-none focus:border-[#d2af5a] scrollbar-none"
                      />
                    </div>
                  </div>

                  {/* Logs Voyage */}
                  {isVoyageEmbedding && (
                    <div className="border border-white/5 bg-[#050505] rounded-lg mt-1 overflow-hidden flex flex-col justify-between min-h-[50px]">
                      <div className="p-1 font-mono text-[5.5px] text-[#4ade80]/90 h-[50px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
                        {voyageLogs.map((log, index) => (
                          <div key={index} className="whitespace-pre-wrap">{log}</div>
                        ))}
                        <div ref={voyageLogsEndRef} />
                      </div>
                    </div>
                  )}

                  {/* Vetor Voyage Gerado */}
                  {voyageResult && !isVoyageEmbedding && (
                    <div className="mt-1 relative rounded-lg border border-white/10 bg-black/40 p-2 font-mono text-[7px] text-white/90">
                      <div className="text-[6px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-0.5 mb-1 flex items-center justify-between">
                        <span>MULTIMODAL VECTOR ({voyageResult.dimensions}d - {voyageResult.dataType})</span>
                        <span className="text-white/90 font-bold">
                          {voyageResult.dataType.includes('binary') ? '32x COMPRESSED' : voyageResult.dataType !== 'float' ? '4x COMPRESSED' : 'FLOAT32 PRECISION'}
                        </span>
                      </div>
                      <div className="text-[#4ade80] font-bold truncate mb-1">
                        [{voyageResult.vector.join(', ')}, ...]
                      </div>
                      <div className="flex justify-between text-[6px] text-white/40">
                        <span>Type: {voyageInputType}</span>
                        <span>Tokens: {voyageResult.totalTokens} | Img: {voyageResult.imagePixels} px | Vid: {voyageResult.videoPixels} px</span>
                      </div>
                      <div className="flex items-end gap-0.5 h-6 mt-1 border-t border-white/5 pt-1">
                        {voyageResult.vector.map((val: any, idx: number) => {
                          const height = voyageResult.dataType.includes('binary')
                            ? (val === 1 ? 100 : 20)
                            : Math.min(Math.max((Math.abs(Number(val)) / (voyageResult.dataType !== 'float' ? 1.28 : 0.01)), 20), 100)
                          return (
                            <div 
                              key={idx} 
                              className="flex-1 rounded-t-sm"
                              style={{ 
                                height: `${height}%`, 
                                background: val > 0 ? 'rgba(74, 222, 128, 0.6)' : 'rgba(201, 148, 58, 0.6)',
                                border: '0.1px solid rgba(255,255,255,0.05)'
                              }}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleVoyageEmbedding}
                    disabled={isVoyageEmbedding || !voyageInputText.trim()}
                    className="w-full mt-2 py-1.5 bg-[#d2af5a] text-black font-bold rounded-xl text-[8px] font-mono flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition"
                  >
                    <Compass className="h-3.5 w-3.5" />
                    <span>{isVoyageEmbedding ? 'MIXANDO MULTIMODAL GPU...' : 'GERAR MULTIMODAL EMBEDDING'}</span>
                  </button>
                </div>
              ) : (
                /* SANDBOX JINA EMBEDDINGS V3 */
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Task Adapter</label>
                        <select 
                          value={jinaTask} 
                          onChange={(e: any) => setJinaTask(e.target.value)}
                          className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-[#d2af5a] outline-none"
                        >
                          <option value="text-matching">Semantic / text-matching</option>
                          <option value="retrieval.query">Search / retrieval.query</option>
                          <option value="retrieval.passage">Doc / retrieval.passage</option>
                          <option value="separation">Clustering / separation</option>
                          <option value="classification">Classification</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <label className="text-[7px] font-mono text-white/40 uppercase">Matryoshka Size</label>
                        <select 
                          value={jinaDimensions} 
                          onChange={(e: any) => setJinaDimensions(Number(e.target.value) as any)}
                          className="bg-black border border-white/10 rounded p-1 text-[7.5px] font-mono text-white outline-none"
                        >
                          <option value="1024">1024 d (Full)</option>
                          <option value="768">768 d</option>
                          <option value="512">512 d</option>
                          <option value="256">256 d</option>
                          <option value="128">128 d</option>
                          <option value="64">64 d (Matryoshka)</option>
                          <option value="32">32 d (Matryoshka)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-y border-white/5 text-[7px] font-mono text-white/50">
                      <span className="flex items-center gap-1">Late Chunking (Context preservation)</span>
                      <button
                        onClick={() => setJinaLateChunking(!jinaLateChunking)}
                        className={`px-2 py-0.5 rounded text-[6.5px] border transition ${jinaLateChunking ? 'bg-[#d2af5a]/10 text-[#d2af5a] border-[#d2af5a]/35' : 'text-white/20 border-white/10'}`}
                      >
                        {jinaLateChunking ? 'ATIVADO' : 'DESATIVADO'}
                      </button>
                    </div>

                    {/* Texto de entrada */}
                    <div className="flex flex-col gap-0.5">
                      <label className="text-[7px] font-mono text-white/40 uppercase">Texto para Vetorizar</label>
                      <textarea 
                        value={jinaInput}
                        onChange={(e) => setJinaInput(e.target.value)}
                        className="bg-black border border-white/10 rounded p-1 text-[8px] text-white/90 h-[40px] resize-none outline-none focus:border-[#d2af5a] scrollbar-none"
                      />
                    </div>
                  </div>

                  {/* Logs Embeddings */}
                  {isEmbedding && (
                    <div className="border border-white/5 bg-[#050505] rounded-lg mt-1 overflow-hidden flex flex-col justify-between min-h-[50px]">
                      <div className="p-1 font-mono text-[5.5px] text-[#4ade80]/90 h-[50px] overflow-y-auto space-y-0.5 leading-normal scrollbar-none">
                        {embeddingLogs.map((log, index) => (
                          <div key={index} className="whitespace-pre-wrap">{log}</div>
                        ))}
                        <div ref={embeddingLogsEndRef} />
                      </div>
                    </div>
                  )}

                  {/* Vetor Jina Gerado */}
                  {embeddingResult && !isEmbedding && (
                    <div className="mt-1 relative rounded-lg border border-white/10 bg-black/40 p-2 font-mono text-[7px] text-white/90">
                      <div className="text-[6px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-0.5 mb-1 flex items-center justify-between">
                        <span>JINA VECTOR ({embeddingResult.dimensions}d)</span>
                        <span className="text-[#d2af5a] font-bold">L2 NORMALIZED</span>
                      </div>
                      <div className="text-[#4ade80] font-bold truncate mb-1">
                        [{embeddingResult.vector.join(', ')}, ...]
                      </div>
                      <div className="flex justify-between text-[6px] text-white/40">
                        <span>Adapter: {embeddingResult.adapter}</span>
                        <span>Usage: {embeddingResult.tokenUsage} tokens</span>
                      </div>
                      {/* Barras Gráficas do Vetor */}
                      <div className="flex items-end gap-0.5 h-6 mt-1 border-t border-white/5 pt-1">
                        {embeddingResult.vector.map((val: number, idx: number) => {
                          const height = Math.min(Math.max((Math.abs(val) * 100), 20), 100)
                          return (
                            <div 
                              key={idx} 
                              className="flex-1 rounded-t-sm"
                              style={{ 
                                height: `${height}%`, 
                                background: val > 0 ? 'rgba(74, 222, 128, 0.6)' : 'rgba(201, 148, 58, 0.6)',
                                border: '0.1px solid rgba(255,255,255,0.05)'
                              }}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={handleJinaEmbedding}
                    disabled={isEmbedding || !jinaInput.trim()}
                    className="w-full mt-2 py-1.5 bg-[#d2af5a] text-black font-bold rounded-xl text-[8px] font-mono flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition"
                  >
                    <Compass className="h-3.5 w-3.5" />
                    <span>{isEmbedding ? 'VETORIZANDO GPU...' : 'GERAR VECTOR EMBEDDING'}</span>
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  )
}
