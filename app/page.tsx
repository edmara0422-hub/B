"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function IntroPremiumPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050505',
      color: '#f4f4f6',
      fontFamily: 'var(--sans, "Poppins", sans-serif)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glow Backdrop */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120vw',
        height: '120vw',
        maxWidth: '1200px',
        maxHeight: '1200px',
        background: 'radial-gradient(circle, rgba(210,175,90,0.06) 0%, rgba(210,175,90,0.01) 30%, transparent 60%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      
      {/* Faint Grid Overlay for texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `
          linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.015) 18%, transparent 34%),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.008) 0 1px, transparent 1px 120px)`,
        zIndex: 0
      }} />

      {/* Header */}
      <header style={{
        padding: '2rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d2af5a" strokeWidth="1.5">
            <path d="M12 2L2 22h20L12 2z" />
            <path d="M12 2v20" />
            <path d="M6 12h12" />
          </svg>
          <span style={{ 
            fontFamily: 'var(--sans, "Inter", sans-serif)', 
            fontWeight: 400, 
            letterSpacing: '0.3em',
            fontSize: '0.9rem',
            color: '#e5e5e5'
          }}>
            INTELLIGENCE PLATFORM BUSINESS
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
          <span style={{ cursor: 'pointer' }}>Soluções</span>
          <span style={{ cursor: 'pointer' }}>Recursos</span>
          <span style={{ cursor: 'pointer' }}>Empresa</span>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', cursor: 'pointer' }}>Entrar</span>
          <button style={{
            background: 'linear-gradient(135deg, #d2af5a 0%, #8a7034 100%)',
            color: '#000',
            border: 'none',
            padding: '0.6rem 1.5rem',
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            Começar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 10,
        position: 'relative',
        padding: '0 2rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '800px' }}
        >
          <h1 style={{
            fontFamily: 'var(--serif, "Cormorant Garamond", serif)',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: '2rem',
            color: '#fff',
            letterSpacing: '-0.02em'
          }}>
            Elevando o Padrão da <br />
            Saúde com Inteligência
          </h1>

          <p style={{
            fontFamily: 'var(--sans, "Inter", sans-serif)',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: 'rgba(244,244,246,0.7)',
            maxWidth: '650px',
            margin: '0 auto 3.5rem',
            fontWeight: 300
          }}>
            Transformando dados clínicos em conhecimento acionável. Nossa plataforma integral une educação avançada e gestão estratégica baseada em IA para impulsionar a excelência hospitalar e otimizar resultados.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/design-space')}
            style={{
              background: 'linear-gradient(135deg, #d2af5a 0%, #8a7034 100%)',
              color: '#050505',
              border: 'none',
              padding: '1.2rem 3rem',
              borderRadius: '100px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 0 40px rgba(210,175,90,0.25), inset 0 1px 1px rgba(255,255,255,0.4)',
              marginBottom: '5rem'
            }}
          >
            Explorar a Plataforma
          </motion.button>

          {/* Features Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '3rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d2af5a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>Educação Avançada</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d2af5a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <path d="M3 9h18M9 21V9"/>
                <path d="M14 14h2M14 18h2"/>
              </svg>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>Gestão com IA</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d2af5a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>Precisão Clínica</span>
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer style={{
        padding: '2rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        zIndex: 10,
        position: 'relative'
      }}>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
          Idealizado por Edmara Rocha
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          © 2026 INTELLIGENCE PLATFORM BUSINESS. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
