import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  exploded: boolean;
  particles: Particle[];
  color: string;
}

function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks: Firework[] = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#FFD700', '#FF69B4'];

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const targetY = Math.random() * (canvas.height * 0.3) + 50;

      fireworks.push({
        x,
        y: canvas.height,
        targetY,
        vy: -8,
        exploded: false,
        particles: [],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const explode = (firework: Firework) => {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 3 + 2;
        firework.particles.push({
          x: firework.x,
          y: firework.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: firework.color,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];

        if (!firework.exploded) {
          firework.y += firework.vy;

          ctx.beginPath();
          ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = firework.color;
          ctx.fill();

          if (firework.y <= firework.targetY) {
            firework.exploded = true;
            explode(firework);
          }
        } else {
          for (let j = firework.particles.length - 1; j >= 0; j--) {
            const particle = firework.particles[j];

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.05;
            particle.alpha -= 0.01;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.fill();

            if (particle.alpha <= 0) {
              firework.particles.splice(j, 1);
            }
          }

          if (firework.particles.length === 0) {
            fireworks.splice(i, 1);
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const interval = setInterval(() => {
      createFirework();
    }, 800);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

export default Fireworks;