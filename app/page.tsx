"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./design-space/editorial.css";

export default function BusinessManifestoPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg, #050505)',
      color: 'var(--ink, #f4f4f6)',
      fontFamily: 'var(--sans)',
      paddingBottom: '10vh',
      overflowX: 'hidden'
    }}>
      {/* Header Fixo Minimalista */}
      <header style={{
        padding: '2rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(5,5,5,0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ fontFamily: 'var(--sans)', fontWeight: 500, letterSpacing: '0.2em', fontSize: '0.85rem' }}>
          INTELLIGENCE PLATFORM BUSINESS
        </div>
        <button 
          onClick={() => router.push('/design-space')}
          style={{
            background: 'none',
            border: '1px solid var(--gold)',
            color: 'var(--gold)',
            padding: '0.5rem 1.5rem',
            borderRadius: '100px',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          Acessar Ecossistema
        </button>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Título e Imagem Business */}
        <section style={{ marginTop: '10vh', marginBottom: '15vh', display: 'flex', alignItems: 'center', gap: '4rem' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            style={{ flex: 1 }}
          >
            <h1 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#fff',
              marginBottom: '2rem'
            }}>
              Muito mais que um app.<br/>
              Um motor para <i style={{ color: 'var(--gold)' }}>inovar.</i>
            </h1>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--ink-soft)', fontWeight: 300, maxWidth: '500px' }}>
              A <b>Intelligence Platform Business (IPB)</b> ultrapassa os limites da clínica. Não construímos apenas calculadoras médicas; construímos um ecossistema. É sobre o poder de escalar conhecimento, inovar processos hospitalares e gerar novos negócios em saúde através da tecnologia de ponta.
            </p>
          </motion.div>

          {/* O Cubo "B" de Business */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(210,175,90,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 0
            }} />
            <img 
              src="/business_cube.png" 
              alt="IPB Business Core" 
              style={{ width: '100%', maxWidth: '450px', height: 'auto', zIndex: 1, position: 'relative' }} 
            />
          </motion.div>

        </section>

        {/* Visão de Construção e Inovação */}
        <section style={{ marginBottom: '12vh' }}>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', gap: '4rem' }}>
            <div style={{ flex: '0 0 200px' }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                O Ecossistema IPB
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', fontWeight: 300, marginBottom: '1.5rem', color: '#fff' }}>
                A Fundação para o Futuro.
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--ink-soft)', fontWeight: 300 }}>
                O mercado não precisa de mais um aplicativo isolado. O mercado precisa de uma fundação tecnológica onde educação avançada (M1 a M8), inteligência artificial preditiva e inteligência de negócios convirjam perfeitamente.
                <br/><br/>
                O IPB foi arquitetado para ser essa fundação. Cada linha de código, desde o Scan IA até o ambiente de simulação 3D, foi projetada não apenas para resolver a dor do plantão de hoje, mas para permitir que instituições de saúde <b>construam, dimensionem e inovem</b> a medicina de amanhã.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: 'center', marginTop: '15vh' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '3rem', fontWeight: 300, marginBottom: '2rem', color: '#fff' }}>
            Descubra o potencial da plataforma.
          </h2>
          <button 
            onClick={() => router.push('/design-space')}
            style={{
              background: 'linear-gradient(135deg, #d2af5a 0%, #8a7034 100%)',
              color: '#050505',
              border: 'none',
              padding: '1.2rem 3rem',
              borderRadius: '100px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Explorar Vitrine Interativa
          </button>
        </section>

      </main>
    </div>
  );
}
