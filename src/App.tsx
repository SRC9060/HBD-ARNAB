import { useState, useEffect, useRef } from 'react';
// Play happy birthday sound on first user interaction
function useBirthdaySound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const playSound = () => {
      if (!playedRef.current) {
        if (!audioRef.current) {
          audioRef.current = new Audio('/happy-birthday-254480.mp3');
        }
        audioRef.current.play().catch(() => {});
        playedRef.current = true;
        window.removeEventListener('pointerdown', playSound);
        window.removeEventListener('keydown', playSound);
      }
    };
    window.addEventListener('pointerdown', playSound);
    window.addEventListener('keydown', playSound);
    return () => {
      window.removeEventListener('pointerdown', playSound);
      window.removeEventListener('keydown', playSound);
    };
  }, []);
}
import WelcomeScreen from './components/WelcomeScreen';
import TreasureHuntScreen from './components/TreasureHuntScreen';
import CelebrationScreen from './components/CelebrationScreen';
import DecryptingScreen from './components/DecryptingScreen';
import VirusWarningScreen from './components/VirusWarningScreen';

type Screen = 'welcome' | 'hunt' | 'decrypt' | 'virus' | 'celebration';

function App() {
  useBirthdaySound();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const friendName = "Arnab";

  const handleStart = () => {
    setCurrentScreen('hunt');
  };

  const handleOpenGift = () => {
    setCurrentScreen('decrypt');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* All your screens remain unchanged */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen friendName={friendName} onStart={handleStart} />
      )}
      {currentScreen === 'hunt' && (
        <TreasureHuntScreen onOpenGift={handleOpenGift} />
      )}
      {currentScreen === 'decrypt' && (
        <DecryptingScreen onErrorComplete={() => setCurrentScreen('virus')} />
      )}
      {currentScreen === 'virus' && (
        <VirusWarningScreen onFinish={() => setCurrentScreen('celebration')} />
      )}
      {currentScreen === 'celebration' && (
        <CelebrationScreen friendName={friendName} />
      )}
    </div>
  );
}

export default App;