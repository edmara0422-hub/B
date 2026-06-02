"use client";
import React, { useEffect, useRef } from "react";

export function BackgroundCanvas({ children }: { children?: React.ReactNode }) {
  const constRef = useRef<HTMLCanvasElement>(null);
  const orbRef = useRef<HTMLCanvasElement>(null);

  // Constellation: 24 particles (22% gold) with connection lines
  useEffect(() => {
    const canvas = constRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Create a robust resize handler
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      return { w, h };
    };
    
    let { w, h } = resize();
    window.addEventListener("resize", () => {
      const dims = resize();
      w = dims.w;
      h = dims.h;
    });

    const N = 24, CONN2 = 95 * 95;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.04,
      r: Math.random() * 1.4 + 0.5,
      a: Math.random(),
      va: (Math.random() - 0.5) * 0.005,
      gold: Math.random() < 0.22
    }));
    
    let raf: number;
    let last = 0;
    
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (now - last < 60) return;
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.6;
      
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONN2) {
            const alpha = (1 - Math.sqrt(d2) / 150) * 0.18;
            const isGold = pts[i].gold || pts[j].gold;
            ctx.strokeStyle = isGold ? `rgba(224,185,80,${alpha.toFixed(3)})` : `rgba(210,215,225,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy; p.a += p.va;
        if (p.a < 0.05) p.a = 0.85;
        if (p.a > 1) p.a = 0.15;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const size = p.r * 2;
        if (p.gold) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224,185,80,${(p.a * 0.18).toFixed(3)})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? `rgba(255,210,120,${p.a.toFixed(3)})` : `rgba(220,225,235,${p.a.toFixed(3)})`;
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: `
          radial-gradient(circle at 50% -10%, rgba(255,255,255,0.10), transparent 22%),
          radial-gradient(circle at 20% 18%, rgba(212,219,227,0.08), transparent 20%),
          radial-gradient(circle at 82% 14%, rgba(173,181,191,0.06), transparent 20%),
          linear-gradient(180deg, #090909 0%, #030303 44%, #010101 100%)`,
        color: "#fff",
        fontFamily: "var(--sans)",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.035) 18%, transparent 34%),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.008) 0 1px, transparent 1px 120px)`,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-12rem",
          left: "12%",
          right: "12%",
          height: "22rem",
          background:
            "radial-gradient(ellipse at center, rgba(207,214,223,0.12) 0%, transparent 74%)",
          filter: "blur(20px)",
          borderRadius: "100%",
          pointerEvents: "none",
        }}
      />
      
      <canvas 
        ref={constRef} 
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.9 }} 
      />

      {children}
    </div>
  );
}
