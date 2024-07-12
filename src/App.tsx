import { useEffect, useState } from 'react';
import './index.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { createUserIfNotExists, updateUserCoins, getUserCoins } from './firestoreHelpers';

const App = () => {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (window.Telegram.WebApp.initDataUnsafe?.user?.username) {
      const username = window.Telegram.WebApp.initDataUnsafe.user.username;
      setUsername(username);
      createUserIfNotExists(username).then(async () => {
        const userCoins = await getUserCoins(username);
        setPoints(userCoins);
      });
    }
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - 12 < 0) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPoints = points + 12;
    setPoints(newPoints);
    setEnergy(energy - 12 < 0 ? 0 : energy - 12);
    setClicks([...clicks, { id: Date.now(), x, y }]);

    if (username) {
      await updateUserCoins(username, newPoints);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
    }, 1000); // Her 1 saniyede 1 enerji doluyor

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="mt-12 text-5xl font-bold flex items-center points-display">
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <TonConnectButton className="mt-4 ton-connect-button" />
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10 flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            <div className="ml-2 text-left">
              <span className="text-white text-2xl font-bold block">{energy}</span>
              <span className="text-white text-large opacity-75">/ 6500</span>
            </div>
          </div>
          <div className="w-full bg-[#9b59b6] rounded-full mt-4">
            <div className="bg-gradient-to-r from-[#833ab4] to-[#0088cc] h-4 rounded-full" style={{ width: `${(energy / 6500) * 100}%` }}></div>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleClick}>
            <div>
              {clicks.map((click) => (
                <div
                  key={click.id}
                  className="absolute text-5xl font-bold opacity-0"
                  style={{
                    top: `${click.y - 42}px`,
                    left: `${click.x - 28}px`,
                    animation: `float 1s ease-out`
                  }}
                  onAnimationEnd={() => setClicks((prevClicks) => prevClicks.filter(c => c.id !== click.id))}
                >
                  12
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
