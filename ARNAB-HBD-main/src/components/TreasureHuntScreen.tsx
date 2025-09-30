import { useState } from 'react';
import { Gift, Cake, Sparkles, Box, DoorOpen, Package, Flower2, Trophy } from 'lucide-react';

interface TreasureHuntScreenProps {
  onOpenGift: () => void;
}

interface HuntObject {
  id: number;
  icon: any;
  label: string;
  isCorrect: boolean;
  wrongMessage: string;
  position: { top: string; left: string };
  color: string;
}

function TreasureHuntScreen({ onOpenGift }: TreasureHuntScreenProps) {
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [foundCorrect, setFoundCorrect] = useState(false);

  const huntObjects: HuntObject[] = [
    {
      id: 1,
      icon: Cake,
      label: 'Birthday Cake',
      isCorrect: false,
      wrongMessage: "Haha nope! That's just for eating later!",
      position: { top: '20%', left: '15%' },
      color: 'text-pink-400',
    },
    {
      id: 2,
      icon: Box,
      label: 'Mystery Box',
      isCorrect: false,
      wrongMessage: "Close... but not your gift!",
      position: { top: '60%', left: '25%' },
      color: 'text-orange-400',
    },
    {
      id: 3,
      icon: Gift,
      label: 'Gift Box',
      isCorrect: true,
      wrongMessage: '',
      position: { top: '45%', left: '70%' },
      color: 'text-yellow-300',
    },
    {
      id: 4,
      icon: DoorOpen,
      label: 'Magic Door',
      isCorrect: false,
      wrongMessage: "Wrong door, explorer!",
      position: { top: '15%', left: '80%' },
      color: 'text-cyan-400',
    },
    {
      id: 5,
      icon: Package,
      label: 'Package',
      isCorrect: false,
      wrongMessage: "Try again, birthday star!",
      position: { top: '70%', left: '60%' },
      color: 'text-purple-400',
    },
    {
      id: 6,
      icon: Flower2,
      label: 'Flower Bouquet',
      isCorrect: false,
      wrongMessage: "These are just decorations!",
      position: { top: '30%', left: '40%' },
      color: 'text-green-400',
    },
    {
      id: 7,
      icon: Trophy,
      label: 'Trophy',
      isCorrect: false,
      wrongMessage: "You're a winner, but this isn't the prize!",
      position: { top: '55%', left: '10%' },
      color: 'text-amber-400',
    },
    {
      id: 8,
      icon: Sparkles,
      label: 'Magic Stars',
      isCorrect: false,
      wrongMessage: "Sparkly but not it!",
      position: { top: '25%', left: '55%' },
      color: 'text-blue-300',
    },
  ];

  const handleObjectClick = (object: HuntObject) => {
    if (clickedItems.includes(object.id)) {
      return;
    }

    setClickedItems([...clickedItems, object.id]);

    if (object.isCorrect) {
      // Success chime
      try {
        const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
        const ctx: AudioContext = new AudioCtx();
        const play = (freq: number, start: number, dur: number, vol: number) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, ctx.currentTime + start);
          g.gain.setValueAtTime(0.0001, ctx.currentTime + start);
          g.gain.exponentialRampToValueAtTime(vol, ctx.currentTime + start + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(ctx.currentTime + start);
          o.stop(ctx.currentTime + start + dur + 0.02);
        };
        // Simple up arpeggio
        play(880, 0.0, 0.18, 0.12); // A5
        play(1046.5, 0.15, 0.22, 0.11); // C6
        play(1318.5, 0.33, 0.26, 0.10); // E6
        setTimeout(() => { try { ctx.close(); } catch {} }, 1200);
      } catch {}
      setFoundCorrect(true);
      setMessage('You found it!');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 1200);
    } else {
      setMessage(object.wrongMessage);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Find the Hidden Gift
        </h2>
        <p className="text-lg text-yellow-300">
          Click on objects to search for the birthday surprise!
        </p>
        <p className="text-sm text-blue-200 mt-2">
          Attempts: {clickedItems.length}
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[500px] md:h-[600px] bg-gradient-to-br from-purple-800 via-pink-700 to-orange-600 rounded-3xl shadow-2xl border-4 border-yellow-300/50 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {huntObjects.map((object) => {
          const Icon = object.icon;
          const isClicked = clickedItems.includes(object.id);

          return (
            <button
              key={object.id}
              onClick={() => handleObjectClick(object)}
              disabled={isClicked}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isClicked
                  ? 'opacity-30 scale-90'
                  : 'hover:scale-125 hover:rotate-12 animate-pulse'
              }`}
              style={{
                top: object.position.top,
                left: object.position.left,
              }}
            >
              <div className="relative">
                <div className={`${!isClicked && 'animate-bounce'}`}>
                  <Icon
                    className={`w-12 h-12 md:w-16 md:h-16 ${object.color} drop-shadow-lg ${
                      !isClicked && 'hover:drop-shadow-2xl'
                    }`}
                  />
                </div>
                {!isClicked && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {object.label}
                  </div>
                )}
                {/* Removed glowing ping to make it harder to find */}
              </div>
            </button>
          );
        })}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          Hint: The obvious choice isn’t always right. Think like a detective.
        </div>
      </div>

      {showMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-yellow-300 max-w-md">
            <p className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              {message}
            </p>
          </div>
        </div>
      )}

      {foundCorrect && (
        <div className="mt-8">
          <button
            onClick={onOpenGift}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-xl font-bold py-3 px-8 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            Open Your Gift 🎁
          </button>
        </div>
      )}
    </div>
  );
}

export default TreasureHuntScreen;