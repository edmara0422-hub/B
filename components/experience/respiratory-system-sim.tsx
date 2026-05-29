'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { 
  Play, 
  Pause, 
  Wind, 
  Activity, 
  Eye, 
  Heart, 
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react'

/* ─────────────────────── types ─────────────────────── */

interface RespiratorySystemSimProps {
  className?: string
}

type AirwayPart = 'nose' | 'pharynx' | 'larynx' | 'trachea' | 'bronchi' | 'alveoli' | 'diaphragm' | 'lungs' | null
type ViewMode = 'all' | 'airway' | 'hematosis' | 'mechanics'

/* ─────────────────────── constants ─────────────────────── */

const FPS = 30
const FRAME_MS = 1000 / FPS
const COL_BG = '#040610' // Immersive bio-medical dark navy
const COL_GRID = 'rgba(56, 189, 248, 0.018)'
const COL_TEXT_DIM = 'rgba(255, 255, 255, 0.35)'
const COL_AIRWAY = 'rgba(34, 211, 238, 0.45)'
const COL_AIRWAY_HI = 'rgba(34, 211, 238, 0.9)'
const COL_AIRWAY_FILL = 'rgba(34, 211, 238, 0.05)'
const COL_AIRWAY_FILL_HI = 'rgba(34, 211, 238, 0.14)'
const COL_O2 = 'rgba(34, 211, 238, 0.95)'
const COL_CO2 = 'rgba(244, 63, 94, 0.85)'
const COL_CONDUCT = 'rgba(45, 212, 191, 0.65)'
const COL_RESP = 'rgba(250, 204, 21, 0.65)'
const COL_LUNG_L = 'rgba(20, 184, 166, 0.1)'
const COL_LUNG_R = 'rgba(20, 184, 166, 0.12)'
const COL_LUNG_STROKE = 'rgba(20, 184, 166, 0.3)'
const COL_RIB = 'rgba(255, 255, 255, 0.03)'
const COL_RIB_STROKE = 'rgba(255, 255, 255, 0.05)'
const COL_DIAPHRAGM = 'rgba(244, 63, 94, 0.35)'
const COL_MUCUS = 'rgba(45, 212, 191, 0.22)'
const COL_CARTILAGE = 'rgba(167, 139, 250, 0.22)'
const COL_EPIGLOTTIS = 'rgba(250, 204, 21, 0.55)'
const FONT_MONO = '"SF Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace'

const PART_INFO: Record<string, { title: string; zone: string; desc: string; details: string[] }> = {
  nose: {
    title: 'Nariz e Cavidade Nasal',
    zone: 'Zona Condutora',
    desc: 'Filtra, aquece e umidifica o ar inspirado.',
    details: ['Pelos nasais (vibrissas) filtram partículas', 'Conchas nasais ↑ turbulência', 'Muco captura patógenos', 'Aquece o ar a 37°C antes do pulmão'],
  },
  pharynx: {
    title: 'Faringe',
    zone: 'Zona Condutora',
    desc: 'Via comum compartilhada para ar e alimento.',
    details: ['Nasofaringe (somente ar)', 'Orofaringe e Laringofaringe', 'Tecido linfóide (tonsilas faríngeas)', 'Úvula impede entrada de alimento na nasofaringe'],
  },
  larynx: {
    title: 'Laringe',
    zone: 'Zona Condutora',
    desc: 'Pregas vocais e epiglote (proteção das vias).',
    details: ['Cartilagem tireóidea (pomo de Adão)', 'Epiglote fecha na deglutição', 'Pregas vocais: fonação', 'Glote: abertura física de passagem'],
  },
  trachea: {
    title: 'Traqueia',
    zone: 'Zona Condutora',
    desc: '16-20 anéis cartilaginosos em C para suporte. Epitélio mucociliar.',
    details: ['Anéis de cartilagem hialina em C', 'Músculo traqueal na parte posterior', 'Cílios movem muco para a faringe', 'Espaço morto anatômico (~150 mL)'],
  },
  bronchi: {
    title: 'Brônquios e Bronquíolos',
    zone: 'Condutora → Respiratória',
    desc: '23 gerações de ramificação dicotômica até os alvéolos.',
    details: ['Brônquio D mais vertical e largo', 'Músculo liso substituindo cartilagem', '23 gerações de divisões', 'Bronquíolos: Ø < 1mm, muito responsivos'],
  },
  alveoli: {
    title: 'Alvéolos Pulmonares',
    zone: 'Zona Respiratória',
    desc: '300-500 milhões de alvéolos. Superfície total de ~70-100 m².',
    details: ['Pneumócito I: troca gasosa (hematose)', 'Pneumócito II: secreta surfactante', 'Membrana respiratória de 0,2 µm', 'Envolvidos por rede de capilares'],
  },
  diaphragm: {
    title: 'Diafragma',
    zone: 'Motor Primário',
    desc: 'Músculo esquelético principal da inspiração. Inervado pelo nervo frênico (C3-C5).',
    details: ['Contração → desce → ↑ volume torácico', 'Relaxamento → sobe → ↓ volume torácico', 'Responsável por 75% da ventilação', 'Inervação: Nervo Frênico (C3-C5)'],
  },
  lungs: {
    title: 'Pulmões',
    zone: 'Órgão Central',
    desc: 'Órgãos esponjosos e elásticos. Direito: 3 lobos. Esquerdo: 2 lobos + incisura cardíaca.',
    details: ['Pulmão D: sup/méd/inf (3 lobos)', 'Pulmão E: sup/inf (2 lobos)', 'Hilo: entrada de brônquios e vasos', 'Pleura visceral e parietal com líquido'],
  },
}

/* ─────────────────────── helpers ─────────────────────── */

function lerp(a: number, b: number, t: number): number { return a + (b - a) * t }
function easeInOut(t: number): number { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 }

interface FlowParticle {
  phase: number
  speed: number
  type: 'o2' | 'co2'
  side: 'left' | 'right' | 'center'
  wobble: number
  size: number
}

/* ─────────────────────── component ─────────────────────── */

