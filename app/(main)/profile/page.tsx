'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/authStore'
import { supabase } from '@/lib/supabase'
import {
  ArrowLeft, Bell, Camera, ChevronRight, HelpCircle, Info,
  Key, LogOut, Mail, Moon, PencilLine, Save, Shield, Trash2, User, X, Phone,
  BookOpen, Star
} from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { profile, user, isAdmin, signOut, updateProfile } = useAuthStore()

  // Edit states
  const [editField, setEditField] = useState<'name' | 'email' | 'phone' | null>(null)
  const [editValue, setEditValue] = useState('')
  const [changePassword, setChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // UI
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showAjuda, setShowAjuda] = useState(false)

  // ID do Auth obtido da sessão
  const activeAdminId = user?.id || null
  const profileName = profile?.name || ""
  const profileEmail = profile?.email || user?.email || ""

  // Estados do NPS
  const [npsScore, setNpsScore] = useState<number | null>(null)
  const [npsFeedback, setNpsFeedback] = useState<string>("")
  const [feedbacksList, setFeedbacksList] = useState<any[]>([])

  // Estados do Suporte
  const [supportOpen, setSupportOpen] = useState(false)
  const [supportEmail, setSupportEmail] = useState(profileEmail)
  const [supportMessage, setSupportMessage] = useState("")
  const [supportSending, setSupportSending] = useState(false)
  const [supportSuccess, setSupportSuccess] = useState(false)

  // Carrega feedbacks cacheados locais ao iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("bs_feedbacks")
      if (cached) {
        try {
          setFeedbacksList(JSON.parse(cached))
        } catch {}
      }
    }
  }, [])

  // Sincroniza e-mail padrão do suporte quando o e-mail do perfil carregar
  useEffect(() => {
    if (profileEmail) {
      setSupportEmail(profileEmail)
    }
  }, [profileEmail])

  const flash = (msg: string) => { setMessage(msg); setError(''); setTimeout(() => setMessage(''), 3000) }
  const flashErr = (msg: string) => { setError(msg); setMessage(''); setTimeout(() => setError(''), 5000) }

  // ── Handlers ──

  const handleSaveName = async () => {
    if (!editValue.trim()) { flashErr('Nome nao pode ser vazio.'); return }
    setSaving(true)
    const result = await updateProfile({ name: editValue.trim() })
    setSaving(false)
    if (result.error) { flashErr(result.error); return }
    setEditField(null)
    flash('Nome atualizado.')
  }

  const handleSaveEmail = async () => {
    if (!editValue.trim() || !editValue.includes('@')) { flashErr('Email invalido.'); return }
    if (!supabase) { flashErr('Supabase nao configurado.'); return }
    setSaving(true)
    // Update auth email
    const { error: authErr } = await supabase.auth.updateUser({ email: editValue.trim() })
    if (authErr) { flashErr(authErr.message); setSaving(false); return }
    // Update profile table
    await updateProfile({})
    setSaving(false)
    setEditField(null)
    flash('Email atualizado. Verifique a caixa de entrada para confirmar.')
  }

  const handleSavePhone = async () => {
    setSaving(true)
    const result = await updateProfile({ phone: editValue.trim() || null })
    setSaving(false)
    if (result.error) { flashErr(result.error); return }
    setEditField(null)
    flash('WhatsApp atualizado.')
  }

  const handleChangePassword = async () => {
    setError('')
    if (newPassword.length < 6) { flashErr('Minimo 6 caracteres.'); return }
    if (newPassword !== confirmPassword) { flashErr('Senhas nao coincidem.'); return }
    if (!supabase) { flashErr('Supabase nao configurado.'); return }
    setSaving(true)
    const { error: err } = await supabase.auth.updateUser({ password: newPassword })
    setSaving(false)
    if (err) { flashErr(err.message); return }
    setChangePassword(false)
    setNewPassword('')
    setConfirmPassword('')
    flash('Senha alterada com sucesso.')
  }

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !supabase || !user) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${user.id}/avatar.${ext}`
    const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (upErr) { flashErr(upErr.message); setUploading(false); return }
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    await updateProfile({ photo_url: data.publicUrl + '?t=' + Date.now() })
    setUploading(false)
    flash('Foto atualizada.')
  }

  const handleToggleNotifications = async () => {
    await updateProfile({ notifications_enabled: !profile?.notifications_enabled })
  }

  const handleLogout = () => {
    signOut()
    window.location.href = '/auth'
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Tem certeza que deseja excluir sua conta? Todos os seus dados serao apagados permanentemente. Essa acao nao pode ser desfeita.')) return
    if (!confirm('ULTIMA CONFIRMACAO: Sua conta e todos os dados serao excluidos. Deseja continuar?')) return
    setSaving(true)
    const res = await fetch('/api/user/delete', { method: 'DELETE' })
    if (!res.ok) {
      const body = await res.json() as { error?: string }
      flashErr(body.error ?? 'Erro ao excluir conta.')
      setSaving(false)
      return
    }
    await signOut()
    window.location.href = '/auth'
  }

  // Submissão do NPS
  const handleNpsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (npsScore === null) return

    const newFb = {
      score: npsScore,
      text: npsFeedback,
      date: new Date().toLocaleDateString("pt-BR"),
    }
    
    // Atualiza cache local e localStorage
    const updated = [newFb, ...feedbacksList]
    setFeedbacksList(updated)
    localStorage.setItem("bs_feedbacks", JSON.stringify(updated))

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: activeAdminId || null,
          score: npsScore,
          text: npsFeedback
        })
      })
    } catch (err) {
      console.warn("[NPS Submit] erro ao salvar:", err)
    }
    
    setNpsFeedback("")
    setNpsScore(null)
    flash("Agradecemos muito pelo seu feedback!")
  }

  // Submissão do Chamado de Suporte
  const handleSendSupport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supportMessage.trim()) return
    setSupportSending(true)
    
    try {
      const r = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: activeAdminId || null,
          name: profileName || "Usuária",
          email: supportEmail || profileEmail || "sem-email@business-syllabus.app",
          message: supportMessage
        })
      })

      if (!r.ok) {
        const errJson = await r.json().catch(() => ({}))
        throw new Error(errJson.error || "Falha ao enviar ticket")
      }

      flash("Mensagem enviada com sucesso ao suporte!")
      setSupportMessage("")
      setSupportSuccess(true)
    } catch (err: any) {
      flashErr("Erro ao enviar: " + err.message)
    } finally {
      setSupportSending(false)
    }
  }

  const inputClass = 'w-full h-9 rounded-[0.5rem] border border-white/15 bg-white/[0.08] px-3 text-[12px] text-white placeholder:text-white/40 outline-none focus:border-white/30'
  const menuBtn = 'ipb-soft flex w-full items-center gap-2.5 rounded-[0.8rem] px-3 py-2.5 text-left transition-all'

  return (
    <div className="relative min-h-screen text-white px-2 pb-32 pt-16 md:px-4">
      <div className="relative z-10 mx-auto w-full max-w-2xl md:max-w-none">
      {/* Back */}
      <button onClick={() => router.push('/sea')} className="mb-5 flex items-center gap-1.5 text-[11px] text-white/65 hover:text-white/90 transition-colors">
        <ArrowLeft className="h-3 w-3" /> Voltar
      </button>

      {/* Messages */}
      {message && <div className="mb-3 rounded-[0.5rem] border border-[#4ade8030] bg-[#4ade8008] px-3 py-1.5"><p className="text-[8px] text-[#86efac]">{message}</p></div>}
      {error && <div className="mb-3 rounded-[0.5rem] border border-[#f8717130] bg-[#f8717108] px-3 py-1.5"><p className="text-[8px] text-[#fca5a5]">{error}</p></div>}

      {/* ═══ Avatar + Header ═══ */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/[0.08]">
            {profile?.photo_url ? (
              <img src={profile.photo_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <User className="h-7 w-7 text-white/60" />
            )}
          </div>
          <label className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/85">
            {uploading ? <div className="h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white" /> : <Camera className="h-3 w-3 text-white/80" />}
            <input type="file" accept="image/*" className="hidden" onChange={handleUploadPhoto} />
          </label>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-white/95">{profile?.name || 'Usuário'}</p>
          <p className="text-[11px] text-white/65">{profile?.email || user?.email}</p>
          {isAdmin && (
            <span className="mt-1.5 inline-block rounded-full border border-white/20 bg-white/[0.06] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/85">
              Admin
            </span>
          )}
        </div>
      </div>

      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Conta</p>
      <div className="space-y-1 mb-4">

        {/* ── Nome ── */}
        {editField === 'name' ? (
          <div className="flex items-center gap-1 rounded-[0.7rem] ipb-soft px-3 py-1.5">
            <User className="h-3.5 w-3.5 shrink-0 text-white/30" />
            <input className={inputClass} value={editValue} onChange={(e) => setEditValue(e.target.value)} placeholder="Seu nome" autoFocus />
            <button onClick={handleSaveName} disabled={saving} className="shrink-0 text-[#4ade80]"><Save className="h-3.5 w-3.5" /></button>
            <button onClick={() => setEditField(null)} className="shrink-0 text-white/30"><X className="h-3.5 w-3.5" /></button>
          </div>
        ) : (
          <button onClick={() => { setEditField('name'); setEditValue(profile?.name || '') }} className={menuBtn}>
            <User className="h-4 w-4 text-white/75" />
            <div className="flex-1">
              <p className="text-[9px] uppercase tracking-wider text-white/50">Nome</p>
              <p className="text-[12px] font-medium text-white/95">{profile?.name || 'Não informado'}</p>
            </div>
            <PencilLine className="h-3.5 w-3.5 text-white/55" />
          </button>
        )}

        {/* ── Email ── */}
        {editField === 'email' ? (
          <div className="flex items-center gap-1 rounded-[0.7rem] ipb-soft px-3 py-1.5">
            <Mail className="h-3.5 w-3.5 shrink-0 text-white/30" />
            <input className={inputClass} type="email" value={editValue} onChange={(e) => setEditValue(e.target.value)} placeholder="Seu email" autoFocus />
            <button onClick={handleSaveEmail} disabled={saving} className="shrink-0 text-[#4ade80]"><Save className="h-3.5 w-3.5" /></button>
            <button onClick={() => setEditField(null)} className="shrink-0 text-white/30"><X className="h-3.5 w-3.5" /></button>
          </div>
        ) : (
          <button onClick={() => { setEditField('email'); setEditValue(profile?.email || user?.email || '') }} className={menuBtn}>
            <Mail className="h-4 w-4 text-white/75" />
            <div className="flex-1">
              <p className="text-[9px] uppercase tracking-wider text-white/50">Email</p>
              <p className="text-[12px] font-medium text-white/95">{profile?.email || user?.email}</p>
            </div>
            <PencilLine className="h-3.5 w-3.5 text-white/55" />
          </button>
        )}

        {/* ── WhatsApp / Telefone ── */}
        {editField === 'phone' ? (
          <div className="flex items-center gap-1 rounded-[0.7rem] ipb-soft px-3 py-1.5">
            <Phone className="h-3.5 w-3.5 shrink-0 text-white/30" />
            <input className={inputClass} value={editValue} onChange={(e) => setEditValue(e.target.value)} placeholder="Seu WhatsApp (ex: 5511999999999)" autoFocus />
            <button onClick={handleSavePhone} disabled={saving} className="shrink-0 text-[#4ade80]"><Save className="h-3.5 w-3.5" /></button>
            <button onClick={() => setEditField(null)} className="shrink-0 text-white/30"><X className="h-3.5 w-3.5" /></button>
          </div>
        ) : (
          <button onClick={() => { setEditField('phone'); setEditValue(profile?.phone || '') }} className={menuBtn}>
            <Phone className="h-4 w-4 text-white/75" />
            <div className="flex-1">
              <p className="text-[9px] uppercase tracking-wider text-white/50">WhatsApp / Telefone</p>
              <p className="text-[12px] font-medium text-white/95">{profile?.phone || 'Não informado'}</p>
            </div>
            <PencilLine className="h-3.5 w-3.5 text-white/55" />
          </button>
        )}

        {/* ── Senha ── */}
        <button onClick={() => { setChangePassword(!changePassword); setError('') }} className={menuBtn}>
          <Key className="h-4 w-4 text-white/75" />
          <span className="flex-1 text-[12px] font-medium text-white/90">Alterar senha</span>
          <ChevronRight className={`h-3.5 w-3.5 text-white/55 transition-transform ${changePassword ? 'rotate-90' : ''}`} />
        </button>
        {changePassword && (
          <div className="rounded-[0.7rem] ipb-soft px-3 py-2 space-y-1.5">
            <input className={inputClass} type="password" placeholder="Nova senha (min 6 caracteres)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input className={inputClass} type="password" placeholder="Confirmar nova senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={handleChangePassword} disabled={saving} className="w-full h-7 rounded-[0.5rem] border border-white/10 bg-white/5 text-[8px] font-semibold text-white/60 disabled:opacity-50">
              {saving ? 'Salvando...' : 'Alterar senha'}
            </button>
          </div>
        )}
      </div>

      {/* ═══ Configurações ═══ */}
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Configurações</p>
      <div className="space-y-1 mb-4">
        {/* Notificações */}
        <button onClick={handleToggleNotifications} className={menuBtn}>
          <Bell className="h-4 w-4 text-white/75" />
          <span className="flex-1 text-left text-[12px] font-medium text-white/90">Notificações</span>
          <span className={`rounded-full px-1.5 py-0.5 text-[6px] font-semibold ${profile?.notifications_enabled ? 'border border-[#4ade8030] bg-[#4ade8010] text-[#4ade80]' : 'border border-white/10 bg-white/5 text-white/30'}`}>
            {profile?.notifications_enabled ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Tema */}
        <div className={menuBtn}>
          <Moon className="h-4 w-4 text-white/75" />
          <span className="flex-1 text-[12px] font-medium text-white/90">Tema</span>
          <span className="text-[10px] text-white/60">Dark</span>
        </div>
      </div>

      {/* ═══ Admin Panel ═══ */}
      {isAdmin && (
        <>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Administração</p>
          <div className="space-y-1 mb-4">
            <button
              onClick={() => router.push('/admin')}
              className="flex w-full items-center gap-2 rounded-[0.7rem] ipb-soft px-3 py-2.5 transition-all"
            >
              <Shield className="h-4 w-4 text-white/70" />
              <div className="flex-1 text-left">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/80">Painel Admin</p>
                <p className="text-[7px] text-white/35">Usuários · Assinaturas · Analytics · Equipes</p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/75" />
            </button>
            <button
              onClick={() => router.push('/admin/conteudos-arquivados')}
              className="flex w-full items-center gap-2 rounded-[0.7rem] ipb-soft px-3 py-2.5 transition-all mt-1"
            >
              <BookOpen className="h-4 w-4 text-white/70" />
              <div className="flex-1 text-left">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/80">Biblioteca Arquivada</p>
                <p className="text-[7px] text-white/35">Pneumo / VM · Cardio · Referência Clínica</p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/75" />
            </button>
          </div>
        </>
      )}

      {/* ═══ Legal / Suporte ═══ */}
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Suporte</p>
      <div className="space-y-1 mb-4">
        <button onClick={() => setShowAjuda(true)} className={menuBtn}>
          <HelpCircle className="h-4 w-4 text-white/75" />
          <span className="flex-1 text-left text-[12px] font-medium text-white/90">Ajuda e suporte</span>
          <ChevronRight className="h-3.5 w-3.5 text-white/55" />
        </button>
      </div>

      {/* NPS UI Form */}
      <div className="mb-5">
        <form onSubmit={handleNpsSubmit} className="ipb-soft font-sans" style={{ display: "flex", flexDirection: "column", gap: 14, padding: 20, borderRadius: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Star size={14} style={{ color: "#e0b85e" }} />
            <h4 style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#e0b85e", margin: 0 }}>
              Avaliação de Satisfação · NPS Interativo
            </h4>
          </div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 300, margin: 0, lineHeight: 1.5 }}>
            O quanto você recomendaria o aplicativo Business Syllabus para um sócio ou parceiro de negócios de 0 a 10?
          </p>

          {/* Grid de Pontuação Interativa (0 a 10) */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", margin: "6px 0" }}>
            {Array.from({ length: 11 }).map((_, score) => (
              <button
                key={score}
                type="button"
                className={`nps-btn ${npsScore === score ? "active" : ""}`}
                onClick={() => setNpsScore(score)}
                style={{
                  width: 32, height: 32, borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)",
                  background: npsScore === score ? "#e0b85e" : "rgba(255,255,255,0.02)",
                  color: npsScore === score ? "#000" : "#fff", fontWeight: 600, fontSize: 11, cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {score}
              </button>
            ))}
          </div>

          <div>
            <label style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e0b85e", display: "block", marginBottom: 6 }}>
              Comentários e Sugestões
            </label>
            <textarea
              placeholder="Conte-nos o que podemos melhorar na sua jornada..."
              rows={3}
              value={npsFeedback}
              onChange={(e) => setNpsFeedback(e.target.value)}
              style={{
                width: "100%", padding: 10, borderRadius: "8px", background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 11, resize: "none", outline: "none"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={npsScore === null}
            style={{
              width: "100%", padding: 12, borderRadius: 8, background: npsScore === null ? "rgba(255,255,255,0.05)" : "#e0b85e",
              color: npsScore === null ? "rgba(255,255,255,0.2)" : "#000", fontWeight: 600, cursor: npsScore === null ? "not-allowed" : "pointer",
              border: "none", transition: "all 0.2s"
            }}
          >
            Enviar Avaliação
          </button>
        </form>
      </div>

      {showAjuda && (
        <AjudaModal
          onClose={() => setShowAjuda(false)}
          onOpenSupport={() => setSupportOpen(true)}
        />
      )}

      {/* Modal de Suporte Helpdesk (Suporte UI) */}
      {supportOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24, zIndex: 1000, backdropFilter: "blur(8px)"
        }}>
          {supportSuccess ? (
            <div className="ipb-soft font-sans" style={{ width: "100%", maxWidth: 460, background: "#0a0a0a", border: "1.5px solid #e0b85e", display: "flex", flexDirection: "column", gap: 16, textAlign: "center", padding: 24, borderRadius: "1.2rem" }}>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: "#fff", margin: 0 }}>Chamado Enviado com Sucesso!</h4>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>
                Sua mensagem foi entregue com sucesso ao suporte. Responderemos diretamente em <strong>{supportEmail}</strong>.
              </p>
              <button onClick={() => { setSupportOpen(false); setSupportSuccess(false); }} style={{ width: "100%", padding: 12, borderRadius: 10, background: "#e0b85e", border: "none", color: "#000", fontWeight: 600, cursor: "pointer" }}>
                Entendido
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendSupport} className="ipb-soft font-sans" style={{ width: "100%", maxWidth: 460, background: "rgba(10,10,10,0.9)", border: "1.5px solid #e0b85e", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 24px 64px rgba(0,0,0,0.8)", padding: 24, borderRadius: "1.2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 12 }}>
                <h4 style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e0b85e", margin: 0 }}>Suporte Helpdesk</h4>
                <button type="button" onClick={() => { setSupportOpen(false); setSupportMessage(""); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>Fechar</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e0b85e", display: "block", marginBottom: 6 }}>E-mail para resposta</label>
                  <input type="email" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} required style={{ width: "100%", padding: 10, borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: 12, outline: "none" }} />
                </div>

                <div>
                  <label style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#e0b85e", display: "block", marginBottom: 6 }}>Mensagem / Descrição do Problema</label>
                  <textarea value={supportMessage} onChange={e => setSupportMessage(e.target.value)} placeholder="Descreva o problema aqui..." rows={5} required style={{ width: "100%", padding: 10, borderRadius: 8, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", resize: "none", fontSize: 12, outline: "none" }} />
                </div>
              </div>

              <button type="submit" disabled={supportSending} style={{ width: "100%", padding: 12, borderRadius: 10, background: "#e0b85e", border: "none", color: "#000", fontWeight: 600, cursor: "pointer" }}>
                {supportSending ? "Enviando chamado..." : "Enviar Chamado ao Suporte"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* ═══ Sobre ═══ */}
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Sobre</p>
      <div className="space-y-1 mb-4">
        <div className={menuBtn}>
          <Info className="h-4 w-4 text-white/75" />
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-white/90">Business Syllabus</p>
            <p className="text-[10px] text-white/60">Versão 1.0.0 · BS - Business Syllabus.</p>
          </div>
        </div>
      </div>

      {/* ═══ Logout + Deletar ═══ */}
      <div className="space-y-1">
        <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-[0.7rem] border border-[#f8717120] bg-[#f8717108] px-3 py-2">
          <LogOut className="h-3.5 w-3.5 text-[#fca5a5]" />
          <span className="text-[12px] font-semibold text-[#fca5a5]">Sair da conta</span>
        </button>
        <button onClick={handleDeleteAccount} className="flex w-full items-center gap-2 rounded-[0.7rem] border border-[#f8717108] bg-transparent px-3 py-2">
          <Trash2 className="h-3.5 w-3.5 text-white/20" />
          <span className="text-[11px] text-white/45">Excluir minha conta</span>
        </button>
      </div>
      </div>
    </div>
  )
}

const FAQ_ITEMS = [
  {
    q: 'O Business Syllabus substitui auditorias ou análises fiscais formais?',
    a: 'Não. O Business Syllabus (BS) é uma ferramenta de apoio à decisão gerencial e raciocínio estratégico. Ele não substitui pareceres contábeis, auditorias financeiras oficiais ou sistemas formais de ERP exigidos legalmente.',
  },
  {
    q: 'Meus dados de negócio ficam salvos onde?',
    a: 'Os dados simulados e de telemetria ficam armazenados localmente no seu dispositivo (localStorage) e processados no navegador. Dados sigilosos de sua empresa não são enviados a servidores externos de inteligência artificial de forma não criptografada.',
  },
  {
    q: 'Como altero minha senha?',
    a: 'Role até o final desta página na seção "Alterar senha". Digite sua nova senha de acesso duas vezes e clique em confirmar para salvar de forma segura.',
  },
  {
    q: 'Posso usar o Business Syllabus sem conexão com a internet?',
    a: 'Sim. O Business Syllabus foi desenvolvido com arquitetura offline-first. As simulações matemáticas locais e matrizes funcionam de forma independente. Apenas a sincronização de nuvem e o Assistente IA de negócios necessitam de internet.',
  },
  {
    q: 'O Tutor/Assistente de IA de Negócios pode falhar?',
    a: 'Sim. O tutor IA é um acelerador estratégico educacional e consultivo que pode apresentar imprecisões analíticas. Sempre valide os números gerados com seu planejamento financeiro e práticas de governança oficiais.',
  },
  {
    q: 'Como excluo minha conta permanentemente?',
    a: 'No final desta página, clique em "Excluir minha conta". O processo possui dupla confirmação de segurança e remove todos os seus dados de progresso de forma definitiva e irrecuperável.',
  },
  {
    q: 'Como envio sugestões ou reporto um erro técnico?',
    a: 'Você pode enviar diretamente sua avaliação no NPS Interativo localizado nesta página ou abrir um chamado rápido no botão "Abrir Chamado Helpdesk". Alternativamente, envie para erbusiness0422@gmail.com.',
  },
]

function AjudaModal({ onClose, onOpenSupport }: { onClose: () => void; onOpenSupport: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-[1.4rem] border border-white/10 p-5"
        style={{ background: 'linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(8,8,8,0.99) 100%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Ajuda e Suporte</p>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X className="h-4 w-4" /></button>
        </div>

        <div className="max-h-[62vh] space-y-4 overflow-y-auto pr-1">

          {/* Status do sistema */}
          <div className="flex items-center gap-2 rounded-[0.8rem] ipb-soft px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <p className="text-[8px] text-white/50">Sistema operacional ativo</p>
          </div>

          {/* FAQ — accordion */}
          <div>
            <p className="mb-2 text-[8px] font-semibold uppercase tracking-wider text-white/40">Perguntas Frequentes</p>
            <div className="space-y-1.5">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="rounded-[0.8rem] ipb-soft overflow-hidden">
                  <button
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <p className="text-[9px] font-semibold text-white/65 pr-2">{item.q}</p>
                    <ChevronRight className={`h-3 w-3 shrink-0 text-white/30 transition-transform ${openIndex === i ? 'rotate-90' : ''}`} />
                  </button>
                  {openIndex === i && (
                    <p className="px-3 pb-2.5 text-[8px] leading-relaxed text-white/40">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div>
            <p className="mb-2 text-[8px] font-semibold uppercase tracking-wider text-white/40">Falar com o Suporte</p>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  onClose()
                  onOpenSupport()
                }}
                className="flex w-full items-center gap-2 rounded-[0.8rem] ipb-soft px-3 py-2.5 hover:bg-white/[0.04] text-left"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-white/40" />
                <div>
                  <p className="text-[9px] font-medium text-white/60">Abrir Chamado Helpdesk</p>
                  <p className="text-[8px] text-white/35">Abra um chamado de suporte técnico rápido direto pelo app.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Documentos legais */}
          <div>
            <p className="mb-2 text-[8px] font-semibold uppercase tracking-wider text-white/40">Documentos Legais</p>
            <div className="grid grid-cols-3 gap-1.5">
              {['Termos de Uso', 'Políticas', 'Compliance'].map((doc) => (
                <div key={doc} className="rounded-[0.7rem] ipb-soft px-2 py-2 text-center">
                  <p className="text-[8px] text-white/45">{doc}</p>
                  <p className="text-[7px] text-white/25 mt-0.5">Home → Governança</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
