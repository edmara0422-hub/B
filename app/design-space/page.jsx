"use client";
// @ts-nocheck
import { motion } from "framer-motion";
import React, { useState, useEffect, useCallback, useRef, useMemo, useLayoutEffect, Fragment } from "react";
import "./editorial.css";

// Inject Lucide React icons manually to replace inline ones if needed, 
// or keep their custom inline SVG logic below.
// ──────────────────────────────────────────────────────────────────────────────
// IPB app screens — rendered inside the iPhone, real tokens from the repo
// ──────────────────────────────────────────────────────────────────────────────

// Lucide-style inline SVG icons (matching lucide-react stroke style)
const icon = (path, size = 14) =>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{path}</svg>;

const IconUser = ({ s = 14 }) => icon(<><circle cx="12" cy="7" r="4" /><path d="M5 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" /></>, s);
const IconMail = ({ s = 14 }) => icon(<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></>, s);
const IconLock = ({ s = 14 }) => icon(<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>, s);
const IconEye = ({ s = 14 }) => icon(<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>, s);
const IconArrow = ({ s = 14 }) => icon(<path d="M5 12h14M13 5l7 7-7 7" />, s);
const IconBack = ({ s = 14 }) => icon(<path d="M19 12H5M12 19l-7-7 7-7" />, s);
const IconBell = ({ s = 14 }) => icon(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>, s);

