'use client'

import { useEffect } from 'react'

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[SEA] Main area error:', error)
  }, [error])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '60vh',
      color: '#C0C0C0',
      gap: '12px',
      textAlign: 'center',
      padding: '24px',
    }}>
      <p style={{ fontSize: '1.5rem' }}>⚠</p>
      <h2 style={{ color: '#fff', fontSize: '1rem', margin: 0 }}>Erro ao carregar esta seção</h2>
      <p style={{ fontSize: '0.8125rem', opacity: 0.5, margin: 0, maxWidth: '280px' }}>
        Tente novamente ou navegue para outra área.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: '8px',
          background: 'transparent',
          border: '1px solid #333',
          color: '#C0C0C0',
          padding: '6px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.8125rem',
        }}
      >
        Tentar novamente
      </button>
    </div>
  )
}