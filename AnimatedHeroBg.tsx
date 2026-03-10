'use client';

import { useEffect, useRef } from 'react';

/**
 * VastData 스타일 Mesh Gradient Canvas 애니메이션 배경
 * 모든 솔루션 페이지 Hero section의 <section> 안에 첫 번째 자식으로 배치
 *
 * 사용법:
 *   import AnimatedHeroBg from '@/components/AnimatedHeroBg';
 *   <section className="relative ...">
 *     <AnimatedHeroBg />
 *     ... hero content ...
 *   </section>
 */

interface Orb {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: [number, number, number];
  opacity: number;
}

export default function AnimatedHeroBg({ variant = 'teal' }: { variant?: 'teal' | 'blue' | 'purple' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // 색상 팔레트 (variant 별)
  const palettes: Record<string, [number, number, number][]> = {
    teal:   [[0,201,177], [56,217,245], [0,100,130], [5,13,26]],
    blue:   [[30,100,200], [0,150,255], [100,50,200], [5,13,26]],
    purple: [[120,60,220], [200,100,255], [60,80,200], [5,13,26]],
  };
  const palette = palettes[variant] || palettes.teal;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;

    // Orb 초기화
    const orbs: Orb[] = [];
    const NUM_ORBS = 6;

    const init = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      orbs.length = 0;
      for (let i = 0; i < NUM_ORBS; i++) {
        orbs.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.min(W, H) * (0.35 + Math.random() * 0.25),
          color: palette[i % palette.length],
          opacity: 0.12 + Math.random() * 0.18,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // 배경 기본색
      ctx.fillStyle = '#050d1a';
      ctx.fillRect(0, 0, W, H);

      // 각 orb 그리기
      for (const o of orbs) {
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        const [r, g, b] = o.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},${o.opacity})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${o.opacity * 0.4})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        // 이동
        o.x += o.vx;
        o.y += o.vy;

        // 경계 반사 (부드럽게)
        if (o.x < -o.r * 0.5) o.vx = Math.abs(o.vx);
        if (o.x > W + o.r * 0.5) o.vx = -Math.abs(o.vx);
        if (o.y < -o.r * 0.5) o.vy = Math.abs(o.vy);
        if (o.y > H + o.r * 0.5) o.vy = -Math.abs(o.vy);
      }

      // 상단 노이즈 그라디언트 오버레이 (깊이감)
      const overlay = ctx.createLinearGradient(0, 0, 0, H);
      overlay.addColorStop(0, 'rgba(5,13,26,0.4)');
      overlay.addColorStop(0.4, 'rgba(5,13,26,0)');
      overlay.addColorStop(1, 'rgba(5,13,26,0.6)');
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, W, H);

      animRef.current = requestAnimationFrame(draw);
    };

    // 리사이즈 대응
    const ro = new ResizeObserver(() => { init(); });
    ro.observe(canvas);

    init();
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