function AppLanding() {
  const constRef = React.useRef(null);
  const orbRef = React.useRef(null);

  // Constellation: 24 particles (22% gold) with connection lines
  React.useEffect(() => {
    const canvas = constRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    const w = parent.clientWidth,h = parent.clientHeight;
    canvas.width = w;canvas.height = h;
    const N = 24,CONN2 = 95 * 95;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.04,
      r: Math.random() * 1.4 + 0.5,
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.005,
      gold: Math.random() < 0.22
    }));
    let raf,last = 0;
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 60) return;last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.6;
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x,dy = pts[i].y - pts[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < CONN2) {
          const alpha = (1 - Math.sqrt(d2) / 150) * 0.18;
          const isGold = pts[i].gold || pts[j].gold;
          ctx.strokeStyle = isGold ? `rgba(224,185,80,${alpha.toFixed(3)})` : `rgba(210,215,225,${alpha.toFixed(3)})`;
          ctx.beginPath();ctx.moveTo(pts[i].x, pts[i].y);ctx.lineTo(pts[j].x, pts[j].y);ctx.stroke();
        }
      }
      for (const p of pts) {
        p.x += p.vx;p.y += p.vy;p.a += p.va;
        if (p.a < 0.05) p.a = 0.85;
        if (p.a > 1) p.a = 0.15;
        if (p.x < 0) p.x = w;if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;if (p.y > h) p.y = 0;
        const size = p.r * 2;
        if (p.gold) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224,185,80,${(p.a * 0.18).toFixed(3)})`;ctx.fill();
        }
        ctx.beginPath();ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(255,210,120,${p.a.toFixed(3)})` : `rgba(220,225,235,${p.a.toFixed(3)})`;
        ctx.fill();
      }
    };
    requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Orb canvas — ambient (no progress)
  React.useEffect(() => {
    const canvas = orbRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = 240;
    canvas.width = size;canvas.height = size;
    canvas.style.width = `${size}px`;canvas.style.height = `${size}px`;
    const cx = size / 2,cy = size / 2;
    const baseR = size * 0.38;
    let t = 0,raf;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      t += 0.008;
      const breathe = 1 + Math.sin(t * 1.5) * 0.04;
      const r = baseR * breathe;
      const glow = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 1.6);
      glow.addColorStop(0, "rgba(200,200,200,0.06)");
      glow.addColorStop(0.5, "rgba(150,150,150,0.02)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;ctx.fillRect(0, 0, size, size);
      const og = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.05, cx, cy, r);
      og.addColorStop(0, "rgba(255,255,255,0.14)");
      og.addColorStop(0.5, "rgba(150,150,150,0.05)");
      og.addColorStop(1, "rgba(60,60,60,0.01)");
      ctx.beginPath();ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = og;ctx.fill();
      ctx.beginPath();ctx.arc(cx, cy, r * 0.94, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.05 + Math.sin(t * 2.5) * 0.04})`;
      ctx.lineWidth = 0.8;ctx.stroke();
      ctx.beginPath();ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(210,175,90,${0.04 + Math.sin(t * 1.8) * 0.03})`;
      ctx.lineWidth = 0.5;ctx.stroke();
      for (let i = 0; i < 8; i++) {
        const angle = t * (0.5 + i * 0.08) + i * Math.PI * 2 / 8;
        const orbitR = r * (1.05 + i * 0.05);
        const px = cx + Math.cos(angle) * orbitR;
        const py = cy + Math.sin(angle) * orbitR * 0.88;
        const ps = 1 + Math.sin(t * 3 + i) * 0.5;
        const alpha = 0.14 + Math.sin(t * 2 + i) * 0.08;
        ctx.beginPath();ctx.arc(px, py, ps, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? `rgba(224,184,94,${alpha})` : `rgba(220,220,220,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="s-splash-root">
      {/* CAMADA 1: Constelações */}
      <canvas ref={constRef} className="s-splash-const" />

      {/* CAMADA 2: Halos pulsantes + raios + grade */}
      <div className="s-splash-halos">
        <div className="halo-gold"></div>
        <div className="halo-silver"></div>
        <div className="ray gold" style={{ left: "12%" }}></div>
        <div className="ray silver" style={{ left: "34%" }}></div>
        <div className="ray gold" style={{ left: "58%" }}></div>
        <div className="ray silver" style={{ left: "78%" }}></div>
        <div className="grid-overlay"></div>
      </div>

      {/* CAMADA 3: Orb central */}
      <canvas ref={orbRef} className="s-splash-orb" />

      {/* CAMADA 4: Logo IPB + subtítulo */}
      <div className="s-splash-text">
        <h1 className="s-splash-title">IPB</h1>
        <p style={{ width: "80px", lineHeight: "1.4", fontWeight: "200", letterSpacing: "2.2px" }}>Sistema de Estudo Avançado</p>
      </div>
    </div>);

}

function AppCadastro() {
  return (
    <div className="app-bg">
      <div className="s-auth">
        <div className="s-auth-brand">
          <h1>IPB</h1>
          <p>Sistema de Estudo Avancado</p>
        </div>
        <div className="s-auth-card">
          <div className="s-auth-tabs" data-tour="tabs">
            <span>Entrar</span>
            <span className="on">Cadastrar</span>
          </div>
          <div className="s-auth-field" data-tour="nome">
            <span className="ic"><IconUser /></span>
            <input readOnly value="Seu nome" className="placeholder" />
          </div>
          <div className="s-auth-field" data-tour="email">
            <span className="ic"><IconMail /></span>
            <input readOnly value="Email" className="placeholder" />
          </div>
          <div className="s-auth-field" data-tour="senha">
            <span className="ic"><IconLock /></span>
            <input readOnly value="Senha" className="placeholder" />
            <span className="ic ic-right"><IconEye /></span>
          </div>
          <label className="s-auth-consent" data-tour="termos">
            <input type="checkbox" checked readOnly />
            <span>Li e aceito os <u>Termos de Uso</u> e a <u>Política de Privacidade</u></span>
          </label>
          <button className="s-auth-cta" data-tour="criar">
            Criar conta <IconArrow />
          </button>
        </div>
      </div>
    </div>);

}

function AppConfirm() {
  return (
    <div className="app-bg">
      <div className="s-confirm">
        <div className="s-confirm-icon">✉</div>
        <div className="s-confirm-success">• Conta criada</div>
        <h1><span className="shim">Acesse<br />seu e-mail.</span></h1>
        <p>O <b>Supabase</b> acabou de enviar um link de confirmação. Abra seu e-mail, <b>clique no link</b>, e depois volte aqui para fazer login.</p>
        <div className="s-confirm-hint">
          <span className="ic">⌕</span>
          <span>Não esqueça de olhar no spam — primeiro motivo de ticket no suporte.</span>
        </div>
      </div>
    </div>);

}

function AppLogin() {
  return (
    <div className="app-bg">
      <div className="s-auth">
        <div className="s-auth-brand">
          <h1>IPB</h1>
          <p>Sistema de Estudo Avançado</p>
        </div>
        <div className="s-auth-card">
          <div className="s-auth-tabs">
            <span className="on">Entrar</span>
            <span>Cadastrar</span>
          </div>
          <div className="s-auth-success">Email confirmado! Agora faça login.</div>
          <div className="s-auth-field">
            <span className="ic"><IconMail /></span>
            <input readOnly value="Email" className="placeholder" />
          </div>
          <div className="s-auth-field">
            <span className="ic"><IconLock /></span>
            <input readOnly value="Senha" className="placeholder" />
            <span className="ic ic-right"><IconEye /></span>
          </div>
          <a className="s-auth-link">Esqueceu a senha?</a>
          <button className="s-auth-cta" data-tour="entrar-cta">
            Entrar <IconArrow />
          </button>
        </div>
      </div>
    </div>);

}

function AppSplash() {
  const constRef = React.useRef(null);
  const orbRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);

  // Quartic progress (loops for the tour preview)
  React.useEffect(() => {
    let raf;
    let start;
    const ease = (v) => 1 - Math.pow(1 - v, 4);
    const tick = (ts) => {
      if (!start) start = ts;
      const r = Math.min((ts - start) / 3500, 1);
      setProgress(ease(r) * 100);
      if (r < 1) raf = requestAnimationFrame(tick);else
      setTimeout(() => {start = null;raf = requestAnimationFrame(tick);}, 1200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Constellation: 24 particles (22% gold) with connection lines
  React.useEffect(() => {
    const canvas = constRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    const w = parent.clientWidth,h = parent.clientHeight;
    canvas.width = w;canvas.height = h;
    const N = 24,CONN2 = 95 * 95;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.04,
      r: Math.random() * 1.4 + 0.5,
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.005,
      gold: Math.random() < 0.22
    }));
    let raf,last = 0;
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 60) return;last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.6;
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x,dy = pts[i].y - pts[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < CONN2) {
          const alpha = (1 - Math.sqrt(d2) / 150) * 0.18;
          const isGold = pts[i].gold || pts[j].gold;
          ctx.strokeStyle = isGold ?
          `rgba(224,185,80,${alpha.toFixed(3)})` :
          `rgba(210,215,225,${alpha.toFixed(3)})`;
          ctx.beginPath();ctx.moveTo(pts[i].x, pts[i].y);ctx.lineTo(pts[j].x, pts[j].y);ctx.stroke();
        }
      }
      for (const p of pts) {
        p.x += p.vx;p.y += p.vy;p.a += p.va;
        if (p.a < 0.05) p.a = 0.85;
        if (p.a > 1) p.a = 0.15;
        if (p.x < 0) p.x = w;if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;if (p.y > h) p.y = 0;
        const size = p.r * 2;
        if (p.gold) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224,185,80,${(p.a * 0.18).toFixed(3)})`;ctx.fill();
        }
        ctx.beginPath();ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(255,210,120,${p.a.toFixed(3)})` : `rgba(220,225,235,${p.a.toFixed(3)})`;
        ctx.fill();
      }
    };
    requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Orb canvas
  React.useEffect(() => {
    const canvas = orbRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = 240;
    canvas.width = size;canvas.height = size;
    canvas.style.width = `${size}px`;canvas.style.height = `${size}px`;
    const cx = size / 2,cy = size / 2;
    const baseR = size * 0.38;
    let t = 0,raf;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      t += 0.01;
      const expand = 1 + progress / 100 * 0.15;
      const breathe = 1 + Math.sin(t * 1.5) * 0.04;
      const r = baseR * breathe * expand;
      const glow = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 1.6);
      glow.addColorStop(0, `rgba(200,200,200,${0.04 + progress / 100 * 0.06})`);
      glow.addColorStop(0.5, "rgba(150,150,150,0.02)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;ctx.fillRect(0, 0, size, size);
      const og = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.05, cx, cy, r);
      og.addColorStop(0, `rgba(255,255,255,${0.12 + progress / 100 * 0.1})`);
      og.addColorStop(0.5, "rgba(150,150,150,0.05)");
      og.addColorStop(1, "rgba(60,60,60,0.01)");
      ctx.beginPath();ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = og;ctx.fill();
      ctx.beginPath();ctx.arc(cx, cy, r * 0.94, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.05 + Math.sin(t * 2.5) * 0.04})`;
      ctx.lineWidth = 0.8;ctx.stroke();
      for (let i = 0; i < 8; i++) {
        const angle = t * (0.6 + i * 0.1) + i * Math.PI * 2 / 8;
        const orbitR = r * (1.05 + i * 0.05);
        const px = cx + Math.cos(angle) * orbitR;
        const py = cy + Math.sin(angle) * orbitR * 0.88;
        const ps = 1 + Math.sin(t * 3 + i) * 0.6;
        const alpha = 0.12 + Math.sin(t * 2 + i) * 0.08 + progress / 100 * 0.1;
        ctx.beginPath();ctx.arc(px, py, ps, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,220,220,${alpha})`;ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <div className="s-splash-root">
      {/* CAMADA 1: Constelações */}
      <canvas ref={constRef} className="s-splash-const" />

      {/* CAMADA 2: Halos pulsantes + raios + grade */}
      <div className="s-splash-halos">
        <div className="halo-gold"></div>
        <div className="halo-silver"></div>
        <div className="ray gold" style={{ left: "12%" }}></div>
        <div className="ray silver" style={{ left: "34%" }}></div>
        <div className="ray gold" style={{ left: "58%" }}></div>
        <div className="ray silver" style={{ left: "78%" }}></div>
        <div className="grid-overlay"></div>
      </div>

      {/* CAMADA 3: Orb central */}
      <canvas ref={orbRef} className="s-splash-orb" />

      {/* CAMADA 4: Logo IPB + subtítulo */}
      <div className="s-splash-text">
        <h1 className="s-splash-title">IPB</h1>
        <p style={{ fontWeight: "500", textAlign: "center", lineHeight: "8", letterSpacing: "0px", height: "33px", width: "55px" }}>Sistema de Estudo Avançado</p>
      </div>

      {/* CAMADA 5: Progress bar */}
      <div className="s-splash-bar"><div style={{ width: `${progress}%` }}></div></div>
    </div>);

}

function AppTopBar() {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hour = now.getHours();
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  const isDay = hour >= 6 && hour < 18;
  const months = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
  const dateLabel = `${String(now.getDate()).padStart(2,"0")}.${months[now.getMonth()]}.${now.getFullYear()}`;

  return (
    <header className="app-top" data-tour="topbar">
      <div className="app-top-mark">IPB</div>
      <div className="app-top-center">
        <div className="app-top-greet">
          <span className="ico">{isDay ? "☀" : "☾"}</span>
          {greeting}, Edmara
        </div>
        <span className="app-top-date">{dateLabel}</span>
      </div>
      <div className="app-top-icons" data-tour="icons">
        <div className="app-top-zoom">
          <button>A−</button>
          <button>A+</button>
        </div>
        <button className="app-top-bell">
          <IconBell s={11}/>
          <span className="badge">3</span>
        </button>
        <button className="app-top-user">
          <IconUser s={11}/>
        </button>
      </div>
    </header>);

}

function AppNav({ active }) {
  return (
    <nav className="app-nav" data-tour="nav">
      <button className={active === "home" ? "on" : ""} data-tour="nav-home">⌂ HOME</button>
      <button className={active === "explore" ? "on" : ""} data-tour="nav-explore">◈ EXPLORAR</button>
    </nav>);

}

function NeuroVitals() {
  const [sys, setSys] = React.useState(120);
  const [dia, setDia] = React.useState(94);
  const [pul, setPul] = React.useState(72);
  React.useEffect(() => {
    const t1 = setInterval(() => setSys(120 + Math.round((Math.random()-0.5)*6)), 2200);
    const t2 = setInterval(() => setDia(94 + Math.round((Math.random()-0.5)*4)), 2800);
    const t3 = setInterval(() => setPul(72 + Math.round((Math.random()-0.5)*8)), 1600);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);
  return (
    <div className="s-sim-vitals">
      <div className="vrow"><span className="vl">SYS.</span><span className="vv">{sys}</span><span className="vu">mmHg</span></div>
      <div className="vrow"><span className="vl">DIA.</span><span className="vv">{dia}</span><span className="vu">mmHg</span></div>
      <div className="vrow"><span className="vl">Pul.</span><span className="vv">{pul}</span><span className="vu">/min</span></div>
    </div>
  );
}

function EEGWave() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0, raf, last = 0;
    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 33) return; last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width, h = canvas.height;
      for (let pass = 0; pass < 2; pass++) {
        ctx.strokeStyle = pass === 0 ? "rgba(45,212,191,0.75)" : "rgba(45,212,191,0.28)";
        ctx.lineWidth = pass === 0 ? 1.3 : 0.9;
        ctx.beginPath();
        for (let x = 0; x <= w; x++) {
          const t = x / w, f = pass === 0 ? 1 : 1.7;
          const y = h/2
            + Math.sin(t * 8 * f + frame * (0.05 + pass * 0.03)) * 4
            + Math.sin(t * 20 * f + frame * 0.10) * 2
            + Math.sin(t * 3 - frame * 0.03) * 3;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      frame++;
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} width={100} height={22} className="s-sim-eeg"/>;
}


// ── Governance modal content ─────────────────────────────────────────────
const GOV_CONTENT = {
  missao: {
    title: "Missão, Visão e Valores",
    sections: [
      { heading: "Missão", items: [
        "Capacitar profissionais do INTELLIGENCE PLATFORM BUSINESS intensivistas com tecnologia de ponta, tornando o conhecimento clínico complexo acessível, aplicável e seguro à beira do leito",
        "Reduzir a distância entre a evidência científica e a prática clínica diária, em qualquer hospital, de qualquer região do Brasil",
        "Ser o sistema de estudo mais completo, confiável e humanizado para INTELLIGENCE PLATFORM BUSINESS em terapia intensiva",
      ]},
      { heading: "Visão", items: [
        "Ser a plataforma de referência em educação clínica para profissionais do INTELLIGENCE PLATFORM BUSINESS intensivistas na América Latina até 2030",
        "Contribuir para que zero pacientes sejam prejudicados por falta de preparo técnico de seus cuidadores",
        "Democratizar o acesso ao conhecimento, eliminando barreiras geográficas, econômicas e institucionais",
        "Liderar a transformação digital da INTELLIGENCE PLATFORM BUSINESS hospitalar com inovação responsável e ética",
      ]},
      { heading: "Valores", items: [
        "Excelência clínica — conteúdo fundamentado em evidências de alto nível",
        "Segurança do paciente — cada funcionalidade pensa no desfecho clínico",
        "Inclusão e equidade — acesso igualitário independente de onde está",
        "Transparência — honestidade sobre limitações e incertezas",
        "Inovação com propósito — tecnologia a serviço da vida",
        "Responsabilidade ambiental — zero papel, pegada de carbono mínima",
        "Colaboração — crescemos com quem usa e constrói o IPB",
      ]},
    ],
  },
  politicas: {
    title: "Políticas IPB INTELLIGENCE PLATFORM BUSINESS",
    sections: [
      { heading: "4 Pilares da Governança Digital", items: [
        "Responsabilização — cada decisão de produto tem responsável identificável; rastreabilidade total via Git",
        "Transparência — políticas em linguagem acessível; sem cláusulas ocultas ou dark patterns",
        "Equidade e Inclusão — acesso igualitário ao conhecimento clínico",
        "Segurança e Conformidade — LGPD, COFFITO, OWASP Top 10, ISO 27001",
      ]},
      { heading: "Privacidade e Proteção de Dados (LGPD)", items: [
        "Lei nº 13.709/2018 — princípio de minimização de dados",
        "Nenhum PII de pacientes coletado, armazenado ou transmitido a servidores externos",
        "Dados clínicos permanecem exclusivamente no dispositivo (localStorage sandboxed)",
        "Prontuário IPB é ferramenta de apoio ao raciocínio — não é PEP (Resolução CFM 1.638/2002)",
        "Direito ao esquecimento: exclusão permanente sem justificativa, a qualquer momento",
        "Sem compartilhamento com terceiros, parceiros ou para marketing",
      ]},
      { heading: "Sustentabilidade Corporativa", items: [
        "Triple Bottom Line (TBL): Social, Ambiental, Econômico em toda decisão",
        "Agenda 2030 da ONU — ODS 3, 4, 9, 10, 12",
        "Modelo CSV de Porter & Kramer aplicado",
        "Offline-first para reduzir consumo energético de servidores",
        "Meta: neutralização de carbono digital até 2027",
      ]},
      { heading: "Inclusão, Diversidade e Equidade", items: [
        "Desenho Universal — acessibilidade desde a concepção",
        "Cocriação com profissionais de diferentes regiões e níveis",
        "Canal anônimo e confidencial para denúncias",
        "Linguagem inclusiva em todos os materiais",
        "Avaliação de vieses algorítmicos na IA tutor",
      ]},
    ],
  },
  praticas: {
    title: "Práticas IPB INTELLIGENCE PLATFORM BUSINESS",
    sections: [
      { heading: "Segurança do Paciente", items: [
        "Cálculos validados: driving pressure (Amato 2015), RSBI (Yang & Tobin 1991), P/F (Berlin 2012)",
        "Alertas para intubação >7 dias com sugestão de traqueostomia (AMIB)",
        "Detecção automática de elegibilidade para desmame (10 critérios)",
        "Classificação automática de SDRA pela P/F",
        "Mechanical power com alerta para ventilação lesiva (>17 J/min)",
        "Driving pressure com alerta para valores >15 cmH₂O",
        "Histórico completo de condução ventilatória",
        "Detecção de assincronia pelas curvas em tempo real",
      ]},
      { heading: "Educação Baseada em Evidências", items: [
        "Guidelines: AMIB, SBPT, ATS, ERS, ESICM, AARC",
        "Simulações 3D de órgãos reais (pulmão, coração, cérebro)",
        "IA tutor com raciocínio INTELLIGENCE PLATFORM BUSINESSpatológico, não definições",
        "Curvas P×t, F×t, V×t em tempo real",
        "Loops P×V e F×V com análise de histerese, WOB",
        "Calculadoras: peso ideal, VC, complacência, resistência, MRC, PERME, IMS",
      ]},
      { heading: "Prevenção de Infecção", items: [
        "Zero papel = elimina vetor de transmissão por contato",
        "Substitui pranchetas compartilhadas (fômite)",
        "ANVISA RDC 36/2013 e CCIH — precauções de contato",
        "Contribui para indicadores de prevenção de IRAS",
      ]},
    ],
  },
  compliance: {
    title: "Compliance IPB INTELLIGENCE PLATFORM BUSINESS",
    sections: [
      { heading: "Legislação Brasileira", items: [
        "LGPD — Lei 13.709/2018",
        "Marco Civil da Internet — Lei 12.965/2014",
        "CDC — Lei 8.078/1990",
        "Lei Anticorrupção — Lei 12.846/2013",
        "Estatuto da Pessoa com Deficiência — Lei 13.146/2015",
      ]},
      { heading: "Regulamentação Profissional", items: [
        "COFFITO — Código de Ética (Resolução 424/2013)",
        "COFFITO 516/2020 — Teleconsulta",
        "CFM 1.638/2002 — Definição de PEP (IPB não é PEP)",
        "ANVISA RDC 36/2013 — Segurança do paciente",
        "NR 32 — Saúde no trabalho em saúde",
      ]},
      { heading: "Segurança Técnica", items: [
        "OWASP Top 10: XSS, injection, CSRF",
        "TLS 1.3 em comunicações externas",
        "Content Security Policy (CSP)",
        "Armazenamento local sandboxed",
        "Auditoria contínua de dependências",
      ]},
    ],
  },
  termos: {
    title: "Termos de Uso",
    sections: [
      { heading: "Aceitação", items: [
        "Ao acessar o IPB, o usuário aceita integralmente estes Termos",
        "Uso destinado a profissionais do INTELLIGENCE PLATFORM BUSINESS e estudantes supervisionados",
        "Vedado a menores de 18 anos sem supervisão",
        "Aceite revogável via exclusão de conta",
      ]},
      { heading: "Limitações de Responsabilidade", items: [
        "IPB é ferramenta de APOIO — não substitui julgamento clínico",
        "Decisões clínicas são responsabilidade EXCLUSIVA do profissional",
        "Cálculos baseados em literatura, interpretar com quadro clínico",
      ]},
      { heading: "Propriedade Intelectual", items: [
        "Conteúdo propriedade exclusiva do IPB (Lei 9.610/1998)",
        "Reprodução requer autorização prévia",
      ]},
    ],
  },
  cookies: {
    title: "Política de Cookies",
    sections: [
      { heading: "Cookies essenciais", items: [
        "Autenticação e sessão",
        "Acessibilidade (zoom, modo escuro)",
        "Estado do plantão para limpeza LGPD",
      ]},
      { heading: "Análise (anônimos)", items: [
        "Métricas agregadas para melhoria",
        "Sem identificação pessoal",
        "Sem compartilhamento com terceiros",
      ]},
    ],
  },
  dpo: {
    title: "DPO — Encarregado de Dados",
    sections: [
      { heading: "Contato", items: [
        "Nome: Edmara Rocha",
        "E-mail: edmararbusiness1@gmail.com",
        "Resposta em até 5 dias úteis",
      ]},
      { heading: "Direitos LGPD Art. 18", items: [
        "Confirmação de tratamento",
        "Acesso aos dados",
        "Correção de dados incompletos",
        "Anonimização, bloqueio ou eliminação",
        "Portabilidade",
        "Eliminação dos dados tratados com consentimento",
        "Revogação do consentimento",
      ]},
    ],
  },
};

function GovernanceModal({ type, onClose }) {
  const content = GOV_CONTENT[type];
  if (!content) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <p className="modal-title">{content.title}</p>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {content.sections.map((sec, si) => (
            <div key={si} className="modal-section">
              <p className="modal-heading">{sec.heading}</p>
              <ul>
                {sec.items.map((item, i) => (
                  <li key={i}><span className="bullet"></span>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedbackModal({ onClose }) {
  const [tab, setTab] = React.useState("nps");
  const [npsScore, setNpsScore] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [reportType, setReportType] = React.useState("denuncia");
  const [sent, setSent] = React.useState(false);

  const canSubmit = tab === "nps" ? npsScore !== null : message.trim().length > 0;
  const handleSubmit = () => {
    setSent(true);
    setTimeout(onClose, 1500);
  };

  if (sent) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={e=>e.stopPropagation()}>
          <div className="modal-success">
            <div className="modal-check">✓</div>
            <p>{tab === "denuncia" ? "Recebemos sua denúncia." : "Obrigado pelo seu feedback!"}</p>
            {tab === "denuncia" && <p className="modal-success-sub">Sua identidade está protegida.</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <p className="modal-title">Canal de Denúncias e Feedback</p>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-tabs">
          {[["nps","NPS"],["feedback","Feedback"],["denuncia","Denúncia"]].map(([id,label]) => (
            <button key={id} className={tab===id?"on":""} onClick={()=>{ setTab(id); setMessage(""); setNpsScore(null); }}>
              {label}
            </button>
          ))}
        </div>

        {tab === "nps" && (
          <>
            <p className="modal-hint">De 0 a 10, o quanto recomendaria o IPB?</p>
            <div className="modal-nps">
              {Array.from({length:11}, (_,i) => (
                <button key={i} className={npsScore===i?"on":""} onClick={()=>setNpsScore(i)}>{i}</button>
              ))}
            </div>
            <textarea className="modal-textarea" rows={2} placeholder="Comentário (opcional)" value={message} onChange={e=>setMessage(e.target.value)}/>
          </>
        )}

        {tab === "feedback" && (
          <textarea className="modal-textarea" rows={4} placeholder="Deixe seu feedback, sugestão ou elogio..." value={message} onChange={e=>setMessage(e.target.value)}/>
        )}

        {tab === "denuncia" && (
          <>
            <p className="modal-hint">Anônimo e confidencial.</p>
            <div className="modal-pills">
              {[["denuncia","Denúncia"],["assedio","Assédio"],["etica","Ética"],["outro","Outro"]].map(([v,l]) => (
                <button key={v} className={reportType===v?"on":""} onClick={()=>setReportType(v)}>{l}</button>
              ))}
            </div>
            <textarea className="modal-textarea" rows={4} placeholder="Descreva..." value={message} onChange={e=>setMessage(e.target.value)}/>
          </>
        )}

        <button className="modal-submit" disabled={!canSubmit} onClick={handleSubmit}>
          ↗ Enviar
        </button>
      </div>
    </div>
  );
}

function AppHome() {
  const [perfPage, setPerfPage] = React.useState(0);
  const [modal, setModal] = React.useState(null);
  return (
    <div className="app-bg">
      <AppTopBar />
      <div className="s-home">
        <div className="s-marquee-wrap">
          <div className="s-marquee-fade left"></div>
          <div className="s-marquee-fade right"></div>
          <div className="s-marquee" data-tour="marquee">
            {[0,1].map(k => (
              <React.Fragment key={k}>
                <div className="s-sim s-sim-neuro" data-tour="neuro">
                  <div className="s-sim-brain"></div>
                  <div className="s-sim-scan"></div>
                  <div className="s-sim-tag teal">
                    <span className="dot"></span>
                    <span>Neural Scan · 10 Hz</span>
                  </div>
                  <NeuroVitals/>
                  <div className="s-sim-bottom"></div>
                  <div className="s-sim-foot">
                    <div>
                      <span className="eb">Sistema Neural</span>
                      <span className="t">🧠 Neuro</span>
                    </div>
                    <EEGWave/>
                  </div>
                </div>
                <div className="s-sim s-sim-cardio" data-tour="cardio">
                  <div className="s-sim-heart">♥</div>
                  <div className="s-sim-bottom"></div>
                  <div className="s-sim-foot">
                    <div>
                      <span className="eb">Cardio</span>
                      <span className="t">♥ Coração</span>
                    </div>
                    <span className="b">72 BPM</span>
                  </div>
                </div>
                <div className="s-sim s-sim-pneumo" data-tour="pneumo">
                  <div className="s-sim-lung"></div>
                  <div className="s-sim-bottom"></div>
                  <div className="s-sim-foot">
                    <div>
                      <span className="eb">Pneumo</span>
                      <span className="t">🫁 Pulmão</span>
                    </div>
                    <span className="b">PEEP 5</span>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="s-perf-bar" data-tour="perf">
          <div className="s-perf-cards" style={{ transform: `translateX(-${perfPage * 100}%)` }}>
            {/* CARD 1 — Impacto IPB + NPS + Governança */}
            <div className="s-perf-card">
              <p className="k">Impacto IPB</p>
              <div className="s-perf-impact">
                <div className="mini"><span className="ic">🩺</span><span className="n">12</span><span className="l">Prontuários</span></div>
                <div className="mini"><span className="ic">📚</span><span className="n">47</span><span className="l">Conteúdos</span></div>
                <div className="mini"><span className="ic">🍃</span><span className="n">60</span><span className="l">Folhas</span></div>
                <div className="mini"><span className="ic">⚙</span><span className="n">156</span><span className="l">Cálculos</span></div>
              </div>
              <div className="s-perf-div"></div>
              <p className="k">NPS e Feedback</p>
              <div className="s-perf-nps">
                <div><span className="n">72</span><span className="l">NPS Score</span></div>
                <div><span className="n">18</span><span className="l">Avaliações</span></div>
                <div><span className="n">31</span><span className="l">Feedbacks</span></div>
              </div>
              <div className="s-perf-div"></div>
              <p className="k">Governança</p>
              <div className="s-perf-gov">
                <button onClick={()=>setModal({type:"gov", key:"politicas"})}><span>📄</span>Políticas</button>
                <button onClick={()=>setModal({type:"gov", key:"praticas"})}><span>🛡</span>Práticas</button>
                <button onClick={()=>setModal({type:"gov", key:"compliance"})}><span>⚖</span>Compliance</button>
                <button onClick={()=>setModal({type:"gov", key:"termos"})}><span>📜</span>Termos</button>
                <button onClick={()=>setModal({type:"gov", key:"cookies"})}><span>🍪</span>Cookies</button>
                <button onClick={()=>setModal({type:"gov", key:"missao"})}><span>🎯</span>Missão</button>
                <button onClick={()=>setModal({type:"gov", key:"dpo"})}><span>👤</span>DPO</button>
                <button onClick={()=>setModal({type:"feedback"})}><span>📢</span>Denúncias</button>
              </div>
            </div>
            {/* CARD 2 — Sustentabilidade */}
            <div className="s-perf-card">
              <p className="k">Sustentabilidade</p>
              <div className="s-perf-tbl">
                <div><span className="ic">🌍</span><span className="t">Planeta</span><span className="d">Zero papel · Digital-first · Eco-eficiência</span></div>
                <div><span className="ic">❤</span><span className="t">Pessoas</span><span className="d">Preparo = paciente seguro · Inclusão</span></div>
                <div><span className="ic">⚖</span><span className="t">Prosperidade</span><span className="d">Menos VM = menos custo hospitalar</span></div>
              </div>
              <p className="k center">ODS</p>
              <div className="s-perf-ods">
                {[[3,"Saúde"],[4,"Educação"],[9,"Inovação"],[10,"Igualdade"],[12,"Consumo"]].map(([n,l])=>(
                  <div key={n}><b>{n}</b><span>{l}</span></div>
                ))}
              </div>
              <p className="k center">CSV · Valor Compartilhado</p>
              <div className="s-perf-csv">
                <div><b>Social</b><span>Reduz evasão · Capacita INTELLIGENCE PLATFORM BUSINESS · Melhora desfechos</span></div>
                <div><b>Econômico</b><span>EdTech inexplorado · Diferencial por inclusão</span></div>
                <div><b>Ambiental</b><span>Digitalização reduz pegada · Código otimizado</span></div>
              </div>
              <div className="s-perf-esg">
                <p className="k">Sustentabilidade Digital & ESG</p>
                <div className="grid">
                  <div><b>Offline-First</b><span>Menos servidor = menos energia</span></div>
                  <div><b>Pegada Digital</b><span>Cada componente avaliado</span></div>
                  <div><b>Antigreenwashing</b><span>Só o verificável no código</span></div>
                  <div><b>ESG como produto</b><span>Não é relatório, é função</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="s-perf-nav">
            <button className="arr" onClick={()=>setPerfPage(0)} disabled={perfPage===0}>‹</button>
            <div className="dots">
              <span className={perfPage===0?"on":""}></span>
              <span className={perfPage===1?"on":""}></span>
            </div>
            <button className="arr" onClick={()=>setPerfPage(1)} disabled={perfPage===1}>›</button>
          </div>
        </div>
      </div>
      <AppNav active="home" />
      {modal && modal.type === "gov" && <GovernanceModal type={modal.key} onClose={()=>setModal(null)}/>}
      {modal && modal.type === "feedback" && <FeedbackModal onClose={()=>setModal(null)}/>}
    </div>);

}

function AppExplore() {
  const [active, setActive] = React.useState(0);
  const cards = [
    { icon: "📚", title: "Conteudos",  sub: "Protocolos, referencias e fluxos clinicos para a beira do leito", color: "#c8cdd7" },
    { icon: "⚙",  title: "Sistemas",   sub: "Modulos interativos — neuro, cardio, pneumo e mais",              color: "#c8cdd7" },
  ];
  return (
    <div className="app-bg">
      <AppTopBar />
      <div className="s-explore">
        <div className="s-explore-carousel">
          <div className="s-explore-track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {cards.map((c, i) => (
              <div key={i} className="s-explore-slot">
                <div className="s-explore-fcard" style={{ glow: `${c.color}30`, "--accent": c.color }}>
                  <div className="s-explore-glow"></div>
                  <div className="s-explore-toprule"></div>
                  <div className="s-explore-top">
                    <div className="s-explore-icon">{c.icon}</div>
                    <div className="s-explore-chev">›</div>
                  </div>
                  <div className="s-explore-bottom">
                    <div className="s-explore-hairline"></div>
                    <h2 className="s-explore-title">{c.title}</h2>
                    <p className="s-explore-sub">{c.sub}</p>
                    <div className="s-explore-cta">Abrir ›</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="s-explore-nav">
          <button className="arr" onClick={()=>setActive(Math.max(0,active-1))} disabled={active===0}>‹</button>
          <div className="dots">
            {cards.map((_,i)=>(<span key={i} className={active===i?"on":""}></span>))}
          </div>
          <button className="arr" onClick={()=>setActive(Math.min(cards.length-1,active+1))} disabled={active===cards.length-1}>›</button>
        </div>
      </div>
      <AppNav active="explore" />
    </div>);

}

function AppSistemas({ active = "S1" }) {
  const systems = [
  ["S1", "IPB ICU", "📋"],
  ["S2", "Calculadoras", "🧮"],
  ["S3", "Referência", "📖"]];

  const cur = systems.find((s) => s[0] === active);
  return (
    <div className="app-bg">
      <AppTopBar />
      <div className="s-sist">
        <aside className="s-sist-side" data-tour="sidebar">
          <p className="k">Sistemas</p>
          {systems.map(([id, name]) =>
          <button key={id} className={active === id ? "on" : ""} data-tour={"sys-" + id}>
              <span className={"d " + (active === id ? "" : "off")}></span>
              <span>{id}<br />{name}</span>
            </button>
          )}
        </aside>
        <div className="s-sist-main">
          <div className="s-sist-hero">
            <div className="s-sist-hero-ic">{cur[2]}</div>
            <div>
              <p className="k">Sistema {cur[0]}</p>
              <h3>{cur[1]}</h3>
              <p className="desc">
                {active === "S1" && "Registros clínicos, balanços, evolução, indicadores e exportação à beira do leito."}
                {active === "S2" && "Mecânica respiratória, complacência, RSBI, P/F, HACOR, SOFA e escalas funcionais."}
                {active === "S3" && "Protocolos, condutas e fluxos clínicos organizados por sistema — referência rápida."}
              </p>
            </div>
          </div>
          <div className="s-sist-panel" data-tour="panel">
            <p className="k">Respiratório · 3 blocos</p>
            <div className="s-sist-block"><p className="bn">Insuficiência respiratória</p><p className="bd">SDRA leve a moderada · 5 problemas</p></div>
            <div className="s-sist-block"><p className="bn">Ventilação mecânica</p><p className="bd">Estratégia protetora · 6 problemas</p></div>
            <div className="s-sist-block"><p className="bn">Desmame</p><p className="bd">RSBI &lt; 80 · 3 problemas</p></div>
          </div>
        </div>
      </div>
      <AppNav active="explore" />
    </div>);

}

function AppCalc() {
  return (
    <div className="app-bg">
      <AppTopBar />
      <div className="s-calc">
        <p className="s-calc-back">‹ Voltar</p>
        <h1 className="s-calc-title shim">Calculadora de VM</h1>
        <p className="s-calc-sub">Simulação clínica completa com parâmetros ventilatórios, oxigenação e desmame.</p>
        <div className="s-calc-panel" data-tour="parametros">
          <p className="k">Parâmetros ventilatórios</p>
          <div className="s-calc-grid">
            {[
            ["FR", "16", "/min", 30],
            ["PEEP", "5", "cmH₂O", 25],
            ["Pico", "25", "cmH₂O", 28],
            ["Platô", "20", "cmH₂O", 50],
            ["VT", "500", "mL", 40],
            ["Fluxo", "40", "L/min", 28]].
            map(([l, v, u, p]) =>
            <div key={l} className="s-calc-input">
                <p className="lbl">{l}</p>
                <p className="val">{v}<span>{u}</span></p>
                <div className="slider"><div className="fill" style={{ width: `${p}%` }}></div></div>
              </div>
            )}
          </div>
        </div>
        <div className="s-calc-results" data-tour="resultados">
          <div className="s-calc-res neutral"><p className="k">DP</p><p className="v shim">15<span>cmH₂O</span></p><p className="t">Platô − PEEP</p></div>
          <div className="s-calc-res warn"><p className="k">P/F</p><p className="v shim">225</p><p className="t">Moderado</p></div>
          <div className="s-calc-res good"><p className="k">RSBI</p><p className="v shim">62.5</p><p className="t">Favorável</p></div>
          <div className="s-calc-res good"><p className="k">ROX</p><p className="v shim">4.92</p><p className="t">Sucesso CPAP</p></div>
        </div>
      </div>
      <AppNav active="explore" />
    </div>);

}

function AppEnd() {
  return (
    <div className="app-bg">
      <div className="s-end">
        <div className="s-end-mark shim">IPB</div>
        <h1>Pronto. Você <em>aprendeu</em><br />o essencial do IPB.</h1>
        <p>17 telas, 6 capítulos, um app inteiro que cabe na sua mão. Agora é só usar — e cuidar de paciente como se cuida de gente.</p>
        <button>Recomeçar tour ↻</button>
      </div>
    </div>);

}


// ─────────────────────────────────────────────────────────────────────────
// Editorial scroll story — Stripe/Apple-style with REAL phones
// ─────────────────────────────────────────────────────────────────────────

function Phone({ children, label, num }) {
  return (
    <div className="phone-wrap">
      <div className="phone">
        <div className="phone-notch"></div>
        <div className="phone-screen">{children}</div>
        <div className="phone-bar"></div>
      </div>
      {num || label ?
      <div className="phone-caption">
          {num ? <span className="num">{num}</span> : null}
          {label ? <span className="label">{label}</span> : null}
        </div> :
      null}
    </div>);

}


// ─────────────────────────────────────────────────────────────────────────
// Interactive auth — auto-cycles login → signup → forgot inside the phone
// ─────────────────────────────────────────────────────────────────────────
function AuthInteractive() {
  // 0: signup empty (cadastrar tab active by default)
  // 1: signup filling name
  // 2: signup filling email
  // 3: signup filling senha
  // 4: signup eye open
  // 5: signup accepting terms
  // 6: signup CTA active (criar conta)
  // 7: CONFIRMATION SCREEN — acesse seu e-mail
  // 8: login filling email
  // 9: login filling senha
  // 10: forgot password mode
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 11), 1700);
    return () => clearInterval(id);
  }, []);

  // Special screen (full takeover)
  if (step === 7) return <AppConfirm />;

  const mode = step === 10 ? "forgot" : step >= 8 ? "login" : "signup";
  const showEye = step === 4;

  const sName = step >= 1 ? "Edmara Rocha" : "";
  const sEmail = step >= 2 ? "edmara@er-site.com" : "";
  const sPass = step >= 3 ? showEye ? "senha2026" : "••••••••" : "";
  const sConsent = step >= 5;
  const sCtaActive = step === 6;

  const loginEmail = step >= 8 ? "edmara@er-site.com" : "";
  const loginPass = step >= 9 ? "••••••••" : "";

  return (
    <div className="app-bg">
      <div className="s-auth">
        <div className="s-auth-brand">
          <h1>IPB</h1>
          <p>Sistema de Estudo Avancado</p>
        </div>
        <div className="s-auth-card">
          {mode !== "forgot" ?
          <div className="s-auth-tabs">
              <span className={mode === "login" ? "on" : ""}>Entrar</span>
              <span className={mode === "signup" ? "on" : ""}>Cadastrar</span>
            </div> :

          <button className="s-auth-back"><IconBack s={11} /> Voltar ao login</button>
          }

          {mode === "login" &&
          <React.Fragment>
              <div className="s-auth-field" data-active={step === 8}>
                <span className="ic"><IconMail /></span>
                <input readOnly value={loginEmail} placeholder="Email" className={loginEmail ? "" : "placeholder"} />
              </div>
              <div className="s-auth-field" data-active={step === 9}>
                <span className="ic"><IconLock /></span>
                <input readOnly value={loginPass} placeholder="Senha" className={loginPass ? "" : "placeholder"} />
                <span className="ic ic-right"><IconEye /></span>
              </div>
              <a className="s-auth-link">Esqueceu a senha?</a>
              <button className="s-auth-cta">Entrar <IconArrow /></button>
            </React.Fragment>
          }

          {mode === "signup" &&
          <React.Fragment>
              <div className="s-auth-field" data-active={step === 1}>
                <span className="ic"><IconUser /></span>
                <input readOnly value={sName} placeholder="Seu nome" className={sName ? "" : "placeholder"} />
              </div>
              <div className="s-auth-field" data-active={step === 2}>
                <span className="ic"><IconMail /></span>
                <input readOnly value={sEmail} placeholder="Email" className={sEmail ? "" : "placeholder"} />
              </div>
              <div className="s-auth-field" data-active={step === 3 || step === 4}>
                <span className="ic"><IconLock /></span>
                <input readOnly value={sPass} placeholder="Senha" className={sPass ? "" : "placeholder"} />
                <span className="ic ic-right" data-on={showEye}><IconEye /></span>
              </div>
              <label className="s-auth-consent" data-active={step === 5}>
                <input type="checkbox" checked={sConsent} readOnly />
                <span>Li e aceito os <u>Termos de Uso</u> e a <u>Politica de Privacidade</u></span>
              </label>
              <button className={"s-auth-cta " + (sCtaActive ? "active" : "")}>Criar conta <IconArrow /></button>
            </React.Fragment>
          }

          {mode === "forgot" &&
          <React.Fragment>
              <div className="s-auth-field" data-active={true}>
                <span className="ic"><IconMail /></span>
                <input readOnly value="edmara@er-site.com" placeholder="Email" />
              </div>
              <button className="s-auth-cta">Enviar email <IconArrow /></button>
            </React.Fragment>
          }

          <div className="s-auth-stepbar">
            {Array.from({ length: 11 }).map((_, i) =>
            <span key={i} className={i === step ? "now" : i < step ? "done" : ""}></span>
            )}
          </div>
        </div>
      </div>
    </div>);

}

const SECTIONS = [
{
  type: "hero",
  eyebrow: "IPB INTELLIGENCE PLATFORM BUSINESS · 2026",
  title: ["O ecossistema", "que conecta", "clínica e gestão."],
  body: "Plataforma integral de inteligência clínica e educacional. Módulos avançados de capacitação, IA para escaneamento de parâmetros e gestão hospitalar em tempo real.",
  foot: ["Role pra ver", "▼"],
  phone: <AppLanding />,
  phoneLabel: "abertura · 13 frases ciclando",
  phoneNum: "i."
},
{
  type: "feature",
  num: "02",
  eyebrow: "Acesso · interativo",
  title: ["3 modos.", "1 só lugar."],
  body: "Entrar, Cadastrar e Esqueceu a senha vivem no mesmo card glass. No cadastro inicial você aceita Termos e LGPD — uma única vez. Em todos os logins depois, sua aceitação já está salva. Senha ≥ 6 caracteres, e-mail validado, sem captcha, sem fricção. Olhe ao lado: o app está se mostrando sozinho.",
  stat: ["3 modos", "login · signup · forgot"],
  phone: <AuthInteractive />,
  phoneLabel: "auth · ciclando estados",
  side: "left"
},
{
  type: "feature",
  num: "03",
  eyebrow: "Splash premium · 3,5s",
  title: ["Cada milissegundo", "é design."],
  body: "Orb canvas com glow expandindo conforme o progresso. Anéis duplos pulsando em frequências diferentes. 8 partículas orbitando em órbita oval (sin(angle) × 0.88). Logo IPB com shimmer prata→branco→dourado em loop. Progress bar com easing quartic — 1 − (1−r)⁴ — acelera no fim.",
  stat: ["Canvas 2D + Three.js", "Bloom + IpbBackground"],
  phone: <AppSplash />,
  phoneLabel: "splash · 3.5s + 1s hold",
  side: "right"
},
{
  type: "feature",
  num: "04",
  eyebrow: "Home — sua base diária",
  title: ["TopBar.", "Marquee.", "BottomNav."],
  body: "TopBar fixo com logo IPB metálico, saudação dinâmica (Sol 6-18h, Lua 18-6h), data formato 20.MAI.2026, zoom A−/A+, sino com badge, perfil. Marquee horizontal das simulações 3D rolando em loop infinito. BottomNav fixo com 2 abas — HOME e EXPLORAR. Simplicidade total.",
  stat: ["2 abas", "HOME · EXPLORAR"],
  phone: <AppHome />,
  phoneLabel: "home · 3 simulações 3D",
  side: "left"
},
{
  type: "feature",
  num: "05",
  eyebrow: "Scan IA · a revolução",
  title: ["Foto.", "Pronto."],
  body: "Foto do display do ventilador — Hamilton, Drager, Servo, Magnamed, Mindray, GE, Newport, Leistung, qualquer marca, até os analógicos. O IPB lê modo e parâmetros sozinho. Foto da gasometria? Extrai pH, PaO₂, PaCO₂, BE, lactato e calcula P/F na hora. Foto das curvas e loops? Detecta padrões e assincronias. Foto da TIE (PulmoVista)? Interpreta ROIs e titulação de PEEP.",
  stat: ["20s", "para documentar um paciente complexo"],
  phone: <AppExplore />,
  phoneLabel: "explorar · conteúdos + sistemas",
  side: "right"
},
{
  type: "feature",
  num: "06",
  eyebrow: "Calculadora pensa por você",
  title: ["Não precisa", "configurar nada."],
  body: "Detecta convenção PC do ventilador (delta acima do PEEP vs PIP absoluto). Diferencia VTe e VTi. Ajusta cálculos para adulto, pediátrico ou neonatal automaticamente. Reconhece assincronias baseado nas próprias diretrizes do conteúdo educacional.",
  stat: ["Berlin 2023 · PALICC", "Diretrizes atualizadas"],
  phone: <AppCalc />,
  phoneLabel: "calculadora · DP, P/F, RSBI, ROX",
  side: "left"
},
{
  type: "feature",
  num: "07",
  eyebrow: "IPB ICU",
  title: ["O IPB ICU", "que escaneia."],
  body: "IPB ICU com cálculos automáticos: DP, Cest, Cdyn, MP, RSBI, P/F Berlin 2023. Histórico salvo de cada gasometria, balanço hídrico e parâmetros de VM. Compara o agora com o de 6 horas atrás. Vê tendência: melhorou, piorou, em quê. Nenhum app de calculadora faz isso.",
  stat: ["Tendência visual", "Compara turno a turno"],
  phone: <AppSistemas active="S1" />,
  phoneLabel: "sistemas · IPB ICU",
  side: "right"
},
{
  type: "feature",
  num: "08",
  eyebrow: "Feito por INTELLIGENCE PLATFORM BUSINESS, pra INTELLIGENCE PLATFORM BUSINESS",
  title: ["Outros apps", "são feitos", "por médicos."],
  body: "O IPB é exclusivo para profissionais do INTELLIGENCE PLATFORM BUSINESS: conteúdo alinhado ao raciocínio INTELLIGENCE PLATFORM BUSINESS. Calculadoras prioritárias — RSBI, PImax, PEmax, índice de Tobin, CV. Protocolos com foco em conduta: prona, recrutamento, VNI, desmame, traqueostomia.",
  stat: ["100%", "feito por profissional do INTELLIGENCE PLATFORM BUSINESS"],
  phone: <AppSistemas active="S2" />,
  phoneLabel: "sistemas · calculadoras",
  side: "left"
},
{
  type: "closing",
  eyebrow: "09",
  title: ["A primeira plataforma", "feita por INTELLIGENCE PLATFORM BUSINESS,", "pra INTELLIGENCE PLATFORM BUSINESS."],
  body: "O ecossistema que conecta clínica, educação e gestão."
}];


function HeroSection({ data }) {
  return (
    <section className="sec sec-hero" data-screen-label="Hero">
      <div className="sec-grid">
        <div className="sec-text">
          <div className="sec-eyebrow"><span>{data.eyebrow}</span></div>
          <h1 className="sec-hero-title">
            {data.title.map((line, i) =>
            <span key={i} className={i === 2 ? "shim" : ""}>{line}</span>
            )}
          </h1>
          <p className="sec-hero-body">{data.body}</p>
          <div className="sec-hero-scroll">
            <span>{data.foot[0]}</span>
            <span className="arrow">{data.foot[1]}</span>
          </div>
        </div>
        <div className="sec-phone">
          <Phone num={data.phoneNum} label={data.phoneLabel}>{data.phone}</Phone>
        </div>
      </div>
    </section>);

}

function FeatureSection({ data }) {
  return (
    <section className={"sec sec-feature sec-" + data.side} data-screen-label={"Feature " + data.num}>
      <div className="sec-grid">
        <div className="sec-text">
          <div className="sec-num shim">{data.num}</div>
          <div className="sec-eyebrow"><span>{data.eyebrow}</span></div>
          <h2 className="sec-title">
            {data.title.map((line, i) => <span key={i}>{line}</span>)}
          </h2>
          <p className="sec-body">{data.body}</p>
          {data.stat ?
          <div className="sec-stat">
              <strong className="shim">{data.stat[0]}</strong>
              <span>{data.stat[1]}</span>
            </div> :
          null}
        </div>
        <div className="sec-phone">
          <Phone label={data.phoneLabel}>{data.phone}</Phone>
        </div>
      </div>
    </section>);

}

function ClosingSection({ data }) {
  return (
    <section className="sec sec-closing" data-screen-label="Closing">
      <div className="sec-closing-body">
        <div className="sec-num shim">{data.eyebrow}</div>
        <h2 className="sec-closing-title">
          {data.title.map((line, i) =>
          <span key={i} className={i === 0 ? "shim" : ""}>{line}</span>
          )}
        </h2>
        <p className="sec-closing-body-text">{data.body}</p>
      </div>
    </section>);

}

function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, h.scrollTop / max * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: pct + "%" }}></div>
    </div>);

}

function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <div className="topbar-mark">IPB</div>
        <span className="topbar-name">INTELLIGENCE PLATFORM BUSINESS</span>
      </div>
      <nav className="topbar-nav">
        <span>scan IA</span>
        <span>IPB ICU</span>
        <span>calculadora</span>
        <span>simulações 3D</span>
      </nav>
    </header>);

}

export default function Story() {
  return (
    <React.Fragment>
      <ProgressBar />
      <TopBar />
      <main className="story">
        {SECTIONS.map((s, i) => {
          if (s.type === "hero") return <HeroSection key={i} data={s} />;
          if (s.type === "feature") return <FeatureSection key={i} data={s} />;
          if (s.type === "closing") return <ClosingSection key={i} data={s} />;
          return null;
        })}
      </main>
    </React.Fragment>);

}