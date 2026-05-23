'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, Calculator, Cpu, FileText, Search, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import Link from 'next/link'

// Importações dos Painéis Clínicos Homologados (Intactos)
import { ProntuarioSystemPanel } from '@/components/sea/prontuario-system-panel'
import { VMSystemPanel } from '@/components/sea/vm-system-panel'
import { ICUSystemPanel } from '@/components/sea/icu-system-panel'

// Importações dos Painéis Corporativos Integrados (SIG, SIE, SIO, COMP)
import { SigPessoasPanel } from '@/components/sea/corporate/sig-pessoas-panel'
import { SigMercadoPanel } from '@/components/sea/corporate/sig-mercado-panel'
import { SigEsgPanel } from '@/components/sea/corporate/sig-esg-panel'
import { SigFeedbackPanel } from '@/components/sea/corporate/sig-feedback-panel'
import { SigArquivosPanel } from '@/components/sea/corporate/sig-arquivos-panel'
import { SiePanel } from '@/components/sea/corporate/sie-panel'
import { SioPanel } from '@/components/sea/corporate/sio-panel'
import { CompPanel } from '@/components/sea/corporate/comp-panel'

// Definição dos Grupos da Sidebar — Padrão NASA x Cockpit
const SIDEBAR_GROUPS = [
  {
    id: 'clin',
    code: 'CLIN',
    label: 'CLÍNICO',
    items: [
      { id: 'S1', title: 'IPB ICU', desc: 'S1 · Módulo Clínico' },
      { id: 'S2', title: 'Calculadoras', desc: 'S2 · Módulo Clínico' },
      { id: 'S3', title: 'Referência Clínica', desc: 'S3 · Módulo Clínico' },
    ]
  },
  {
    id: 'sig',
    code: 'SIG',
    label: 'GERENCIAL',
    items: [
      { id: 'sig-pessoas', title: 'Pessoas', desc: 'Líderes & Gestores' },
      { id: 'sig-mercado', title: 'Mercado', desc: 'Panorama Cruzado' },
      { id: 'sig-esg', title: 'ESG', desc: 'Sustentabilidade & Governança' },
      { id: 'sig-feedback', title: 'Feedback & NPS', desc: 'Cultura & Feedback' },
      { id: 'arquivos', title: 'Arquivos', desc: 'Relatórios do Cockpit' },
    ]
  },
  {
    id: 'sie',
    code: 'SIE',
    label: 'ESTRATÉGICO',
    items: [
      { id: 'meu-negocio', title: 'Meu Negócio', desc: 'Runway · OKRs · TRL' },
      { id: 'sie-forecast', title: 'Cenários & Forecast', desc: 'Planejamento e forecast' },
      { id: 'sie-inovacao', title: 'Inovação', desc: 'Ambiente P&D' },
      { id: 'sie-canvas', title: 'Canvas & Pitch', desc: 'Modelo Canvas' },
    ]
  },
  {
    id: 'sio',
    code: 'SIO',
    label: 'OPERACIONAL',
    items: [
      { id: 'sio-ia', title: 'IA Advisor', desc: 'Análise de dados preditivos' },
      { id: 'sio-finance', title: 'Cockpit Financeiro', desc: 'Liquidez e despesas' },
      { id: 'sio-pricing', title: 'Smart Pricing', desc: 'Estratégia de preços' },
      { id: 'sio-processos', title: 'Processos', desc: 'Fluxogramas e SOPs' },
    ]
  },
  {
    id: 'comp',
    code: 'COMP',
    label: 'COMPLIANCE',
    items: [
      { id: 'comp-denuncias', title: 'Canal de Denúncias', desc: 'Governança IPB' },
      { id: 'comp-governanca', title: 'Governança', desc: 'Políticas & Contratos' },
    ]
  }
]

