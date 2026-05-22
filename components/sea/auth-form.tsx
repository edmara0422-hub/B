'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, User, Mail, Lock, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '@/lib/stores/authStore'

export function AuthForm() {
  const router = useRouter()
  const { signIn, signUp, signInWithGoogle, resetPassword, isLoading } = useAuthStore()
  const [googleLoading, setGoogleLoading] = useState(false)
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('confirmed') === '1') {
      setSuccess('Email confirmado! Agora faca login com sua senha.')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (mode === 'forgot') {
      if (!formData.email) { setError('Informe seu email.'); return }
      const result = await resetPassword(formData.email)
      if (result.error) { setError(result.error); return }
      setSuccess('Email de recuperacao enviado. Verifique sua caixa de entrada.')
      return
    }

    if (!formData.email || !formData.password) { setError('Preencha todos os campos.'); return }

    if (mode === 'login') {
      const result = await signIn(formData.email, formData.password)
      if (result.error) { setError(result.error); return }
      router.push('/sea')
    } else {
      if (!formData.name) { setError('Informe seu nome.'); return }
      if (formData.password.length < 6) { setError('Senha deve ter no minimo 6 caracteres.'); return }
      if (!consent) { setError('Aceite os termos de uso e politica de privacidade para continuar.'); return }
      const result = await signUp(formData.email, formData.password, formData.name)
      if (result.error) { setError(result.error); return }
      setSuccess('Conta criada com sucesso. Verifique seu email para confirmar.')
    }
  }

  return (
    <div className="min-h-screen bg-[#010101] flex flex-col items-center justify-center px-6 py-10">
      {/* Logo */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white tracking-wider">IPB</h1>
        <p className="text-[8px] tracking-[0.2em] text-white/40 mt-1 uppercase">
          Intelligence Platform Business
        </p>
      </motion.div>

      {/* Auth Card */}
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="glass rounded-2xl p-6">
          {/* Mode toggle */}
          {mode !== 'forgot' ? (
            <div className="flex gap-1 p-0.5 glass-strong rounded-lg mb-6">
              <button
                onClick={() => { setMode('login'); setError(''); setSuccess('') }}
                className={`flex-1 py-2 rounded-md text-[8px] font-semibold uppercase tracking-[0.14em] transition-all ${mode === 'login' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                Entrar
              </button>
              <button
                onClick={() => { setMode('signup'); setError(''); setSuccess('') }}
                className={`flex-1 py-2 rounded-md text-[8px] font-semibold uppercase tracking-[0.14em] transition-all ${mode === 'signup' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                Cadastrar
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setMode('login'); setError(''); setSuccess('') }}
              className="mb-4 flex items-center gap-1 text-[8px] text-white/50 hover:text-white/70"
            >
              <ArrowLeft className="h-3 w-3" />
              Voltar ao login
            </button>
          )}

          {/* Error/Success messages */}
          {error && (
            <div className="mb-4 rounded-lg border border-[#f8717130] bg-[#f8717108] px-3 py-2">
              <p className="text-[8px] text-[#fca5a5]">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg border border-[#4ade8030] bg-[#4ade8008] px-3 py-2">
              <p className="text-[8px] text-[#86efac]">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name (signup only) */}
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 pl-9 pr-3 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-10 pl-9 pr-3 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all"
              />
            </div>

            {/* Password (not in forgot mode) */}
            {mode !== 'forgot' && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-10 pl-9 pr-9 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}

            {/* Forgot password link */}
            {mode === 'login' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(''); setSuccess('') }}
                  className="text-[7px] text-white/40 hover:text-white/60 transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            {/* Consent (signup only) */}
            {mode === 'signup' && (
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 accent-white"
                />
                <span className="text-[7px] text-white/40 leading-relaxed">
                  Li e aceito os{' '}
                  <a href="/termos" target="_blank" className="text-white/60 underline hover:text-white/80">Termos de Uso</a>
                  {' '}e a{' '}
                  <a href="/privacidade" target="_blank" className="text-white/60 underline hover:text-white/80">Política de Privacidade</a>
                </span>
              </label>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 mt-2 glass-strong rounded-lg flex items-center justify-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white glow-silver-sm hover:glow-silver transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Criar conta' : 'Enviar email'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          {/* Google OAuth — só mostra em login/signup */}
          {mode !== 'forgot' && (
            <>
              {/* Separador */}
              <div className="relative my-5 flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10))' }} />
                <span className="text-[7px] uppercase tracking-[0.18em] text-white/30">ou continue com</span>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.10), transparent)' }} />
              </div>

              {/* Botão Google — prata premium */}
              <button
                type="button"
                disabled={googleLoading || isLoading}
                onClick={async () => {
                  setGoogleLoading(true)
                  const result = await signInWithGoogle()
                  if (result.error) {
                    setError(result.error)
                    setGoogleLoading(false)
                  }
                  // Se não houver erro, o Supabase redireciona automaticamente
                }}
                className="w-full h-11 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
                }}
              >
                {googleLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {/* Logo Google SVG */}
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span
                      className="text-[9px] font-semibold tracking-[0.10em] uppercase"
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #cbd5e1 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Entrar com Google
                    </span>
                  </>
                )}
              </button>
            </>
          )}
          </form>
        </div>
      </motion.div>
    </div>
  )
}

