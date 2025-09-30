import { Search, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  friendName: string;
  onStart: () => void;
}

function WelcomeScreen({ friendName, onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl w-full">
        <div className="mb-8 animate-bounce">
          <Search className="w-24 h-24 mx-auto text-yellow-300 mb-4" />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Welcome to the Birthday Challenge
        </h1>

        <h2 className="text-2xl md:text-4xl text-yellow-300 mb-4 flex items-center justify-center gap-2 flex-wrap">
          for {friendName}
          <Sparkles className="w-6 h-6" />
        </h2>

        <div className="my-12 bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-yellow-300/50 shadow-2xl">
          <p className="text-xl md:text-2xl text-pink-300 font-semibold mb-4">
            Can you find the hidden gift?
          </p>
          <p className="text-lg text-blue-200">
            Explore the scene and click on objects to discover where your special birthday surprise is hiding!
          </p>
        </div>

        <button
          onClick={onStart}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl font-bold py-4 px-12 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
        >
          Start the Hunt
        </button>

        <p className="mt-6 text-sm text-blue-300 animate-pulse">
          Hint: Not everything is what it seems...
        </p>
      </div>
    </div>
  );
}

export default WelcomeScreen;