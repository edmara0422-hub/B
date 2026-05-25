import React from "react";
import { BackgroundCanvas } from "../../components/ipb/BackgroundCanvas";
import "./design.css";

export default function DesignSpacePage() {
  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundCanvas />
      
      {/* Aqui virá o componente UserProfile no próximo passo */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
        <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: 300, letterSpacing: '0.05em' }}>
          Ambiente em Construção
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
          Iniciando módulos IPB...
        </p>
      </div>
    </main>
  );
}
