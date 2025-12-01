import { useEffect, useRef } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      opacity: number;
    }

    const orbs: Orb[] = [
      { x: 100, y: 100, vx: 1, vy: 0.5, radius: 80, color: '#06B6D4', opacity: 0.1 },
      { x: 300, y: 400, vx: -0.5, vy: 1, radius: 100, color: '#0EA5E9', opacity: 0.08 },
      { x: 700, y: 200, vx: 0.7, vy: -0.8, radius: 70, color: '#14B8A6', opacity: 0.1 },
      { x: 900, y: 600, vx: -0.8, vy: 0.3, radius: 90, color: '#06B6D4', opacity: 0.08 },
      { x: 500, y: 800, vx: 0.5, vy: -0.5, radius: 75, color: '#0EA5E9', opacity: 0.09 },
      { x: 1200, y: 400, vx: -1, vy: 0.6, radius: 85, color: '#14B8A6', opacity: 0.1 },
    ];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) {
          orb.vx *= -1;
        }
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) {
          orb.vy *= -1;
        }

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `rgba(${hexToRgb(orb.color)}, ${orb.opacity})`);
        gradient.addColorStop(1, `rgba(${hexToRgb(orb.color)}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(orb.x - orb.radius, orb.y - orb.radius, orb.radius * 2, orb.radius * 2);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ top: 0, left: 0 }}
    />
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }
  return '6, 182, 212';
}
