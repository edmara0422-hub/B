'use client'

import { useEffect } from 'react'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[SEA] Root error:', error)
  }, [error])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#010101',
      color: '#C0C0C0',
      gap: '16px',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center',
      padding: '24px',
    }}>
      <p style={{ fontSize: '2rem' }}>⚠</p>
      <h2 style={{ color: '#fff', fontSize: '1.125rem', margin: 0 }}>Algo deu errado</h2>
      <p style={{ fontSize: '0.875rem', opacity: 0.5, margin: 0, maxWidth: '320px' }}>
        Ocorreu um erro inesperado. Tente novamente ou recarregue a página.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: '8px',
          background: 'transparent',
          border: '1px solid #333',
          color: '#C0C0C0',
          padding: '8px 24px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Tentar novamente
      </button>
    </div>
  )
}