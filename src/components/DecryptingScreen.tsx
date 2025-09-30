import { useEffect, useRef, useState } from 'react';

interface DecryptingScreenProps {
  onErrorComplete: () => void;
}

function DecryptingScreen({ onErrorComplete }: DecryptingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const humGainRef = useRef<GainNode | null>(null);
  const humOscRef = useRef<OscillatorNode | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let current = 0;
    // Start background hum
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sawtooth';
      o.frequency.value = 120;
      g.gain.value = 0.02;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      humOscRef.current = o;
      humGainRef.current = g;
    } catch {}
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      // Ease to 99% over ~7 seconds
      const target = Math.min(99, Math.floor((elapsed / 7000) * 99));
      if (target > current) {
        current = target;
        setProgress(current);
      }
      if (current < 99) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Show error after slight delay
        setTimeout(() => {
          setShowError(true);
          // Ramp up a harsh buzz and then stop
          try {
            const ctx = audioCtxRef.current;
            if (ctx) {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'square';
              osc.frequency.setValueAtTime(50, ctx.currentTime);
              gain.gain.setValueAtTime(0.001, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.15);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.35);
            }
          } catch {}
          // Shake/glitch for 2 seconds then continue
          setTimeout(() => {
            onErrorComplete();
          }, 2000);
        }, 800);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Stop background hum
      try {
        humOscRef.current?.stop();
        humOscRef.current?.disconnect();
        humGainRef.current?.disconnect();
        audioCtxRef.current?.close();
      } catch {}
    };
  }, [onErrorComplete]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className={`w-full max-w-xl text-center ${showError ? 'animate-shake-hard animate-glitch' : ''}`}>
        {!showError ? (
          <>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Decrypting your surprise gift… please wait…</h2>
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-white/20">
              <div
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-green-300 text-sm">{progress}%</p>
          </>
        ) : (
          <div className="mt-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-red-500 drop-shadow-xl mb-4">ERROR: Gift not found</h2>
            <p className="text-red-300">Attempting recovery…</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DecryptingScreen;


