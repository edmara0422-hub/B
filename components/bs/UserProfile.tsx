"use client";
import React from "react";
import { motion } from "framer-motion";

export function UserProfile() {
  return (
    <div style={{
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      padding: '2rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          background: 'rgba(20, 20, 25, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '3rem',
          maxWidth: '800px',
          width: '100%',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d2af5a 0%, #8a7034 100%)',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#fff',
              fontWeight: 300,
              boxShadow: '0 0 40px rgba(210, 175, 90, 0.3)'
            }}
          >
            ER
          </motion.div>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 200, 
            letterSpacing: '-0.02em',
            margin: '0 0 0.5rem 0',
            fontFamily: 'var(--serif)'
          }}>
            Edmara Rocha
          </h1>
          <p style={{ 
            color: 'var(--gold)', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            fontSize: '0.85rem',
            fontWeight: 500
          }}>
            Liderança em Fisioterapia & Gestão
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          {/* Coluna 1: Graduações */}
          <div>
            <h3 style={{ 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              color: 'rgba(255,255,255,0.4)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              Graduação
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 400 }}>Fisioterapia</h4>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Primeira Graduação</p>
            </div>
            
            <div>
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 400 }}>Interdisciplinary Business</h4>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Segunda Graduação (Em andamento)</p>
            </div>
          </div>

          {/* Coluna 2: Especializações */}
          <div>
            <h3 style={{ 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              color: 'rgba(255,255,255,0.4)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              Pós-Graduação & Especialização
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 400 }}>Fisio. Cardiopulmonar e Terapia Intensiva</h4>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Primeira Pós-Graduação</p>
            </div>
            
            <div>
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 400 }}>Cardiologia</h4>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>Segunda Pós-Graduação</p>
            </div>
          </div>

        </div>

        {/* Certificações */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              color: 'rgba(255,255,255,0.4)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              Certificações Avançadas
            </h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['ACLS', 'Ventilação Mecânica Avançada', 'Intensivismo', 'Gestão de Saúde'].map(cert => (
                <div key={cert} style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  {cert}
                </div>
              ))}
            </div>
        </div>

      </motion.div>
    </div>
  );
}