export function RespiratorySystemSim({ className }: RespiratorySystemSimProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredPart, setHoveredPart] = useState<AirwayPart>(null)
  const [selectedPart, setSelectedPart] = useState<AirwayPart>(null)

  // Physiological Controls (No mechanical ventilation)
  const [respiratoryRate, setRespiratoryRate] = useState(14) // 12 to 30 rpm (physiological)
  const [viewMode, setViewMode] = useState<ViewMode>('all') // view filters
  const [isPaused, setIsPaused] = useState(false)
  const [liveVolume, setLiveVolume] = useState(2400)

  const stateRef = useRef({
    t: 0,
    lastTimestamp: 0,
    breathCycle: 0,
    particles: null as FlowParticle[] | null,
    volumeMl: 2400,

    // Controls
    respiratoryRate: 14,
    viewMode: 'all' as ViewMode,
    isPaused: false,
  })

  const regionsRef = useRef<{ part: AirwayPart; x: number; y: number; w: number; h: number }[]>([])

  // Sync inputs to loop refs
  useEffect(() => {
    const st = stateRef.current
    st.respiratoryRate = respiratoryRate
    st.viewMode = viewMode
    st.isPaused = isPaused
  }, [respiratoryRate, viewMode, isPaused])

  const handleReset = () => {
    setRespiratoryRate(14)
    setViewMode('all')
    setIsPaused(false)
  }

  const draw = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const st = stateRef.current
    
    // Scale up SIGNIFICANTLY to make the lung image prominent and large
    const S = Math.min(w / 500, h / 450)

    ctx.fillStyle = COL_BG
    ctx.fillRect(0, 0, w, h)

    // subtle aesthetic grid
    ctx.strokeStyle = COL_GRID
    ctx.lineWidth = 0.5
    const gs = 24 * S
    for (let gx = 0; gx < w; gx += gs) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke() }
    for (let gy = 0; gy < h; gy += gs) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke() }

    // ── breathing phase increment (physiological rate)
    const cycleIncrement = st.isPaused ? 0 : (st.respiratoryRate / 1800)
    st.breathCycle = (st.breathCycle + cycleIncrement) % 1

    const isInhale = st.breathCycle < 0.45
    const isExhale = st.breathCycle >= 0.50 && st.breathCycle < 0.95
    const breathT = isInhale ? easeInOut(st.breathCycle / 0.45) : (isExhale ? easeInOut((st.breathCycle - 0.5) / 0.45) : (st.breathCycle < 0.5 ? 1 : 0))
    
    const expand = isInhale ? breathT * 0.11 : (isExhale ? (1 - breathT) * 0.11 : (st.breathCycle < 0.5 ? 0.11 : 0))
    st.volumeMl = Math.round(2400 + expand * 4500)

    // centered coordinates for the massive lung/airway image
    const cx = w * 0.44 // shifted slightly left to accommodate text labels on the right
    const topY = 12 * S

    // key Y positions - enlarged structures
    const noseY = topY
    const noseH = 50 * S
    const pharY = noseY + noseH + 4
    const pharH = 38 * S
    const larY = pharY + pharH + 4
    const larH = 34 * S
    const traY = larY + larH + 3
    const traH = 80 * S
    const bifY = traY + traH
    const bronchLen = 65 * S
    const bronchSpread = 90 * S

    const lungTop = bifY - 10
    const lungW = 150 * S * (1 + expand)
    const lungH = 205 * S * (1 + expand * 0.8)
    const lungCenterY = lungTop + lungH * 0.45

    const regions: typeof regionsRef.current = []

    // Helper to compute opacity based on ViewMode to create an advanced biomedical hologram look
    const getAlpha = (part: AirwayPart | 'ribs') => {
      if (st.viewMode === 'all') return 1.0
      if (st.viewMode === 'airway') {
        return (part === 'nose' || part === 'pharynx' || part === 'larynx' || part === 'trachea' || part === 'bronchi') ? 1.0 : 0.08
      }
      if (st.viewMode === 'hematosis') {
        return (part === 'alveoli' || part === 'lungs') ? 1.0 : 0.08
      }
      if (st.viewMode === 'mechanics') {
        return (part === 'diaphragm' || part === 'lungs' || part === 'ribs') ? 1.0 : 0.08
      }
      return 1.0
    }

    // ═══════════════════ RIB CAGE ═══════════════════
    const isRibsActive = getAlpha('ribs') > 0.1
    ctx.globalAlpha = getAlpha('ribs')
    const ribCount = 7
    for (let i = 0; i < ribCount; i++) {
      const ry = lungTop + 8 + i * (lungH - 16) / (ribCount - 1)
      const ribW = (lungW * 2 + bronchSpread * 2 + 20 * S) * (1 - Math.abs(i - 3) * 0.06)
      ctx.beginPath()
      ctx.ellipse(cx, ry, ribW * 0.52, 4 * S, 0, 0.15, Math.PI - 0.15)
      ctx.strokeStyle = COL_RIB_STROKE
      ctx.lineWidth = 2.5 * S
      ctx.stroke()
      // fill
      ctx.beginPath()
      ctx.ellipse(cx, ry, ribW * 0.52, 3 * S, 0, 0.15, Math.PI - 0.15)
      ctx.strokeStyle = COL_RIB
      ctx.lineWidth = 5 * S
      ctx.stroke()
    }
    ctx.globalAlpha = 1.0

    // ═══════════════════ LUNGS (Massive, vibrant and detailed) ═══════════════════
    const isLungHi = hoveredPart === 'lungs' || selectedPart === 'lungs'
    const lungBase = lungTop + lungH
    
    ctx.globalAlpha = getAlpha('lungs')
    const lungStroke = isLungHi ? 'rgba(45, 212, 191, 0.5)' : COL_LUNG_STROKE
    const lungFillR = isLungHi ? 'rgba(20, 184, 166, 0.18)' : COL_LUNG_R
    const lungFillL = isLungHi ? 'rgba(20, 184, 166, 0.15)' : COL_LUNG_L

    // medial edges
    const rlx = cx + bronchSpread * 0.45
    const llx = cx - bronchSpread * 0.45
    const lW2 = lungW * 0.93

    // ── RIGHT LUNG
    const rCx = rlx + lungW * 0.48
    const rCy = lungCenterY
    ctx.beginPath()
    ctx.moveTo(rCx, lungTop + 6)
    ctx.bezierCurveTo(
      rCx + lungW * 0.45, lungTop + 2,
      rlx + lungW + 4, lungTop + lungH * 0.2,
      rlx + lungW + 2, rCy
    )
    ctx.bezierCurveTo(
      rlx + lungW + 2, rCy + lungH * 0.32,
      rlx + lungW * 0.75, lungBase + 4,
      rCx, lungBase + 2
    )
    ctx.bezierCurveTo(
      rlx + lungW * 0.1, lungBase + 2,
      rlx - 4, lungBase - lungH * 0.08,
      rlx - 2, rCy + lungH * 0.15
    )
    ctx.bezierCurveTo(
      rlx - 2, rCy - lungH * 0.2,
      rlx + lungW * 0.05, lungTop + 10,
      rCx, lungTop + 6
    )
    ctx.closePath()
    ctx.fillStyle = lungFillR
    ctx.fill()
    ctx.strokeStyle = lungStroke
    ctx.lineWidth = 2.0
    ctx.stroke()

    // Fissures (oblique and horizontal)
    ctx.beginPath()
    ctx.moveTo(rlx + 6, rCy - lungH * 0.06)
    ctx.quadraticCurveTo(rCx, rCy - lungH * 0.02, rlx + lungW - 8, rCy + lungH * 0.04)
    ctx.strokeStyle = isLungHi ? 'rgba(45, 212, 191, 0.22)' : 'rgba(45, 212, 191, 0.12)'
    ctx.lineWidth = 1.0
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(rlx + 10, rCy + lungH * 0.16)
    ctx.quadraticCurveTo(rCx, rCy + lungH * 0.2, rlx + lungW - 12, rCy + lungH * 0.22)
    ctx.stroke()

    // Lobes labels
    ctx.font = `600 ${Math.max(6.5, 8.5 * S)}px ${FONT_MONO}`
    ctx.textAlign = 'center'
    ctx.fillStyle = isLungHi ? 'rgba(45, 212, 191, 0.45)' : 'rgba(45, 212, 191, 0.25)'
    ctx.fillText('Superior', rCx, rCy - lungH * 0.18)
    ctx.fillText('Médio', rCx, rCy + lungH * 0.06)
    ctx.fillText('Inferior', rCx, rCy + lungH * 0.32)

    // ── LEFT LUNG
    const lCx = llx - lW2 * 0.48
    const lCy = lungCenterY
    ctx.beginPath()
    ctx.moveTo(lCx, lungTop + 6)
    ctx.bezierCurveTo(
      lCx - lW2 * 0.45, lungTop + 2,
      llx - lW2 - 4, lungTop + lungH * 0.2,
      llx - lW2 - 2, lCy
    )
    ctx.bezierCurveTo(
      llx - lW2 - 2, lCy + lungH * 0.32,
      llx - lW2 * 0.75, lungBase + 4,
      lCx, lungBase + 2
    )
    ctx.bezierCurveTo(
      llx - lW2 * 0.1, lungBase + 2,
      llx + 4, lungBase - lungH * 0.08,
      llx + 2, lCy + lungH * 0.2
    )
    // Cardiac notch (Incisura cardíaca)
    ctx.bezierCurveTo(
      llx + 8, lCy + lungH * 0.08,
      llx + 8, lCy - lungH * 0.02,
      llx + 2, lCy - lungH * 0.1
    )
    ctx.bezierCurveTo(
      llx, lCy - lungH * 0.25,
      llx - lW2 * 0.05, lungTop + 10,
      lCx, lungTop + 6
    )
    ctx.closePath()
    ctx.fillStyle = lungFillL
    ctx.fill()
    ctx.strokeStyle = lungStroke
    ctx.lineWidth = 2.0
    ctx.stroke()

    // Left oblique fissure
    ctx.beginPath()
    ctx.moveTo(llx - 6, lCy + lungH * 0.02)
    ctx.quadraticCurveTo(lCx, lCy + lungH * 0.08, llx - lW2 + 10, lCy + lungH * 0.14)
    ctx.strokeStyle = isLungHi ? 'rgba(45, 212, 191, 0.22)' : 'rgba(45, 212, 191, 0.12)'
    ctx.lineWidth = 1.0
    ctx.stroke()

    // Left lobes labels
    ctx.font = `600 ${Math.max(6.5, 8.5 * S)}px ${FONT_MONO}`
    ctx.fillStyle = isLungHi ? 'rgba(45, 212, 191, 0.45)' : 'rgba(45, 212, 191, 0.25)'
    ctx.fillText('Superior', lCx, lCy - lungH * 0.12)
    ctx.fillText('Inferior', lCx, lCy + lungH * 0.26)

    // D/E indicator
    ctx.font = `700 ${Math.max(8.5, 10 * S)}px ${FONT_MONO}`
    ctx.fillStyle = 'rgba(45, 212, 191, 0.25)'
    ctx.fillText('Pulmão D', rCx, lungTop - 2)
    ctx.fillText('Pulmão E', lCx, lungTop - 2)

    const llxL = llx - lW2
    const rrx = rlx + lungW
    regions.push({ part: 'lungs', x: llxL - 5, y: lungTop, w: (rrx + 5) - (llxL - 5), h: lungH + 8 })
    ctx.globalAlpha = 1.0

    // ═══════════════════ DIAPHRAGM ═══════════════════
    ctx.globalAlpha = getAlpha('diaphragm')
    const isDiaHi = hoveredPart === 'diaphragm' || selectedPart === 'diaphragm'
    const diaY = lungTop + lungH * (0.91 - expand * 0.52)
    const diaW = (lungW * 2 + bronchSpread) * 0.88

    ctx.beginPath()
    ctx.moveTo(cx - diaW, diaY + 15 * S)
    ctx.quadraticCurveTo(cx, diaY - 12 * S * (1 - expand * 2.8), cx + diaW, diaY + 15 * S)
    ctx.strokeStyle = isDiaHi ? 'rgba(244, 63, 94, 0.8)' : COL_DIAPHRAGM
    ctx.lineWidth = isDiaHi ? 4.5 : 3
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(cx - diaW, diaY + 15 * S)
    ctx.quadraticCurveTo(cx, diaY - 12 * S * (1 - expand * 2.8), cx + diaW, diaY + 15 * S)
    ctx.lineTo(cx + diaW, diaY + 30 * S)
    ctx.quadraticCurveTo(cx, diaY + 10 * S, cx - diaW, diaY + 30 * S)
    ctx.closePath()
    ctx.fillStyle = isDiaHi ? 'rgba(244, 63, 94, 0.12)' : 'rgba(244, 63, 94, 0.05)'
    ctx.fill()

    // diaphragm physical arrows
    const arrowDir = isInhale ? 1 : -1
    if ((isInhale || isExhale) && !st.isPaused) {
      for (let da = 0; da < 3; da++) {
        const dax = cx + (da - 1) * diaW * 0.45
        const day = diaY + 8 * S
        ctx.beginPath()
        ctx.moveTo(dax, day)
        ctx.lineTo(dax, day + arrowDir * 8 * S)
        ctx.lineTo(dax - 4, day + arrowDir * 5 * S)
        ctx.moveTo(dax, day + arrowDir * 8 * S)
        ctx.lineTo(dax + 4, day + arrowDir * 5 * S)
        ctx.strokeStyle = `rgba(244, 63, 94, ${0.45 + Math.sin(st.t * 3) * 0.1})`
        ctx.lineWidth = 1.4
        ctx.stroke()
      }
    }
    regions.push({ part: 'diaphragm', x: cx - diaW, y: diaY - 10, w: diaW * 2, h: 42 * S })
    ctx.globalAlpha = 1.0

    // ═══════════════════ AIRWAY STRUCTURES ═══════════════════

    const isHi = (part: AirwayPart) => hoveredPart === part || selectedPart === part
    const col = (part: AirwayPart) => isHi(part) ? COL_AIRWAY_HI : COL_AIRWAY
    const colF = (part: AirwayPart) => isHi(part) ? COL_AIRWAY_FILL_HI : COL_AIRWAY_FILL

    // ── NOSE (Enlarged)
    ctx.globalAlpha = getAlpha('nose')
    const nW = 40 * S
    const nX = cx - nW / 2
    ctx.beginPath()
    ctx.moveTo(nX + nW * 0.5, noseY)
    ctx.bezierCurveTo(nX - 9 * S, noseY + 5, nX - 14 * S, noseY + noseH * 0.6, nX, noseY + noseH)
    ctx.lineTo(nX + nW, noseY + noseH)
    ctx.bezierCurveTo(nX + nW + 14 * S, noseY + noseH * 0.6, nX + nW + 9 * S, noseY + 5, nX + nW * 0.5, noseY)
    ctx.closePath()
    ctx.fillStyle = colF('nose')
    ctx.fill()
    ctx.strokeStyle = col('nose')
    ctx.lineWidth = 2.0
    ctx.stroke()

    // turbinates conchas (enlarged)
    for (let c = 0; c < 3; c++) {
      const cy2 = noseY + 8 + c * (noseH - 14) / 3
      const cw = nW * (0.75 - c * 0.1)
      ctx.beginPath()
      ctx.moveTo(cx - cw * 0.42, cy2)
      ctx.quadraticCurveTo(cx, cy2 + 4.5 + Math.sin(st.t * 1.5 + c) * 1, cx + cw * 0.42, cy2)
      ctx.strokeStyle = isHi('nose') ? 'rgba(34, 211, 238, 0.45)' : 'rgba(34, 211, 238, 0.18)'
      ctx.lineWidth = 1.8
      ctx.stroke()
    }

    // hairs at nasal entrance
    for (let nh = 0; nh < 6; nh++) {
      const nhx = nX + 6 + nh * (nW - 12) / 5
      const sway = Math.sin(st.t * 2 + nh * 0.9) * 3
      ctx.beginPath()
      ctx.moveTo(nhx, noseY + noseH - 3)
      ctx.quadraticCurveTo(nhx + sway, noseY + noseH - 10, nhx + sway * 0.5, noseY + noseH - 14)
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.4)'
      ctx.lineWidth = 0.9
      ctx.stroke()
    }
    regions.push({ part: 'nose', x: nX - 16, y: noseY - 5, w: nW + 32, h: noseH + 10 })
    ctx.globalAlpha = 1.0

    // ── PHARYNX (Enlarged)
    ctx.globalAlpha = getAlpha('pharynx')
    const phW1 = 26 * S
    const phW2 = 21 * S
    ctx.beginPath()
    ctx.moveTo(cx - phW1 / 2, pharY)
    ctx.lineTo(cx - phW2 / 2, pharY + pharH)
    ctx.lineTo(cx + phW2 / 2, pharY + pharH)
    ctx.lineTo(cx + phW1 / 2, pharY)
    ctx.closePath()
    ctx.fillStyle = colF('pharynx')
    ctx.fill()
    ctx.strokeStyle = col('pharynx')
    ctx.lineWidth = 1.8
    ctx.stroke()

    // tonsils (tonsilas linfóides)
    ctx.beginPath()
    ctx.arc(cx - phW1 / 2 - 4, pharY + pharH * 0.4, 4.5, 0, Math.PI * 2)
    ctx.arc(cx + phW1 / 2 + 4, pharY + pharH * 0.4, 4.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(244, 63, 94, 0.1)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.2)'
    ctx.lineWidth = 0.8
    ctx.stroke()
    regions.push({ part: 'pharynx', x: cx - phW1 / 2 - 10, y: pharY - 3, w: phW1 + 20, h: pharH + 6 })
    ctx.globalAlpha = 1.0

    // ── LARYNX (Enlarged and highlighted)
    ctx.globalAlpha = getAlpha('larynx')
    const lW = 32 * S
    ctx.beginPath()
    ctx.moveTo(cx, larY)
    ctx.lineTo(cx + lW / 2, larY + larH * 0.2)
    ctx.lineTo(cx + lW / 2 - 2, larY + larH)
    ctx.lineTo(cx - lW / 2 + 2, larY + larH)
    ctx.lineTo(cx - lW / 2, larY + larH * 0.2)
    ctx.closePath()
    ctx.fillStyle = colF('larynx')
    ctx.fill()
    ctx.strokeStyle = col('larynx')
    ctx.lineWidth = 1.8
    ctx.stroke()

    // epiglottis flap (moving slightly with breath)
    ctx.beginPath()
    const epiSway = Math.sin(st.breathCycle * Math.PI * 2) * 1.5 * (st.isPaused ? 0 : 1)
    ctx.moveTo(cx - 5, larY + 2)
    ctx.quadraticCurveTo(cx - 8 * S + epiSway, larY - 8 * S, cx + epiSway, larY - 14 * S)
    ctx.quadraticCurveTo(cx + 8 * S + epiSway, larY - 8 * S, cx + 5, larY + 2)
    ctx.fillStyle = 'rgba(250, 204, 21, 0.1)'
    ctx.fill()
    ctx.strokeStyle = COL_EPIGLOTTIS
    ctx.lineWidth = 1.4
    ctx.stroke()

    // vocal cords (true anatomical movement during respiration)
    const vcY = larY + larH * 0.55
    const vcGap = 3.0 + Math.sin(st.t * (st.isPaused ? 0 : 2)) * (isInhale ? 3 : 1)
    ctx.beginPath()
    ctx.moveTo(cx - lW / 2 + 5, vcY)
    ctx.lineTo(cx - vcGap, vcY)
    ctx.moveTo(cx + vcGap, vcY)
    ctx.lineTo(cx + lW / 2 - 5, vcY)
    ctx.strokeStyle = isHi('larynx') ? 'rgba(250, 204, 21, 0.85)' : 'rgba(250, 204, 21, 0.45)'
    ctx.lineWidth = 2.2
    ctx.stroke()
    regions.push({ part: 'larynx', x: cx - lW / 2 - 8, y: larY - 16 * S, w: lW + 16, h: larH + 18 * S })
    ctx.globalAlpha = 1.0

    // ── TRACHEA (Anatomical C-rings)
    ctx.globalAlpha = getAlpha('trachea')
    const tW = 22 * S
    ctx.beginPath()
    ctx.roundRect(cx - tW / 2, traY, tW, traH, 3)
    ctx.fillStyle = colF('trachea')
    ctx.fill()
    ctx.strokeStyle = col('trachea')
    ctx.lineWidth = 1.8
    ctx.stroke()

    // Detailed cartilage rings
    const ringCount = 10
    for (let r = 0; r < ringCount; r++) {
      const ry = traY + 4 + r * (traH - 8) / (ringCount - 1)
      ctx.beginPath()
      ctx.arc(cx, ry, tW * 0.48, -0.6, Math.PI + 0.6)
      ctx.strokeStyle = isHi('trachea') ? 'rgba(167, 139, 250, 0.5)' : COL_CARTILAGE
      ctx.lineWidth = 2.8
      ctx.stroke()
    }

    // Cilia (wiggling pseudoestratified cilia)
    for (let ci = 0; ci < 12; ci++) {
      const ciy = traY + 3 + ci * (traH - 6) / 11
      const phase = (st.isPaused ? 0 : st.t * 5.2) + ci * 0.6
      const sway = Math.sin(phase) * 3

      ctx.beginPath()
      ctx.moveTo(cx - tW / 2 + 2, ciy)
      ctx.quadraticCurveTo(cx - tW / 2 + 2 + sway, ciy - 4, cx - tW / 2 + 2 + sway * 1.2, ciy - 6)
      ctx.strokeStyle = `rgba(45, 212, 191, ${0.3 + Math.sin(phase) * 0.1})`
      ctx.lineWidth = 0.8
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(cx + tW / 2 - 2, ciy)
      ctx.quadraticCurveTo(cx + tW / 2 - 2 - sway, ciy - 4, cx + tW / 2 - 2 - sway * 1.2, ciy - 6)
      ctx.strokeStyle = `rgba(45, 212, 191, ${0.3 + Math.sin(phase) * 0.1})`
      ctx.lineWidth = 0.8
      ctx.stroke()
    }

    regions.push({ part: 'trachea', x: cx - tW / 2 - 6, y: traY - 3, w: tW + 12, h: traH + 6 })
    ctx.globalAlpha = 1.0

    // ── BRONCHI (Detailed branchings)
    ctx.globalAlpha = getAlpha('bronchi')
    ctx.beginPath()
    ctx.arc(cx, bifY + 3, 3, 0, Math.PI)
    ctx.fillStyle = 'rgba(167, 139, 250, 0.25)'
    ctx.fill()

    const drawMainBronchus = (side: number, spread: number, angle: number, bW2: number) => {
      const endX = cx + side * spread
      const endY = bifY + bronchLen

      ctx.beginPath()
      ctx.moveTo(cx + side * 3, bifY)
      ctx.quadraticCurveTo(cx + side * spread * 0.35, bifY + bronchLen * 0.35, endX, endY)
      ctx.strokeStyle = isHi('bronchi') ? COL_AIRWAY_HI : COL_AIRWAY
      ctx.lineWidth = bW2
      ctx.stroke()

      for (let br = 0; br < 4; br++) {
        const bt = 0.15 + br * 0.22
        const bx = lerp(cx + side * 3, endX, bt)
        const by = lerp(bifY, endY, bt)
        ctx.beginPath()
        ctx.arc(bx, by, bW2 * 0.7, angle - 0.5, angle + Math.PI + 0.5)
        ctx.strokeStyle = isHi('bronchi') ? 'rgba(167, 139, 250, 0.3)' : 'rgba(167, 139, 250, 0.15)'
        ctx.lineWidth = 1.8
        ctx.stroke()
      }

      return { x: endX, y: endY }
    }

    const leftEnd = drawMainBronchus(-1, bronchSpread, Math.PI * 0.3, 4.0 * S)
    const rightEnd = drawMainBronchus(1, bronchSpread, -Math.PI * 0.3, 4.8 * S) // right is physically wider and more vertical

    // Recursive bronchi tree (23 generations concept representation)
    const drawTree = (bx: number, by: number, angle: number, len: number, depth: number, maxD: number) => {
      if (depth > maxD) return
      const ex = bx + Math.cos(angle) * len
      const ey = by + Math.sin(angle) * len
      ctx.beginPath()
      ctx.moveTo(bx, by)
      ctx.lineTo(ex, ey)
      
      const alpha = isHi('bronchi') ? (0.6 - depth * 0.1) : (0.28 - depth * 0.04)
      ctx.strokeStyle = `rgba(34, 211, 238, ${Math.max(0.05, alpha)})`
      ctx.lineWidth = Math.max(0.4, (4.0 - depth * 0.8) * S)
      ctx.stroke()

      const spread = 0.44 - depth * 0.04
      drawTree(ex, ey, angle - spread, len * 0.64, depth + 1, maxD)
      drawTree(ex, ey, angle + spread, len * 0.64, depth + 1, maxD)
    }

    // left lung branches (2 segments)
    drawTree(leftEnd.x, leftEnd.y, Math.PI * 0.58, 28 * S, 0, 4)
    drawTree(leftEnd.x, leftEnd.y, Math.PI * 0.78, 22 * S, 0, 3)

    // right lung branches (3 segments - physically more vertical)
    drawTree(rightEnd.x, rightEnd.y, Math.PI * 0.42, 28 * S, 0, 4)
    drawTree(rightEnd.x, rightEnd.y, Math.PI * 0.28, 24 * S, 0, 3)
    drawTree(rightEnd.x, rightEnd.y, Math.PI * 0.52, 20 * S, 0, 3)

    regions.push({ part: 'bronchi', x: leftEnd.x - 25, y: bifY - 5, w: rightEnd.x - leftEnd.x + 50, h: bronchLen + 35 })
    ctx.globalAlpha = 1.0

    // ═══════════════════ ALVEOLI CLUSTERS ═══════════════════
    ctx.globalAlpha = getAlpha('alveoli')
    const isAlvHi = isHi('alveoli')
    
    const drawAlvCluster = (ax: number, ay: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const aa = (i / count) * Math.PI * 2
        const ar = 8.5 * S * (1 + expand * 2.6) // alveolar expansion animation
        const aox = ax + Math.cos(aa) * ar * 1.8
        const aoy = ay + Math.sin(aa) * ar * 1.8

        ctx.beginPath()
        ctx.arc(aox, aoy, ar, 0, Math.PI * 2)
        ctx.fillStyle = isAlvHi ? 'rgba(250, 204, 21, 0.12)' : 'rgba(250, 204, 21, 0.04)'
        ctx.fill()
        ctx.strokeStyle = isAlvHi ? 'rgba(250, 204, 21, 0.65)' : 'rgba(250, 204, 21, 0.22)'
        ctx.lineWidth = 0.9
        ctx.stroke()

        // capillary wrap representation
        ctx.beginPath()
        ctx.arc(aox, aoy, ar * 1.15, aa - 0.4, aa + 1.2)
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.22)'
        ctx.lineWidth = 1.6
        ctx.stroke()

        // oxygen diffusion dot exchange
        if (isAlvHi && i % 2 === 0 && !st.isPaused) {
          const edx = aox + Math.cos(aa) * ar * 0.7
          const edy = aoy + Math.sin(aa) * ar * 0.7
          ctx.beginPath()
          ctx.arc(edx + Math.sin(st.t * 3.2 + i) * 2, edy, 1.6, 0, Math.PI * 2)
          ctx.fillStyle = COL_O2
          ctx.fill()
        }
      }
      // alveolar duct center
      ctx.beginPath()
      ctx.arc(ax, ay, 6 * S * (1 + expand * 2.6), 0, Math.PI * 2)
      ctx.fillStyle = isAlvHi ? 'rgba(250, 204, 21, 0.14)' : 'rgba(250, 204, 21, 0.05)'
      ctx.fill()
      ctx.strokeStyle = isAlvHi ? 'rgba(250, 204, 21, 0.55)' : 'rgba(250, 204, 21, 0.18)'
      ctx.lineWidth = 0.9
      ctx.stroke()
    }

    // Alveoli placements in respiratory zone
    const alvPositions = [
      { x: rCx - lungW * 0.12, y: rCy - lungH * 0.08, n: 6 },
      { x: rCx + lungW * 0.18, y: rCy + lungH * 0.18, n: 6 },
      { x: rCx - lungW * 0.04, y: rCy + lungH * 0.32, n: 5 },
      { x: lCx + lW2 * 0.12, y: lCy - lungH * 0.05, n: 6 },
      { x: lCx - lW2 * 0.12, y: lCy + lungH * 0.15, n: 6 },
      { x: lCx + lW2 * 0.04, y: lCy + lungH * 0.3, n: 5 },
    ]
    
    for (const ap of alvPositions) {
      drawAlvCluster(ap.x, ap.y, ap.n)
    }

    regions.push({ part: 'alveoli', x: rlx, y: lungCenterY - lungH * 0.25, w: lungW * 0.7, h: lungH * 0.65 })
    ctx.globalAlpha = 1.0

    // ═══════════════════ FLOW PARTICLES (Cyan O2 and Rose CO2) ═══════════════════
    // In airway or hematosis view mode, we highlight gas particles
    const isGasActive = st.viewMode === 'all' || st.viewMode === 'hematosis' || st.viewMode === 'airway'
    
    if (isGasActive) {
      if (!st.particles) {
        st.particles = []
        // generate 24 particles
        for (let i = 0; i < 24; i++) {
          st.particles.push({
            phase: Math.random(),
            speed: 0.0035 + Math.random() * 0.0045,
            type: i < 16 ? 'o2' : 'co2',
            side: i % 3 === 0 ? 'left' : (i % 3 === 1 ? 'right' : 'center'),
            wobble: Math.random() * 10,
            size: 2.2 + Math.random() * 1.5,
          })
        }
      }

      // pathway coordinates
      const centerPath = [
        { x: cx, y: noseY - 6 },
        { x: cx, y: noseY + noseH * 0.5 },
        { x: cx, y: pharY + pharH * 0.5 },
        { x: cx, y: larY + larH * 0.5 },
        { x: cx, y: traY + traH * 0.3 },
        { x: cx, y: traY + traH * 0.7 },
        { x: cx, y: bifY },
      ]

      const leftPath = [...centerPath, leftEnd, { x: lCx, y: lCy }]
      const rightPath = [...centerPath, rightEnd, { x: rCx, y: rCy }]

      for (const p of st.particles) {
        const path = p.side === 'left' ? leftPath : (p.side === 'right' ? rightPath : centerPath)
        const totalSeg = path.length - 1

        if (!st.isPaused) {
          if (p.type === 'o2') {
            p.phase += p.speed * (isInhale ? 1.6 : 0.4)
            if (p.phase > 1) p.phase = 0
          } else {
            p.phase += p.speed * (isExhale ? 1.6 : 0.4)
            if (p.phase > 1) p.phase = 0
          }
        }

        const drawT = p.type === 'o2' ? p.phase : (1 - p.phase)
        const segIdx = Math.floor(drawT * totalSeg)
        const segT = (drawT * totalSeg) - segIdx
        const p1 = path[Math.min(segIdx, path.length - 1)]
        const p2 = path[Math.min(segIdx + 1, path.length - 1)]
        const px = lerp(p1.x, p2.x, segT) + Math.sin((st.isPaused ? 0 : st.t * 3.2) + p.wobble) * 3.5
        const py = lerp(p1.y, p2.y, segT)

        ctx.globalAlpha = p.type === 'o2' ? getAlpha('nose') : getAlpha('alveoli')

        if (p.type === 'o2') {
          // oxygen glow
          const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 2.8)
          grad.addColorStop(0, 'rgba(34, 211, 238, 0.25)')
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.fillRect(px - p.size * 3.5, py - p.size * 3.5, p.size * 7, p.size * 7)

          ctx.beginPath()
          ctx.arc(px, py, p.size, 0, Math.PI * 2)
          ctx.fillStyle = COL_O2
          ctx.fill()
        } else {
          // carbon dioxide glow
          const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 2.4)
          grad.addColorStop(0, 'rgba(244, 63, 94, 0.22)')
          grad.addColorStop(1, 'transparent')
          ctx.fillStyle = grad
          ctx.fillRect(px - p.size * 3, py - p.size * 3, p.size * 6, p.size * 6)

          ctx.beginPath()
          ctx.arc(px, py, p.size * 0.85, 0, Math.PI * 2)
          ctx.fillStyle = COL_CO2
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1.0
    }

    // ═══════════════════ ANATOMICAL LABELS & POINTERS ═══════════════════
    const labelX = w * 0.71
    const fontSize = Math.max(8.5, 10.5 * S)

    const labels: { text: string; y: number; color: string; part: AirwayPart; anchorX?: number }[] = [
      { text: 'NARIZ E CAV. NASAL', y: noseY + noseH * 0.5, color: COL_CONDUCT, part: 'nose' },
      { text: 'FARINGE (VIA COMUM)', y: pharY + pharH * 0.5, color: COL_CONDUCT, part: 'pharynx' },
      { text: 'LARINGE (GLOTE/EPIGLOTE)', y: larY + larH * 0.3, color: COL_CONDUCT, part: 'larynx' },
      { text: 'TRAQUEIA (C-RINGS)', y: traY + traH * 0.4, color: COL_CONDUCT, part: 'trachea' },
      { text: 'BRÔNQUIOS / BRONQUÍOLOS', y: bifY + bronchLen * 0.4, color: COL_CONDUCT, part: 'bronchi' },
      { text: 'ALVÉOLOS (HEMATOSE)', y: lungCenterY, color: COL_RESP, part: 'alveoli' },
      { text: 'PULMÕES (D / E)', y: lungTop + 24 * S, color: COL_LUNG_STROKE, part: 'lungs' },
      { text: 'DIAFRAGMA (MOTOR INSP)', y: diaY + 5, color: COL_DIAPHRAGM, part: 'diaphragm' },
    ]

    ctx.font = `bold ${fontSize}px ${FONT_MONO}`
    ctx.textAlign = 'left'

    for (const lbl of labels) {
      const isActive = isHi(lbl.part)
      const partAlpha = getAlpha(lbl.part === 'lungs' ? 'lungs' : (lbl.part === 'diaphragm' ? 'diaphragm' : 'nose'))
      
      // opacity of text matches filter mode
      ctx.globalAlpha = partAlpha > 0.1 ? (isActive ? 1.0 : 0.6) : 0.15
      
      const anchorX = lbl.anchorX ?? cx + 62 * S

      // dynamic connector dash
      ctx.beginPath()
      ctx.moveTo(anchorX, lbl.y)
      ctx.lineTo(labelX - 5, lbl.y)
      ctx.strokeStyle = isActive ? lbl.color : 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = isActive ? 1.2 : 0.6
      ctx.setLineDash([2, 3])
      ctx.stroke()
      ctx.setLineDash([])

      // glowing active dot
      ctx.beginPath()
      ctx.arc(labelX - 8, lbl.y, isActive ? 3 : 2, 0, Math.PI * 2)
      ctx.fillStyle = isActive ? lbl.color : 'rgba(255,255,255,0.1)'
      if (isActive) {
        ctx.shadowColor = lbl.color
        ctx.shadowBlur = 6
      }
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.fillStyle = isActive ? lbl.color : 'rgba(255,255,255,0.7)'
      ctx.fillText(lbl.text, labelX, lbl.y + 4.5)
    }
    ctx.globalAlpha = 1.0

    // ── ZONAS FUNCIONAIS DISPLAY ──
    ctx.font = `800 ${Math.max(8, 9 * S)}px ${FONT_MONO}`
    const zoneX = w - 18
    ctx.textAlign = 'right'
    
    // Condutora
    ctx.fillStyle = COL_CONDUCT
    ctx.fillText('ZONA CONDUTORA', zoneX, noseY - 2)
    ctx.beginPath()
    ctx.moveTo(zoneX, noseY + 2)
    ctx.lineTo(zoneX, bifY - 5)
    ctx.strokeStyle = 'rgba(45, 212, 191, 0.15)'
    ctx.lineWidth = 2.5
    ctx.stroke()

    // Respiratória
    ctx.fillStyle = COL_RESP
    ctx.fillText('ZONA RESPIRATÓRIA', zoneX, bifY + bronchLen * 0.65)
    ctx.beginPath()
    ctx.moveTo(zoneX, bifY + bronchLen * 0.72)
    ctx.lineTo(zoneX, lungCenterY + lungH * 0.3)
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.15)'
    ctx.lineWidth = 2.5
    ctx.stroke()

    // Breathing phase textual indicator
    ctx.font = `800 ${Math.max(10, 13 * S)}px ${FONT_MONO}`
    ctx.textAlign = 'left'
    ctx.fillStyle = st.isPaused ? '#ef4444' : (isInhale ? COL_O2 : COL_CO2)
    
    let phaseText = '· · ·'
    if (st.isPaused) phaseText = 'SIMULAÇÃO PAUSADA'
    else if (isInhale) phaseText = 'INSPIRAÇÃO (ATIVO)'
    else if (isExhale) phaseText = 'EXPIRAÇÃO (PASSIVO)'
    
    ctx.fillText(phaseText, 16, 26 * S)

    // Lung Volume dynamic scale bar
    const volBarW = 100 * S
    const volBarH = 7 * S
    const volBarX = 16
    const volBarY = 38 * S
    const volFill = (st.volumeMl - 2400) / 4500
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)'
    ctx.fillRect(volBarX, volBarY, volBarW, volBarH)
    ctx.fillStyle = isInhale ? 'rgba(34, 211, 238, 0.5)' : 'rgba(244, 63, 94, 0.4)'
    ctx.fillRect(volBarX, volBarY, volBarW * Math.max(0.02, volFill), volBarH)

    ctx.font = `600 ${Math.max(8.5, 9.5 * S)}px ${FONT_MONO}`
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.fillText(`Capacidade Pulmonar: ${st.volumeMl} mL`, volBarX, volBarY + volBarH + 11 * S)

    regionsRef.current = regions
  }, [hoveredPart, selectedPart])

  // React Loop Sync
  useEffect(() => {
    const cvs = canvasRef.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return
    let raf = 0

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      const st = stateRef.current
      if (now - st.lastTimestamp < FRAME_MS) return
      st.lastTimestamp = now

      // sync volume indicator to slider react
      if (now % 100 < 10) {
        setLiveVolume(st.volumeMl)
      }

      if (!st.isPaused) {
        st.t += 0.03
      }

      const dpr = window.devicePixelRatio || 1
      const rect = cvs.getBoundingClientRect()
      const cw = rect.width * dpr
      const ch = rect.height * dpr
      if (cvs.width !== cw || cvs.height !== ch) { cvs.width = cw; cvs.height = ch }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(ctx, rect.width, rect.height)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [draw])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const cvs = canvasRef.current
    if (!cvs) return
    const rect = cvs.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    let found: AirwayPart = null
    for (let i = regionsRef.current.length - 1; i >= 0; i--) {
      const r = regionsRef.current[i]
      if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) { found = r.part; break }
    }
    setHoveredPart(found)
    cvs.style.cursor = found ? 'pointer' : 'default'
  }, [])

  const handleClick = useCallback(() => {
    setSelectedPart(prev => prev === hoveredPart ? null : hoveredPart)
  }, [hoveredPart])

  const activePart = selectedPart || hoveredPart
  const info = activePart ? PART_INFO[activePart] : null

  return (
    <div className={`flex flex-col lg:flex-row gap-4 h-full w-full min-h-0 ${className ?? ''}`}>
      
      {/* ── Left main simulation screen ── */}
      <div className="relative flex-1 min-h-[360px] rounded-2xl overflow-hidden bg-[#040610] border border-white/5 shadow-2xl flex flex-col justify-end">
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ width: '100%', height: '100%', display: 'block' }}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onMouseLeave={() => setHoveredPart(null)}
        />

        {/* Selected / Hovered anatomy information overlay */}
        {info && (
          <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-black/85 backdrop-blur-md px-4 py-3 pointer-events-none z-20">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-2 w-2 rounded-full" style={{
                background: info.zone.includes('Respiratória') ? COL_RESP
                  : info.zone.includes('Motor') ? COL_DIAPHRAGM
                  : info.zone.includes('Órgão') ? COL_LUNG_STROKE
                  : COL_CONDUCT
              }} />
              <span className="text-[11px] font-semibold text-white/90 uppercase tracking-wider">{info.title}</span>
              <span className="text-[9px] text-white/40 ml-1">{info.zone}</span>
            </div>
            <p className="text-[10px] text-white/50 mb-1">{info.desc}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              {info.details.map((d, i) => (
                <span key={i} className="text-[9px] text-white/35">▸ {d}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Right control board (View Filters & Physiological Rhythm) ── */}
      <div className="w-full lg:w-80 flex flex-col gap-4 p-4 rounded-2xl bg-black/55 border border-white/5 backdrop-blur-xl shrink-0 overflow-y-auto max-h-full">
        <div className="border-b border-white/[0.06] pb-2.5">
          <span className="text-[8px] uppercase tracking-[0.2em] font-black text-sky-400 block mb-0.5">FILTROS & CONTROLES</span>
          <h4 className="text-[12px] font-bold text-white/90 font-sans tracking-wide">Anatomofisiologia Respiratória</h4>
        </div>

        {/* View Mode Filters */}
        <div className="space-y-3">
          <span className="text-[7.5px] font-mono text-white/30 uppercase tracking-widest font-black block">Filtros de Estrutura</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'all', label: 'Tudo (Holograma)', desc: 'Visão completa' },
              { id: 'airway', label: 'Zona Condutora', desc: 'Vias e condução' },
              { id: 'hematosis', label: 'Zona Resp.', desc: 'Lungs e troca' },
              { id: 'mechanics', label: 'Mecânica Musc.', desc: 'Diafragma e costelas' }
            ].map((mode) => {
              const active = viewMode === mode.id
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as ViewMode)}
                  className={`p-2 rounded-lg border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between h-[52px] ${
                    active 
                      ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' 
                      : 'bg-white/[0.01] border-white/5 text-white/60 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-[9px] font-bold leading-tight flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {mode.label}
                  </span>
                  <span className="text-[7px] text-white/30 truncate leading-none">{mode.desc}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Physiological Rhythm Controller */}
        <div className="space-y-4 flex-1">
          <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
            <div className="flex justify-between items-center text-[9px] font-mono text-white/70">
              <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-sky-400" /> RITMO FISIOLÓGICO</span>
              <span className="font-bold text-sky-400">
                {respiratoryRate} <span className="text-[8px] text-white/40">rpm</span>
              </span>
            </div>
            <input 
              type="range" 
              min="12" 
              max="30" 
              value={respiratoryRate} 
              onChange={(e) => setRespiratoryRate(Number(e.target.value))}
              className="w-full accent-sky-400 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[7.5px] font-mono text-white/30 pt-0.5 leading-none">
              <span>Repouso (12 rpm)</span>
              <span>Esforço (30 rpm)</span>
            </div>
            <span className="text-[7.5px] font-mono text-white/35 block leading-normal pt-1">
              Ajusta o ritmo do ciclo de expansão pulmonar e o fluxo de ar ($O_2$/$CO_2$) simulando repouso ou exercício físico leve.
            </span>
          </div>

          {/* Quick Info card explaining the selected filter */}
          <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.01] flex gap-2 items-start mt-2">
            <Info className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] font-bold text-white/80 uppercase tracking-wider font-mono">Dica Anatômica</span>
              <p className="text-[7.5px] text-white/45 leading-normal mt-0.5">
                {viewMode === 'all' && 'Use o mouse para pairar ou clicar sobre as estruturas do sistema respiratório no holograma à esquerda para ver descrições clínicas.'}
                {viewMode === 'airway' && 'O espaço morto anatômico é de ~150 mL nas vias condutoras (nariz à traqueia), onde NÃO ocorre hematose.'}
                {viewMode === 'hematosis' && 'A hematose ocorre na zona respiratória (ductos e alvéolos pulmonares) através de uma delicada membrana de apenas 0,2 µm.'}
                {viewMode === 'mechanics' && 'A inspiração é um processo ativo coordenado pelo diafragma. Em repouso, a expiração é um processo passivo gerado pela retração pulmonar.'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[7.5px] font-mono text-white/30 uppercase leading-none">Simulação</span>
            <span className="text-[9px] font-mono text-white/70 font-semibold">{isPaused ? 'Espera' : 'Operando'}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleReset}
              className="p-1.5 text-[8.5px] uppercase font-mono tracking-wider text-white/50 border border-white/10 hover:border-white/20 hover:text-white rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`px-3 py-1.5 text-[9px] uppercase font-mono tracking-wider font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                isPaused 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              {isPaused ? <Play className="h-3 w-3 fill-emerald-400" /> : <Pause className="h-3 w-3 fill-amber-400" />}
              {isPaused ? 'Ligar' : 'Pausar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
