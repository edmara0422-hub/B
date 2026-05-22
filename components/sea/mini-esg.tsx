'use client'

export function MiniEsg() {
  return (
    <>
      <div className="header-esg">
        <div className="seal">✦</div>
        <div>
          <span>Compliance &amp; ESG</span>
          <b>Sustentabilidade <em>&amp; Gov</em></b>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', margin: '12px 0' }}>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', padding: '10px', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}>
          Nenhuma avaliação ainda<br />
          <span style={{ color: '#d4b87a', fontSize: '9px' }}>Seja o primeiro a avaliar →</span>
        </div>
      </div>
      <div className="ods-row">
        <span><b>03</b>Saúde</span>
        <span><b>04</b>Educ.</span>
        <span><b>09</b>Inov.</span>
      </div>
      <div className="features-strip">
        <div className="feat-pill gold"><div className="d" />Offline-First</div>
        <div className="feat-pill gold"><div className="d" />Pegada digital</div>
      </div>
    </>
  )
}
