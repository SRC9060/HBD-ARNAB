import { useState } from 'react';
import { Cake, Gift, Heart, PartyPopper } from 'lucide-react';
import Confetti from './Confetti';
import Fireworks from './Fireworks';
import Balloons from './Balloons';

interface CelebrationScreenProps {
  friendName: string;
}

function CelebrationScreen({ friendName }: CelebrationScreenProps) {
  const [showGift, setShowGift] = useState(false);
  // Set this to your Happy Birthday audio URL; it will auto-play when the final message opens
  const happyBirthdayAudioUrl = "/happy-birthday-254480.mp3";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <Confetti />
      <Fireworks />
      <Balloons />

      <div className="relative z-10 text-center max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/20">
          <div className="mb-6 flex justify-center gap-4">
            <Cake className="w-16 h-16 text-pink-300 animate-bounce" />
            <PartyPopper className="w-16 h-16 text-yellow-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>

          <div className="mb-6">
            <p className="text-2xl md:text-3xl text-green-300 font-semibold mb-2">
              You found it!
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">🎂 Happy Birthday {friendName}! 🎂</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6">You survived the prank — now go party 🚀</p>

          <div className="space-y-4 text-lg md:text-xl text-blue-100 mb-8">
            <p className="flex items-center justify-center gap-2 flex-wrap">
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
              <span>Wishing you a year full of joy, laughter, and success!</span>
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            </p>
            <p className="text-3xl">🚀</p>
          </div>

          {!showGift ? (
            <button
              onClick={() => setShowGift(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl font-bold py-4 px-12 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto animate-pulse"
            >
              <Gift className="w-6 h-6" />
              Open Your Gift
            </button>
          ) : (
            <div className="mt-8 animate-fadeIn">
              <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-2xl p-6 md:p-8 shadow-xl border-4 border-white/30">
                <div className="mb-4">
                  <Gift className="w-12 h-12 mx-auto text-white animate-bounce" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Message from IT SUPERBS :)
                </h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
                  {happyBirthdayAudioUrl && (
                    <audio autoPlay preload="auto" className="hidden">
                      <source src={happyBirthdayAudioUrl} />
                    </audio>
                  )}
                  <p className="text-lg md:text-xl text-white leading-relaxed mb-4">
                    <span className="text-brown-300 font-bold">Dear Panu</span>,
                    May this year bring you endless opportunities, wonderful adventures,
                    and cherished memories that last a lifetime.
                  </p>
                  <p className="text-lg md:text-xl text-white leading-relaxed mb-4">
                    You deserve all the happiness in the world! Keep shining bright,
                    keep spreading joy, and never stop chasing your dreams.
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-green-100">
                    Here's to another amazing year of YOU!  ~IT SUPERBS
                  </p>
                  <p className="text-3xl mt-4">🌟✨🎊🎈</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CelebrationScreen;