export default function SistemasPageClient() {
  const [activeNavId, setActiveNavId] = useState<string>('S1')
  const [search, setSearch] = useState('')
  const [activeGroup, setActiveGroup] = useState<string | null>('clin')
  const [accMode, setAccMode] = useState<'padrao' | 'foco' | 'calmo' | 'contraste'>('padrao')
  const [timeStr, setTimeStr] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Efeito para manter relógio UTC atualizado em tempo real
  useEffect(() => {
    const updateTime = () => {
      const d = new Date()
      const t = [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()]
        .map(n => String(n).padStart(2, '0'))
        .join(':')
      setTimeStr(t)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Efeito para auto-expandir o grupo correspondente ao activeNavId selecionado
  useEffect(() => {
    const matchedGroup = SIDEBAR_GROUPS.find(group => 
      group.items.some(item => item.id === activeNavId)
    )
    if (matchedGroup) {
      setActiveGroup(matchedGroup.id)
    }
  }, [activeNavId])

  // Lógica de filtragem baseada na busca
  const q = search.toLowerCase().trim()
  const filteredGroups = SIDEBAR_GROUPS.map(group => {
    const filteredItems = group.items.filter(item => {
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        (item.desc && item.desc.toLowerCase().includes(q)) ||
        item.id.toLowerCase().includes(q)
      )
    })
    return { ...group, items: filteredItems }
  }).filter(group => group.items.length > 0)

  // Mapeamento do crumb dinâmico no Top HUD
  const getBreadcrumb = () => {
    const group = SIDEBAR_GROUPS.find(g => g.items.some(i => i.id === activeNavId))
    const item = group?.items.find(i => i.id === activeNavId)
    if (group && item) {
      return `${group.code} · ${group.label} · ${item.title.toUpperCase()}`
    }
    return 'IPB OPERATIONAL · COCKPIT'
  }

  // Renderizador central de conteúdo do Router
  const renderActivePanel = () => {
    switch (activeNavId) {
      case 'S1':
        return <ProntuarioSystemPanel />
      case 'S2':
        return <VMSystemPanel />
      case 'S3':
        return <ICUSystemPanel />
      case 'sig-pessoas':
        return <SigPessoasPanel />
      case 'sig-mercado':
        return <SigMercadoPanel />
      case 'sig-esg':
        return <SigEsgPanel />
      case 'sig-feedback':
        return <SigFeedbackPanel />
      case 'arquivos':
        return <SigArquivosPanel />
      case 'meu-negocio':
        return <SiePanel initialTab="forecast" />
      case 'sie-forecast':
        return <SiePanel initialTab="forecast" />
      case 'sie-inovacao':
        return <SiePanel initialTab="inovacao" />
      case 'sie-canvas':
        return <SiePanel initialTab="canvas" />
      case 'sio-ia':
        return <SioPanel initialTab="ia" />
      case 'sio-finance':
        return <SioPanel initialTab="finance" />
      case 'sio-pricing':
        return <SioPanel initialTab="pricing" />
      case 'sio-processos':
        return <SioPanel initialTab="processos" />
      case 'comp-denuncias':
        return <CompPanel initialTab="denuncias" />
      case 'comp-governanca':
        return <CompPanel initialTab="governanca" />
      default:
        return (
          <div className="p-8 text-center text-white/40">
            Selecione uma ferramenta na sidebar para começar.
          </div>
        )
    }
  }

  return (
    <div className={`app-workspace-layout ${sidebarOpen ? '' : 'sidebar-closed'} ${accMode === 'foco' ? 'acc-foco' : ''} ${accMode === 'calmo' ? 'acc-calmo' : ''} ${accMode === 'contraste' ? 'acc-contraste' : ''}`}>
      
      {/* Estilos CSS Scoped para isolamento total da página */}
      <style>{`
        .app-workspace-layout {
          --g-1: #c5a55a;
          --g-2: #b8975a;
          --g-3: #e0c887;
          --g-line: rgba(224,200,135,.15);
          --g-line-on: rgba(224,200,135,.38);
          --g-glow: rgba(224,200,135,.10);
          --c-gold: #d4b87a;
          --c-gold-dim: rgba(212, 184, 122, 0.35);
          --s-1: #c8cdd3;
          --s-2: #8a9098;
          --s-3: #f3f5f8;
          --s-4: #3b3d42;
          --s-line: rgba(200,205,215,.09);
          --s-line-on: rgba(200,205,215,.18);
          --obs-0: #050505;
          --obs-1: #0b0b0c;
          --obs-2: #151517;
          --obs-3: #232428;
          --ink: #f3f5f8;
          --ink-2: #c8cdd3;
          --ink-mute: #8a9098;
          --green: #7fa37a;
          --grad-silver: linear-gradient(135deg, #8a9098 0%, #e2e8f0 25%, #ffffff 50%, #cbd5e1 75%, #64748b 100%);
          --grad-gold: linear-gradient(135deg, #b8975a 0%, #d4b87a 28%, #e8cc88 50%, #d4b87a 72%, #b8975a 100%);
          --grad-gold-soft: linear-gradient(135deg, #b8975a 0%, #e0c887 50%, #b8975a 100%);
          --grad-gold-warm: linear-gradient(135deg, #b8975a 0%, #d4b87a 28%, #e8cc88 50%, #d4b87a 72%, #b8975a 100%);
          --f-display: 'Poppins', sans-serif;
          --f-mono: 'Poppins', sans-serif;
          --f-body: 'Poppins', sans-serif;
 
          position: relative;
          display: grid;
          grid-template-columns: 240px 1fr;
          height: 100vh;
          width: 100vw;
          background: transparent;
          color: var(--ink);
          font-family: var(--f-body);
          font-weight: 200;
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .app-workspace-layout.sidebar-closed {
          grid-template-columns: 1fr !important;
        }

        @media (max-width: 768px) {
          .app-workspace-layout {
            grid-template-columns: 86px 1fr !important;
          }
          .app-workspace-layout.sidebar-closed {
            grid-template-columns: 1fr !important;
          }
          
          /* Hide bulky text widgets on mobile to make the sidebar thin */
          .app-workspace-layout .side-title-block,
          .app-workspace-layout .fase-badge,
          .app-workspace-layout .telemetry-widget,
          .app-workspace-layout .acc-panel,
          .app-workspace-layout .side-nav-item .info,
          .app-workspace-layout .tab .name,
          .app-workspace-layout .side div:has(input[placeholder*="Buscar"]) {
            display: none !important;
          }
          
          .app-workspace-layout .side {
            padding: 12px 6px !important;
            width: 86px !important;
            overflow-x: hidden !important;
          }
          
          .app-workspace-layout .tab {
            width: 70px !important;
            padding: 8px 4px !important;
          }
          
          .app-workspace-layout .tab .tab-frame {
            width: 46px !important;
            height: 46px !important;
          }
          
          .app-workspace-layout .tab .code {
            font-size: 11px !important;
          }
          
          .app-workspace-layout .side-nav-item {
            justify-content: center !important;
            padding: 8px 4px !important;
          }
          
          .app-workspace-layout .side-nav-item .bullet {
            width: 6px !important;
            height: 6px !important;
          }
        }    -webkit-font-smoothing: antialiased;
        }

        /* Ambient background stars and nebulas */
        .app-workspace-layout .bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(circle at 50% 50%, #0d0c11 0%, #050406 60%, #000000 100%);
          overflow: hidden;
        }
        .app-workspace-layout .bg-nebulas {
          position: absolute; inset: -15%;
          background: 
            radial-gradient(circle at 75% 20%, rgba(212, 184, 122, 0.22), transparent 50%),
            radial-gradient(circle at 15% 45%, rgba(184, 151, 90, 0.12), transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(212, 184, 122, 0.1), transparent 45%),
            radial-gradient(circle at 35% 20%, rgba(40, 60, 110, 0.22), transparent 50%),
            radial-gradient(circle at 50% 85%, rgba(13, 11, 16, 0.95), transparent 70%);
          filter: blur(50px);
          animation: nebulaDrift 22s ease-in-out infinite;
        }
        .app-workspace-layout .bg-stars {
          position: absolute; inset: 0;
          background:
            radial-gradient(white, rgba(255, 255, 255, .45) 1px, transparent 35px) 40px 50px / 160px 160px,
            radial-gradient(white, rgba(255, 255, 255, .3) 1.5px, transparent 25px) 150px 300px / 220px 220px,
            radial-gradient(var(--c-gold), rgba(212, 184, 122, .25) 2px, transparent 45px) 380px 120px / 320px 320px,
            radial-gradient(white, rgba(255, 255, 255, .25) 1.2px, transparent 28px) 80px 480px / 180px 180px,
            radial-gradient(var(--c-gold), rgba(255, 255, 255, .15) 1px, transparent 20px) 450px 550px / 290px 290px;
          animation: twinkle 6s ease-in-out infinite;
          opacity: 0.85;
        }
        .app-workspace-layout .bg-glass-glare {
          position: absolute; inset: -30%;
          background: linear-gradient(
            135deg, 
            transparent 0%, 
            transparent 35%, 
            rgba(255, 255, 255, 0.015) 38%, 
            rgba(255, 255, 255, 0.03) 40%, 
            rgba(212, 184, 122, 0.02) 42%, 
            transparent 45%, 
            transparent 100%
          );
          filter: blur(1px);
          animation: glareFloat 14s ease-in-out infinite;
        }
        .app-workspace-layout .bg-glass-bevel {
          position: absolute; inset: 8px;
          border: 0.2px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          box-shadow: 
            inset 0 0 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 2px rgba(255, 255, 255, 0.08),
            inset 0 -1px 2px rgba(0, 0, 0, 0.6);
          pointer-events: none;
          animation: bevelShimmer 10s linear infinite;
          z-index: 1;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.15); }
        }
        @keyframes nebulaDrift {
          0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.85; }
          50% { transform: scale(1.08) translate(-20px, 15px); opacity: 1; }
        }
        @keyframes glareFloat {
          0%, 100% { transform: translate(-5%, -5%) rotate(-12deg); opacity: 0.18; }
          50% { transform: translate(5%, 5%) rotate(-8deg); opacity: 0.25; }
        }
        @keyframes bevelShimmer {
          0%, 100% { border-color: rgba(212, 184, 122, 0.08) rgba(255, 255, 255, 0.04) rgba(212, 184, 122, 0.08) rgba(255, 255, 255, 0.04); }
          50% { border-color: rgba(255, 255, 255, 0.08) rgba(212, 184, 122, 0.04) rgba(255, 255, 255, 0.08) rgba(212, 184, 122, 0.04); }
        }

        /* Sidebar positioning & styling */
        .app-workspace-layout .side {
          position: relative;
          background: rgba(10, 10, 10, 0.45) !important;
          border-right: 0.2px solid rgba(255, 255, 255, 0.08) !important;
          backdrop-filter: blur(30px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(30px) saturate(180%) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 10px 0 30px rgba(0, 0, 0, 0.5) !important;
          display: flex; flex-direction: column; align-items: center;
          padding: 16px; gap: 12px;
          z-index: 10;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .app-workspace-layout .side::before {
          content: ''; position: absolute; left: 0; top: 5%; bottom: 5%; width: 1px;
          background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,.14) 50%, transparent 100%);
        }
        .app-workspace-layout .side::after {
          content: ''; position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(218,165,32,.3), transparent);
        }

        .app-workspace-layout .side-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 8px;
          border-bottom: 0.2px solid rgba(255, 255, 255, 0.06);
          width: 100%;
        }

        .app-workspace-layout .brand-mark {
          width: 36px; height: 36px; border-radius: 50%;
          position: relative; display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.4);
          border: 0.2px solid rgba(212, 184, 122, 0.5); /* Círculo interno dourado */
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2), 0 0 12px rgba(212, 184, 122, 0.2); /* Círculo externo prata */
          flex-shrink: 0;
        }
        .app-workspace-layout .brand-mark::before {
          content: ''; position: absolute; inset: -1.2px; border-radius: 50%;
          background: var(--grad-gold); z-index: -1; filter: blur(.3px);
        }
        .app-workspace-layout .brand-mark::after {
          content: ''; position: absolute; inset: 1.5px; border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #1c150a 0%, #0d0c10 70%);
        }
        .app-workspace-layout .brand-mark span {
          position: relative; z-index: 1;
          font-family: var(--f-display); font-size: 11px; font-weight: 700; letter-spacing: .06em;
          background: var(--grad-gold-warm);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .app-workspace-layout .side-title-block {
          display: flex;
          flex-direction: column;
        }
        .app-workspace-layout .side-title-block .h1 {
          font-family: var(--f-display);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .12em;
          color: var(--ink);
        }
        .app-workspace-layout .side-title-block .h2 {
          font-family: var(--f-mono);
          font-size: 7.5px;
          letter-spacing: .08em;
          color: var(--g-2);
        }

        .app-workspace-layout .fase-badge {
          background: rgba(255, 255, 255, 0.02) !important;
          border: 0.2px solid rgba(255, 255, 255, 0.06) !important;
          backdrop-filter: blur(8px) !important;
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0,0,0,0.2) !important;
          width: 100%;
          box-sizing: border-box;
        }
        .app-workspace-layout .fase-badge .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .app-workspace-layout .fase-badge .lbl {
          font-family: var(--f-mono);
          font-size: 6.5px;
          letter-spacing: .15em;
          color: var(--ink-mute);
        }
        .app-workspace-layout .fase-badge .status {
          font-family: var(--f-mono);
          font-size: 6.5px;
          font-weight: 700;
          color: var(--g-2);
        }
        .app-workspace-layout .fase-badge .val {
          font-family: var(--f-display);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--ink);
        }
        .app-workspace-layout .fase-badge .sub {
          font-family: var(--f-mono);
          font-size: 7.5px;
          color: rgba(255,255,255,.2);
        }

        /* Sidebar Accordion Collapsible Groups */
        .app-workspace-layout .sidebar-hexagon-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 4px;
        }
        .app-workspace-layout .sidebar-sub-menu {
          width: 100%;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, margin 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 0 4px;
          box-sizing: border-box;
        }
        .app-workspace-layout .sidebar-hexagon-group.active .sidebar-sub-menu {
          max-height: 450px;
          opacity: 1;
          margin-top: 8px;
          margin-bottom: 12px;
        }
        .app-workspace-layout .sidebar-hexagon-group + .sidebar-hexagon-group::before {
          content: ''; width: 1px; height: 14px;
          background: linear-gradient(180deg, transparent, rgba(212,184,122,0.25), transparent);
          margin-bottom: 4px;
          display: block;
        }

        .app-workspace-layout .tab {
          position: relative; width: 88px; cursor: pointer;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 12px 6px;
          transition: transform .35s cubic-bezier(.22,.61,.36,1);
        }
        .app-workspace-layout .tab:hover {
          transform: none;
        }
        .app-workspace-layout .tab .tab-frame {
          position: relative; width: 58px; height: 58px;
          display: flex; align-items: center; justify-content: center;
          background: var(--obs-1);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          transition: all .4s cubic-bezier(.22,.61,.36,1);
          flex-shrink: 0;
        }
        .app-workspace-layout .tab .tab-frame::before {
          content: ''; position: absolute; inset: 0;
          background: var(--grad-silver);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          opacity: .14; transition: opacity .4s;
        }
        .app-workspace-layout .tab .tab-frame::after {
          content: ''; position: absolute; inset: 2px;
          background: var(--obs-1);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .app-workspace-layout .tab .code {
          position: relative; z-index: 2;
          font-family: var(--f-display); font-size: 14px; letter-spacing: .05em;
          color: var(--s-2); font-weight: 700; transition: all .4s;
        }
        .app-workspace-layout .tab .name {
          font-family: var(--f-body); font-size: 10px; letter-spacing: .03em;
          color: var(--ink-mute); transition: all .3s; font-weight: 400;
        }
        .app-workspace-layout .tab:hover .tab-frame { transform: scale(1.07) }
        .app-workspace-layout .tab:hover .tab-frame::before { opacity: .28 }
        .app-workspace-layout .tab:hover .code { color: var(--s-3) }
        .app-workspace-layout .tab:hover .name { color: var(--ink-2) }

        /* ACTIVE TAB */
        .app-workspace-layout .tab.active .tab-frame::before { background: var(--grad-gold); opacity: .8 }
        .app-workspace-layout .tab.active .tab-frame::after {
          background: radial-gradient(circle at center, #18120a 0%, #0d0c10 100%);
          box-shadow: inset 0 0 20px rgba(218,165,32,.18);
        }
        .app-workspace-layout .tab.active .code {
          background: var(--grad-gold-warm);
          -webkit-background-clip: text; background-clip: text;
          color: transparent; -webkit-text-fill-color: transparent; font-weight: 700;
        }
        .app-workspace-layout .tab.active .name { color: var(--g-3); font-weight: 500 }
        .app-workspace-layout .tab.active::before {
          content: ''; position: absolute; left: -10px; top: 20%; bottom: 20%; width: 2px;
          background: var(--grad-gold);
          box-shadow: 0 0 8px rgba(218,165,32,.6);
        }
        .app-workspace-layout .tab + .tab::before {
          content: ''; position: absolute; top: -12px; left: 50%; width: 1px; height: 12px;
          background: linear-gradient(180deg, transparent, var(--s-line), transparent);
          transform: translateX(-50%);
        }

        /* Sidebar Nav Item */
        .app-workspace-layout .side-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 0.2px solid rgba(255, 255, 255, 0.02);
          background: rgba(255, 255, 255, 0.01);
          color: var(--ink-mute);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-sizing: border-box;
        }
        .app-workspace-layout .side-nav-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
          transform: translateX(2px);
        }
        .app-workspace-layout .side-nav-item.active {
          background: rgba(212, 184, 122, 0.08) !important;
          border: 0.2px solid rgba(212, 184, 122, 0.25) !important;
          box-shadow: inset 0 1px 0 rgba(212, 184, 122, 0.06), 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        .app-workspace-layout .side-nav-item .bullet {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .app-workspace-layout .side-nav-item.active .bullet {
          background: var(--g-2);
          box-shadow: 0 0 6px var(--g-2);
        }
        .app-workspace-layout .side-nav-item .info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .app-workspace-layout .side-nav-item .label {
          font-family: var(--f-body);
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-mute);
          transition: color 0.2s;
        }
        .app-workspace-layout .side-nav-item:hover .label {
          color: #fff;
        }
        .app-workspace-layout .side-nav-item.active .label {
          color: #fff;
          font-weight: 600;
        }
        .app-workspace-layout .side-nav-item .desc {
          font-family: var(--f-mono);
          font-size: 7.5px;
          color: rgba(255, 255, 255, 0.25);
          margin-top: 1px;
        }
        .app-workspace-layout .side-nav-item.active .desc {
          color: rgba(212, 184, 122, 0.5);
        }

        .app-workspace-layout .telemetry-widget {
          background: rgba(6, 7, 10, 0.55);
          border: 0.2px solid rgba(210, 175, 90, 0.1);
          border-radius: 8px;
          padding: 8px 10px;
          font-family: var(--f-mono);
          font-size: 7.5px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          box-sizing: border-box;
        }
        .app-workspace-layout .telemetry-widget .title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .app-workspace-layout .telemetry-widget .title-row span {
          font-weight: 700;
          letter-spacing: .15em;
          color: var(--g-2);
        }
        .app-workspace-layout .telemetry-widget .pulse-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #7dde92;
          box-shadow: 0 0 4px #7dde92;
          animation: livepulse 1.8s ease-in-out infinite;
        }
        .app-workspace-layout .telemetry-widget .metric {
          display: flex;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.35);
        }
        .app-workspace-layout .telemetry-widget .metric b {
          color: var(--ink-2);
        }
        .app-workspace-layout .telemetry-widget .metric .gold {
          color: var(--g-3);
          font-weight: 600;
        }

        .app-workspace-layout .acc-panel {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .app-workspace-layout .acc-panel-lbl {
          font-family: var(--f-mono);
          font-size: 7px;
          font-weight: 700;
          letter-spacing: .15em;
          color: rgba(255, 255, 255, 0.2);
          padding: 0 2px;
          text-transform: uppercase;
        }
        .app-workspace-layout .acc-row {
          display: flex;
          gap: 3px;
        }
        .app-workspace-layout .acc-chip {
          flex: 1;
          text-align: center;
          padding: 4px 1px;
          border-radius: 4px;
          font-family: var(--f-mono);
          font-size: 7.5px;
          font-weight: 500;
          color: var(--ink-mute);
          background: rgba(255,255,255,.01);
          border: 0.2px solid rgba(255,255,255,.03);
          cursor: pointer;
          transition: all .2s;
        }
        .app-workspace-layout .acc-chip:hover {
          background: rgba(255,255,255,.03);
        }
        .app-workspace-layout .acc-chip.active {
          background: rgba(210,175,90,.05);
          border-color: rgba(210,175,90,.2);
          color: var(--g-3);
        }

        /* Accessibility states scoped inside our app layout */
        .app-workspace-layout.acc-foco .bg {
          opacity: 0 !important;
        }
        .app-workspace-layout.acc-calmo * {
          animation: none !important;
          transition: none !important;
        }
        .app-workspace-layout.acc-contraste p,
        .app-workspace-layout.acc-contraste span,
        .app-workspace-layout.acc-contraste div {
          text-shadow: 0 1px 2px #000;
        }

        /* Main structure */
        .app-workspace-layout .main {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 5;
        }

        .app-workspace-layout .tophud {
          display: flex; align-items: center; justify-content: space-between;
          position: sticky;
          top: 16px;
          margin: 16px auto 10px auto;
          width: calc(100% - 40px);
          max-width: 1400px;
          padding: 10px 28px;
          background: rgba(3, 3, 5, 0.75) !important;
          backdrop-filter: blur(28px) saturate(1.4) !important;
          -webkit-backdrop-filter: blur(28px) saturate(1.4) !important;
          border: none !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.75), 0 0 15px rgba(212, 184, 122, 0.15) !important;
          border-radius: 100px !important;
          z-index: 100;
          box-sizing: border-box;
        }
        .app-workspace-layout .tophud::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 100px;
          padding: 1px;
          background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 45%, #d4b87a 55%, #b8975a 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .app-workspace-layout .tophud::after {
          content: ''; position: absolute; left: 10%; right: 10%; bottom: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(212,184,122,.18) 30%, rgba(255,255,255,.2) 50%, rgba(212,184,122,.18) 70%, transparent 100%);
        }

        .app-workspace-layout .thd-left { display: flex; align-items: center; gap: 20px }
        .app-workspace-layout .thd-title { font-family: var(--f-display); font-size: 13.5px; letter-spacing: .03em; color: var(--ink-2); font-weight: 300 }
        .app-workspace-layout .thd-title b { font-weight: 300; color: var(--ink) }
        .app-workspace-layout .thd-title .sep { margin: 0 10px; color: var(--ink-mute); font-size: 9px }
        .app-workspace-layout .thd-crumb {
          font-family: var(--f-mono); font-size: 9.5px; letter-spacing: .08em;
          color: var(--g-2); text-transform: uppercase;
          padding: 5px 11px; border: 0.2px solid var(--g-line); border-radius: 5px;
          background: rgba(218,165,32,.04);
        }
        .app-workspace-layout .thd-right { display: flex; gap: 10px; align-items: center }
        .app-workspace-layout .thd-clock {
          font-family: var(--f-mono); font-size: 12px; letter-spacing: .04em;
          color: var(--ink-2); font-weight: 300;
          padding: 7px 13px; border: 0.2px solid var(--s-line); border-radius: 6px;
          display: flex; gap: 8px; align-items: center; background: rgba(255,255,255,.02);
        }
        .app-workspace-layout .thd-clock b { color: var(--ink); font-weight: 400 }
        .app-workspace-layout .thd-chip {
          font-family: var(--f-mono); font-size: 9.5px; letter-spacing: .06em; text-transform: uppercase; font-weight: 300;
          padding: 7px 13px; border: 0.2px solid var(--s-line); border-radius: 6px;
          background: rgba(255,255,255,.02); color: var(--ink-2); cursor: pointer; transition: all .22s;
          display: flex; align-items: center; gap: 7px;
          box-sizing: border-box;
        }
        .app-workspace-layout .thd-chip:hover { border-color: var(--s-line-on); color: var(--ink); background: rgba(255,255,255,.03) }
        .app-workspace-layout .thd-chip.live { color: var(--g-2); border-color: var(--g-line-on); background: rgba(218,165,32,.04) }
        .app-workspace-layout .thd-chip .d {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--g-2); box-shadow: 0 0 6px var(--g-2);
          animation: livepulse 2.2s ease-in-out infinite;
        }

        @keyframes livepulse {
          0%, 100% { opacity: 0.5; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .app-workspace-layout .scroll-rail {
          position: fixed; top: 0; bottom: 0; right: 0; width: 30px; z-index: 9;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .app-workspace-layout .scroll-rail .track { position: relative; width: 1px; height: 44%; background: var(--s-line) }
        .app-workspace-layout .scroll-rail .fill {
          position: absolute; top: 0; left: 0; width: 1px;
          background: linear-gradient(180deg, var(--g-2), var(--s-1));
          height: 0%; transition: height .15s;
        }
        .app-workspace-layout .scroll-rail .markers {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: space-between; align-items: center;
          pointer-events: auto;
        }
        .app-workspace-layout .scroll-rail .mk {
          position: relative; font-family: var(--f-mono); font-size: 9px; letter-spacing: .06em;
          color: var(--ink-mute); font-weight: 500; width: 22px; text-align: right;
          padding-right: 7px; cursor: pointer; transition: color .2s;
        }
        .app-workspace-layout .scroll-rail .mk::after {
          content: ''; position: absolute; right: -4px; top: 50%; transform: translateY(-50%);
          width: 5px; height: 1px; background: var(--s-line-on);
        }
        .app-workspace-layout .scroll-rail .mk:hover { color: var(--ink-2) }
        .app-workspace-layout .scroll-rail .mk.active { color: var(--g-2) }
        .app-workspace-layout .scroll-rail .mk.active::after { background: var(--g-2); width: 10px; box-shadow: 0 0 5px var(--g-2) }

        .app-workspace-layout .content-area {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-behavior: smooth;
          padding: 20px 40px 100px 40px;
        }
        .app-workspace-layout .content-area::-webkit-scrollbar { width: 5px }
        .app-workspace-layout .content-area::-webkit-scrollbar-track { background: transparent }
        .app-workspace-layout .content-area::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(180,145,70,.3), rgba(200,205,215,.2));
          border-radius: 3px;
        }

        /* Glass Panel */
        .app-workspace-layout .glass-panel {
          background: rgba(10, 10, 12, 0.45) !important;
          backdrop-filter: blur(20px) saturate(140%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(140%) !important;
          border: 0.2px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 20px 50px rgba(0, 0, 0, 0.5) !important;
          border-radius: 18px;
        }

        /* Hexagon Group header tab styles */
        .app-workspace-layout .hex-tab {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }
      `}</style>



      {/* SIDEBAR (COMPACT NASA x COCKPIT) */}
      {sidebarOpen && (
        <aside className="side">
          {/* HEADER */}
          <div className="side-header justify-between">
            <div className="brand-mark"><span>IP</span></div>
            <div className="side-title-block">
              <span className="h1">IPB OPERATIONAL</span>
              <span className="h2">COCKPIT · v0.9.4</span>
            </div>
            
            {/* Close Button visible on mobile & desktop */}
            <button
              onClick={() => setSidebarOpen(false)}
              title="Fechar sidebar"
              className="ml-auto flex h-6 w-6 items-center justify-center rounded-[0.4rem] text-white/36 transition hover:bg-white/[0.08] hover:text-white/64"
              style={{ border: '0.2px solid rgba(255,255,255,0.06)' }}
            >
              <PanelLeftClose className="h-3.5 w-3.5" />
            </button>
          </div>

        {/* BUSCA DE COMPONENTES */}
        <div
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '0.2px solid rgba(255,255,255,0.06)' }}
        >
          <Search className="h-3 w-3 shrink-0 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar módulo..."
            className="flex-1 bg-transparent text-[10px] text-white/70 outline-none placeholder:text-white/20 font-sans"
          />
        </div>

        {/* MENU ACCORDION GROUPS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', marginTop: '8px' }}>
          {filteredGroups.map((group) => {
            const isExpanded = activeGroup === group.id
            return (
              <div 
                key={group.id} 
                className={`sidebar-hexagon-group ${isExpanded ? 'active' : ''}`}
              >
                {/* Header Tab */}
                <div 
                  className={`tab ${isExpanded ? 'active' : ''}`}
                  onClick={() => setActiveGroup(isExpanded ? null : group.id)}
                >
                  <div className="tab-frame">
                    <div className="code">{group.code}</div>
                  </div>
                  <div className="name">{group.label}</div>
                </div>

                {/* Sub Itens */}
                <div className="sidebar-sub-menu">
                  {group.items.map((item) => {
                    const isActive = activeNavId === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveNavId(item.id)}
                        className={`side-nav-item ${isActive ? 'active' : ''}`}
                      >
                        <span className="bullet"></span>
                        <div className="info min-w-0">
                          <span className="label truncate">{item.title}</span>
                          {item.desc && <span className="desc truncate">{item.desc}</span>}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* TELEMETRY AI GATEWAY PANEL */}
        <div className="telemetry-widget" style={{ marginTop: 'auto' }}>
          <div className="title-row">
            <span>AI_GATEWAY</span>
            <span className="pulse-dot"></span>
          </div>
          <div className="metric"><span>LATENCY</span><b>124ms</b></div>
          <div className="metric"><span>CACHE HIT</span><b>86.4%</b></div>
          <div className="metric"><span>SAVINGS</span><span className="gold">$0.084</span></div>
        </div>

        {/* SYSTEM ACCESSIBILITY SWITCHER */}
        <div className="acc-panel">
          <div className="acc-panel-lbl">SYS_ACCESSIBILITY</div>
          <div className="acc-row">
            {(['padrao', 'foco', 'calmo', 'contraste'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setAccMode(mode)}
                className={`acc-chip ${accMode === mode ? 'active' : ''}`}
              >
                {mode === 'padrao' && 'SYS'}
                {mode === 'foco' && 'FOCO'}
                {mode === 'calmo' && 'CALM'}
                {mode === 'contraste' && 'ACC+'}
              </button>
            ))}
          </div>
        </div>
      </aside>
      )}

      {/* MAIN CONTENT SECTION */}
      <main className="main">
        {/* TOP HUD */}
        <header className="tophud">
          <div className="thd-left">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-3 flex items-center gap-2 rounded-[0.85rem] border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
              >
                <PanelLeftOpen className="h-3.5 w-3.5 text-[#d4b87a]" />
                <span>Abrir Menu</span>
              </button>
            )}
            <div className="thd-title"><b>IPB</b> <span className="sep">◆</span> Operational Workspace</div>
            <div className="thd-crumb">{getBreadcrumb()}</div>
          </div>
          
          <div className="thd-right">
            <div className="thd-clock">
              <span>UTC</span>
              <b>{timeStr || '00:00:00'}</b>
            </div>

            {/* Link de Retorno ao Explore */}
            <Link href="/explore" className="thd-chip font-sans">
              <ArrowLeft className="h-3 w-3 mr-0.5" />
              <span>Voltar</span>
            </Link>

            <button className="thd-chip live font-mono">
              <span className="d"></span>
              <span>LIVE FEED</span>
            </button>
          </div>
        </header>

        {/* CONTENT AREA DISPATCHER */}
        <div className="content-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNavId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {renderActivePanel()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* SCROLL RAIL DESIGN MARKER */}
      <div className="scroll-rail">
        <div className="track">
          <div className="fill" style={{ height: '42%' }}></div>
          <div className="markers">
            <div className="mk active">01</div>
            <div className="mk">02</div>
            <div className="mk">03</div>
            <div className="mk">04</div>
            <div className="mk">05</div>
            <div className="mk">06</div>
            <div className="mk">07</div>
          </div>
        </div>
      </div>

    </div>
  )
}
