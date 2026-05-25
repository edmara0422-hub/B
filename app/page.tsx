"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#050505',
      color: '#f4f4f6',
      fontFamily: '"Poppins", system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem'
    }}>
      {/* Fundo minimalista com glow sutil */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(210,175,90,0.05) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 1, maxWidth: '800px', textAlign: 'center' }}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{
            fontSize: '0.85rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#d2af5a',
            marginBottom: '1.5rem',
            fontWeight: 500
          }}
        >
          Intelligence Platform Business
        </motion.div>
        
        <h1 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: 300,
          lineHeight: 1.1,
          marginBottom: '2rem',
          letterSpacing: '-0.02em'
        }}>
          Elevando o Padrão da <br />
          <span style={{ fontStyle: 'italic', color: '#c8cdd7' }}>Saúde com Inteligência</span>
        </h1>

        <p style={{
          fontSize: '1.1rem',
          lineHeight: 1.6,
          color: 'rgba(244,244,246,0.78)',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          fontWeight: 300
        }}>
          Uma plataforma integral projetada para conectar educação de excelência, cálculos clínicos automatizados por IA e gestão hospitalar de alto nível. Criada para transformar a tomada de decisão à beira do leito.
        </p>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '1.5rem 0',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>
            Idealizado e Liderado por
          </span>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', color: '#fff' }}>
            Edmara Rocha
          </span>
          <span style={{ fontSize: '0.85rem', color: '#d2af5a', marginTop: '0.2rem' }}>
            Liderança em Fisioterapia & Gestão
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/design-space')}
          style={{
            background: 'linear-gradient(135deg, #d2af5a 0%, #8a7034 100%)',
            color: '#050505',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '100px',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            letterSpacing: '0.05em',
            boxShadow: '0 10px 30px rgba(210,175,90,0.2)'
          }}
        >
          Explorar a Plataforma
        </motion.button>
      </motion.div>
    </div>
  );
}
