import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import TreasureHuntScreen from './components/TreasureHuntScreen';
import CelebrationScreen from './components/CelebrationScreen';
import DecryptingScreen from './components/DecryptingScreen';
import VirusWarningScreen from './components/VirusWarningScreen';

type Screen = 'welcome' | 'hunt' | 'decrypt' | 'virus' | 'celebration';

function App() {
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