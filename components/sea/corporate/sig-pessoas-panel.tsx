'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSigPessoasStore } from './sig-pessoas/store'

import { SigPessoasHome } from './sig-pessoas/sig-pessoas-home'
import { SigPessoasLideres } from './sig-pessoas/sig-pessoas-lideres'
import { SigPessoasTime } from './sig-pessoas/sig-pessoas-time'
import { SigPessoasEmpresa } from './sig-pessoas/sig-pessoas-empresa'

export function SigPessoasPanel() {
  const { activeTab } = useSigPessoasStore()

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 font-sans selection:bg-[#d4b87a]/30">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/30 mb-8 border-b border-white/5 pb-4">
          <span className="hover:text-white/70 cursor-pointer">SIG OS</span>
          <span>/</span>
          <span className="text-[#d4b87a]">{activeTab}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <SigPessoasHome />}
            {activeTab === 'lideres' && <SigPessoasLideres />}
            {activeTab === 'time' && <SigPessoasTime />}
            {activeTab === 'empresa' && <SigPessoasEmpresa />}
          </motion.div>
        </AnimatePresence>
        
      </div>
    </div>
  )
}
