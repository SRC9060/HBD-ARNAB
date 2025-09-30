import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
}

function Balloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#FF69B4', '#FFD700'];
    const newBalloons: Balloon[] = [];

    for (let i = 0; i < 15; i++) {
      newBalloons.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setBalloons(newBalloons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {balloons.map(balloon => (
        <div
          key={balloon.id}
          className="absolute bottom-0 animate-float"
          style={{
            left: `${balloon.left}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
          }}
        >
          <div className="relative">
            <div
              className="w-12 h-14 rounded-full shadow-lg"
              style={{
                backgroundColor: balloon.color,
                boxShadow: `inset -10px -10px 20px rgba(0, 0, 0, 0.2)`,
              }}
            />
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-400"
              style={{
                background: 'linear-gradient(to bottom, rgba(100, 100, 100, 0.5), transparent)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Balloons;