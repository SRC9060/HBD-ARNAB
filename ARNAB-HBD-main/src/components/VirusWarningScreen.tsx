import { useEffect, useRef, useState } from 'react';

interface VirusWarningScreenProps {
  onFinish: () => void;
}

function VirusWarningScreen({ onFinish }: VirusWarningScreenProps) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sirenIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Fake progress over 5.5 seconds
    const start = Date.now();
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / 5500) * 100));
      setProgress(pct);
      if (pct >= 100 && intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }, 120);

    // Start an alternating siren for anxiety effect
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
      const playSiren = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.connect(gain);
        gain.connect(ctx.destination);
        const t = ctx.currentTime;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.3, t + 0.05);
        // Wail up then down
        osc.frequency.setValueAtTime(500, t);
        osc.frequency.linearRampToValueAtTime(1100, t + 0.4);
        osc.frequency.linearRampToValueAtTime(500, t + 0.8);
        osc.start();
        osc.stop(t + 0.9);
      };
      // Play siren repeatedly
      playSiren();
      sirenIntervalRef.current = window.setInterval(playSiren, 700);
    } catch {}

    // Keep for ~6 seconds then fade out
    const t = window.setTimeout(() => {
      onFinish();
    }, 6500);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      window.clearTimeout(t);
      try {
        if (sirenIntervalRef.current) window.clearInterval(sirenIntervalRef.current);
        audioCtxRef.current?.close();
      } catch {}
    };
  }, [onFinish]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-red-900 animate-warning-flash" />
      <div className="relative z-10 max-w-2xl w-full text-center text-white">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">WARNING: Virus detected on your device</h1>
        <p className="text-lg md:text-xl text-red-200 mb-6">System files are being deleted…</p>
        <p className="text-md text-red-100 mb-6">Please wait while we attempt to quarantine the threat…</p>

        <div className="bg-white/10 border border-white/20 rounded-full h-4 overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-red-400 via-yellow-400 to-red-500 animate-scan"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm">Deleting files… {progress}%</p>
      </div>
    </div>
  );
}

export default VirusWarningScreen;


