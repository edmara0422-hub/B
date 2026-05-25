"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Heart, MessageCircle, Share2, Bookmark, Music, Camera, Activity, Brain, Shield } from 'lucide-react';
import './social.css';

export default function SocialDesignSpace() {
  const [activeTab, setActiveTab] = useState('tiktok');

  return (
    <div className="ipb-social-bg min-h-screen w-full relative pb-24">
      {/* Top Navigation */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 bg-black/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white/90 via-[#dbe1e8]/30 to-[#0e0f12]/90 flex items-center justify-center border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white pl-1">IPB</span>
          </div>
          <span className="text-sm font-light text-white/80 tracking-widest uppercase">Design Space</span>
        </div>
        
        <div className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('tiktok')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 ${activeTab === 'tiktok' ? 'bg-white/10 text-white shadow-md border border-white/10' : 'text-white/40 hover:text-white/70'}`}
          >
            TIKTOK
          </button>
          <button 
            onClick={() => setActiveTab('instagram')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300 ${activeTab === 'instagram' ? 'bg-white/10 text-white shadow-md border border-white/10' : 'text-white/40 hover:text-white/70'}`}
          >
            INSTAGRAM
          </button>
        </div>
      </header>

      <main className="pt-32 px-6 max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
            <span className="ipb-shimmer-text font-medium">Conteúdo Social</span> para o IPB
          </h1>
          <p className="text-white/40 font-light tracking-wide max-w-lg mx-auto">
            Design interativo e em alta performance para capturar a atenção de profissionais de saúde em segundos.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'tiktok' && (
            <motion.div 
              key="tiktok"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col md:flex-row gap-12 items-center justify-center w-full"
            >
              {/* TikTok Video 1: Simulação 3D */}
              <TikTokMockup 
                tag="6D IMERSIVO"
                title="Pulmão na SDRA grave: Veja o que acontece 🫁"
                description="Simulação 3D exclusiva do IPB FISIO."
                Icon={Activity}
                gradient="from-[#050505] via-[#050505] to-[#121a2f]"
              />

              {/* TikTok Video 2: Desafio Clínico */}
              <TikTokMockup 
                tag="DESAFIO UTI"
                title="Qual a Driving Pressure deste paciente? 🚨"
                description="Aprenda a calcular em 30 segundos e salve vidas."
                Icon={Brain}
                gradient="from-[#050505] via-[#050505] to-[#2f1a12]"
              />
            </motion.div>
          )}

          {activeTab === 'instagram' && (
            <motion.div 
              key="instagram"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col md:flex-row gap-12 items-center justify-center w-full"
            >
              <InstagramMockup 
                category="ARTIGO"
                title="Por que a PEEP importa?"
                body="Evidências recentes mostram que o ajuste individualizado da PEEP reduz a mortalidade em até 14% na Síndrome do Desconforto Respiratório Agudo."
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// COMPONENTES
// ────────────────────────────────────────────────────────

function TikTokMockup({ tag, title, description, Icon, gradient }: { tag: string, title: string, description: string, Icon: any, gradient: string }) {
  return (
    <div className="relative group">
      {/* Glow effect behind the device */}
      <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-[#d2af5a]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
      
      <div className="mockup-device-tiktok relative z-10">
        {/* Fake Video Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
          {/* Background Decor */}
          <div className="absolute inset-0 opacity-20 flex items-center justify-center">
             <Icon size={180} className="text-white/5" />
          </div>
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
        </div>

        {/* Video Overlays */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {/* Top nav */}
          <div className="flex justify-between items-start pt-12 px-5">
             <div className="text-white/80 font-semibold text-lg flex items-center gap-2">
               IPB <span className="text-white/40 text-xs font-light">FISIO</span>
             </div>
             <div className="text-white/60">
                <Camera size={20} />
             </div>
          </div>

          {/* Right sidebar icons */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-1 p-[2px]">
                 <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#121212] to-[#333] border border-white/10 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-[#d2af5a]">IPB</span>
                 </div>
              </div>
              <div className="w-5 h-5 rounded-full bg-[#ea4335] text-white flex items-center justify-center absolute -bottom-2 border-2 border-black">
                 <span className="text-[10px] leading-none">+</span>
              </div>
            </div>

            <SidebarIcon Icon={Heart} count="12.4K" />
            <SidebarIcon Icon={MessageCircle} count="342" />
            <SidebarIcon Icon={Bookmark} count="1.2K" />
            <SidebarIcon Icon={Share2} count="58" />

            <div className="mt-4 animate-spin-slow w-10 h-10 rounded-full bg-white/10 border-[3px] border-black flex items-center justify-center overflow-hidden">
               <Music size={14} className="text-white/70" />
            </div>
          </div>

          {/* Bottom text info */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 gradient-overlay-bottom flex flex-col justify-end p-4 pb-6 z-0 pointer-events-none">
            <div className="w-[80%]">
              <div className="inline-block px-2 py-0.5 rounded bg-[#d2af5a]/20 border border-[#d2af5a]/30 text-[#d2af5a] text-[9px] font-bold tracking-widest mb-2">
                {tag}
              </div>
              <h3 className="text-white font-medium text-sm leading-snug mb-1 drop-shadow-md">
                {title}
              </h3>
              <p className="text-white/70 text-xs font-light drop-shadow-sm mb-3">
                {description}
              </p>
              
              {/* Music ticker */}
              <div className="flex items-center gap-2 text-white/80">
                <Music size={12} />
                <span className="text-xs font-light truncate w-48">Som original - IPB Fisio Oficial</span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
            <div className="h-full bg-white/80 w-1/3 rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarIcon({ Icon, count }: { Icon: any, count: string | number }) {
  return (
    <div className="flex flex-col items-center gap-1 group cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center transition-colors group-hover:bg-black/40">
        <Icon size={22} className="text-white drop-shadow-lg" fill="transparent" />
      </div>
      <span className="text-white/90 text-[10px] font-medium drop-shadow-md">{count}</span>
    </div>
  );
}


function InstagramMockup({ category, title, body }: { category: string, title: string, body: string }) {
  return (
    <div className="mockup-post-ig flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center px-4 justify-between bg-[#050505]">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d2af5a] to-[#7a5c20] p-[1.5px]">
              <div className="w-full h-full bg-black rounded-full border border-black flex items-center justify-center">
                 <span className="text-[8px] font-bold text-white">IPB</span>
              </div>
           </div>
           <div>
             <div className="text-white text-xs font-medium flex items-center gap-1">
               ipb.fisio
               <Shield size={10} className="text-blue-400 fill-blue-400" />
             </div>
             <div className="text-white/40 text-[9px]">Instituto Presbiteriano</div>
           </div>
        </div>
        <div className="text-white/50 tracking-widest text-lg leading-none mb-2">...</div>
      </div>

      {/* Content Square */}
      <div className="mockup-post-ig-square flex flex-col justify-center items-center p-8 text-center border-b border-white/5">
        
        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(210,175,90,0.15)_0%,_transparent_70%)]" />
        
        <div className="relative z-10 ipb-glass-panel p-6 w-full max-w-[280px]">
           <span className="inline-block px-2 py-1 rounded bg-white/5 border border-white/10 text-[#d2af5a] text-[8px] font-bold tracking-[0.2em] uppercase mb-4">
             {category}
           </span>
           <h2 className="text-xl text-white font-medium mb-3 leading-snug">
             <span className="ipb-shimmer-text">{title}</span>
           </h2>
           <div className="h-[1px] w-12 bg-white/10 mx-auto mb-3" />
           <p className="text-white/60 text-xs font-light leading-relaxed">
             {body}
           </p>
        </div>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-4 flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Actions */}
      <div className="bg-[#050505] p-3 flex flex-col gap-2">
        <div className="flex justify-between items-center text-white/80">
          <div className="flex gap-4">
            <Heart size={20} />
            <MessageCircle size={20} />
            <Share2 size={20} />
          </div>
          <Bookmark size={20} />
        </div>
        <div className="text-white text-xs font-medium mt-1">
          2,451 curtidas
        </div>
        <div className="text-white/90 text-xs font-light leading-snug">
          <span className="font-medium mr-1">ipb.fisio</span>
          Deslize para o lado para entender como aplicamos isso na beira do leito. 🫁✨
        </div>
      </div>
    </div>
  );
}
