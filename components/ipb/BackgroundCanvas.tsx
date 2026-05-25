"use client";
import React, { useEffect, useRef } from "react";

export function BackgroundCanvas({ children }: { children?: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    // Criação das partículas
    const particles = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
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
        ref={canvasRef} 
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} 
      />

      {children}
    </div>
  );
}
