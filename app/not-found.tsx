import Link from 'next/link'

export default function NotFound() {
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
      <p style={{ fontSize: '3rem', fontWeight: 700, color: '#fff', margin: 0 }}>404</p>
      <p style={{ fontSize: '0.875rem', opacity: 0.5, margin: 0 }}>Página não encontrada.</p>
      <Link
        href="/sea"
        style={{
          marginTop: '8px',
          background: 'transparent',
          border: '1px solid #333',
          color: '#C0C0C0',
          padding: '8px 24px',
          borderRadius: '6px',
          fontSize: '0.875rem',
          textDecoration: 'none',
        }}
      >
        Voltar ao início
      </Link>
    </div>
  )
}