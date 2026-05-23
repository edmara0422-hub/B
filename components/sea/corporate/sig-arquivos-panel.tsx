'use client'

import React, { useState } from 'react'

type VaultFile = {
  id: string
  name: string
  category: 'Relatório' | 'Contrato' | 'Auditoria' | 'Outro'
  size: string
  date: string
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
          background: linear-gradient(90deg, #cbd5e1 0%, #d4b87a 100%) !important;
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
          font-family: monospace; font-size: 9.5px; letter-spacing: .1em; color: #d4b87a; font-weight: 500;
          border: 0.2px solid rgba(255, 255, 255, 0.08); padding: 3px 9px; border-radius: 4px; background: rgba(218,165,32,.04);
        }
        .sec-id .tag { font-family: monospace; font-size: 10px; letter-spacing: .1em; color: #8a9098; text-transform: uppercase }
        .sec-h {
          font-family: inherit; font-size: 22px; letter-spacing: -.02em;
          font-weight: 300; line-height: 1.2; color: #fff;
          margin-top: 4px; margin-bottom: 0;
        }
        .sec-h .em {
          background: linear-gradient(135deg, #b8975a 0%, #d4b87a 28%, #e8cc88 50%, #d4b87a 72%, #b8975a 100%);
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
          background: rgba(212, 184, 122, 0.12) !important;
          border: 0.2px solid rgba(212, 184, 122, 0.3) !important;
          color: #d4b87a;
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
      `}</style>

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
                    className="h-full bg-[#d4b87a] rounded-full"
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
                            className="text-white/30 hover:text-red-400 font-mono text-[9px] hover:underline"
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
              className="border border-dashed border-[#d4b87a]/20 bg-black/10 hover:bg-[#d4b87a]/5 p-5 rounded-xl text-center cursor-pointer transition flex flex-col items-center justify-center gap-2"
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
              <span className="font-mono text-[8.5px] text-[#d4b87a] tracking-wider uppercase border-b border-white/[0.08] pb-2">
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
                className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] py-2 rounded-md text-[10px] font-medium text-white transition mt-2 w-full"
              >
                + Arquivar no Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
