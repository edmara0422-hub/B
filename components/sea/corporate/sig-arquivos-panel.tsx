'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, UploadCloud, FolderOpen, FileText, Trash2, Plus, HardDrive } from 'lucide-react'

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

  const [toastMsg, setToastMsg] = useState<string | null>(null)

  function triggerToast(msg: string) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  function handleAddFile() {
    if (!newName.trim()) {
      triggerToast('Por favor, digite o nome do arquivo.')
      return
    }

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
    triggerToast(`Arquivo ${nameWithExt} arquivado no Vault!`)
  }

  function handleDeleteFile(id: string, name: string) {
    setFiles(files.filter(f => f.id !== id))
    triggerToast(`Arquivo ${name} removido com sucesso.`)
  }

  // Filter & Search logic
  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchesCat = activeCategory === 'todos' || f.category.toLowerCase() === activeCategory.toLowerCase()
    return matchesSearch && matchesCat
  })

  // Calculate used space
  const totalFiles = files.length
  const usedSpace = (files.reduce((acc, f) => acc + parseFloat(f.size), 0)).toFixed(1)

  return (
    <div className="ipb-soft p-5 border border-white/[0.04] rounded-[1.2rem] space-y-6">
      {/* Toast Alert floating */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 px-4 py-2 rounded-lg text-xs font-medium shadow-2xl backdrop-blur-md border bg-black/90 text-[#d4b87a] border-[#d4b87a]/20"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/[0.04] pb-3 gap-3">
        <div>
          <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a]/70">SIG · ARQUIVOS</span>
          <h3 className="text-sm font-semibold text-white/90">Cockpit Vault Database</h3>
          <p className="text-[10px] text-white/40">Repositório criptografado para relatórios consolidados e documentos de governança</p>
        </div>
        
        {/* Capacity Indicator */}
        <div className="flex items-center gap-2.5 p-2 bg-black/20 border border-white/[0.03] rounded-[0.6rem] shrink-0">
          <HardDrive className="h-5 w-5 text-[#d4b87a]" />
          <div className="text-[9px] leading-tight">
            <span className="text-white/60 font-medium">Capacidade: {usedSpace} MB / 100 MB</span>
            <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden mt-1 w-28">
              <div 
                className="h-full bg-[#d4b87a] rounded-full" 
                style={{ width: `${Math.min((parseFloat(usedSpace) / 100) * 100, 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Table with Search and Filter pills */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Search Bar */}
            <div className="flex-1 flex items-center gap-2 rounded-[0.7rem] bg-black/40 border border-white/[0.08] px-3 py-2">
              <Search className="h-3.5 w-3.5 shrink-0 text-white/30" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar arquivos por nome..."
                className="flex-1 bg-transparent text-[11px] text-white/70 outline-none placeholder:text-white/20"
              />
            </div>
            {/* Category Pills */}
            <div className="flex flex-wrap gap-1 items-center">
              {['todos', 'relatório', 'contrato', 'auditoria', 'outro'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[9px] uppercase tracking-wider transition ${
                    activeCategory === cat 
                      ? 'bg-[#d4b87a]/12 border border-[#d4b87a]/25 text-[#d4b87a] font-semibold' 
                      : 'bg-white/[0.02] border border-white/[0.05] text-white/40 hover:text-white/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Database Grid Table */}
          <div className="overflow-x-auto border border-white/[0.04] bg-black/25 rounded-[0.8rem]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.01] text-[8.5px] uppercase tracking-wider text-white/30">
                  <th className="p-3">Nome do Arquivo</th>
                  <th className="p-3">Categoria</th>
                  <th className="p-3">Tamanho</th>
                  <th className="p-3">Maturidade</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredFiles.length > 0 ? (
                  filteredFiles.map(file => (
                    <tr key={file.id} className="hover:bg-white/[0.01] transition text-[10.5px]">
                      <td className="p-3 font-medium text-white/80 flex items-center gap-2">
                        <FileText className="h-3.5 w-3.5 text-white/30 shrink-0" />
                        <span className="truncate max-w-[200px]" title={file.name}>{file.name}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-[0.3rem] text-[8px] uppercase tracking-wide bg-white/[0.04] border border-white/[0.06] text-white/60">
                          {file.category}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-white/40">{file.size}</td>
                      <td className="p-3 font-mono text-white/40">{file.date}</td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => handleDeleteFile(file.id, file.name)}
                          className="text-white/30 hover:text-red-400 p-1.5 rounded transition hover:bg-white/[0.04]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-white/30 text-[10px]">
                      Nenhum arquivo encontrado no Vault.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Upload zone & Archiving Form */}
        <div className="lg:col-span-4 space-y-4">
          {/* Custom Dropzone */}
          <div 
            onClick={() => triggerToast('Carregando seletor de arquivos local...')}
            className="border border-dashed border-[#d4b87a]/20 bg-black/10 hover:bg-[#d4b87a]/5 p-5 rounded-[0.8rem] text-center cursor-pointer transition flex flex-col items-center justify-center gap-2.5"
          >
            <UploadCloud className="h-8 w-8 text-[#d4b87a]/80" />
            <div>
              <span className="text-[10px] font-semibold text-white/90 block">Arraste arquivos aqui</span>
              <span className="text-[8.5px] text-white/40 block mt-0.5">Suporta PDF, XLSX, DOCX até 15MB</span>
            </div>
          </div>

          {/* Archiving Form */}
          <div className="p-4 bg-black/20 border border-white/[0.03] rounded-[0.8rem] space-y-3">
            <span className="text-[7.5px] uppercase tracking-widest text-[#d4b87a] block">Arquivamento Manual</span>
            
            <div className="space-y-2">
              <div>
                <label className="text-[9px] text-white/50 block mb-1">Nome do Documento</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: balanco_patrimonial_q1"
                  className="w-full bg-black/40 border border-white/[0.08] rounded-[0.5rem] px-3 py-1.5 text-[10.5px] outline-none text-white focus:border-[#d4b87a]/45 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-white/50 block mb-1">Categoria</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full bg-black/40 border border-white/[0.08] rounded-[0.5rem] px-2.5 py-1.5 text-[10.5px] outline-none text-white/80 cursor-pointer"
                  >
                    <option value="Relatório">Relatório</option>
                    <option value="Contrato">Contrato</option>
                    <option value="Auditoria">Auditoria</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] text-white/50 block mb-1">Tamanho (MB)</label>
                  <input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Ex: 3.5 MB"
                    className="w-full bg-black/40 border border-white/[0.08] rounded-[0.5rem] px-3 py-1.5 text-[10.5px] outline-none text-white focus:border-[#d4b87a]/45 transition"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleAddFile}
              className="w-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] py-2 rounded-[0.6rem] text-[10px] font-medium text-white transition flex items-center justify-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" /> Arquivar no Vault
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
