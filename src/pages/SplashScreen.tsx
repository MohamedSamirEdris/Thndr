import { useEffect, useState } from 'react';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => Math.min(prev + 20, 100));
    }, 400);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="relative">
        <img
          src="/nasdaq1.svg"
          alt="Nasdaq Logo"
          className="w-64 h-64 animate-bounce-gentle"
        />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-24 space-y-2 text-center">
        <h1 className="text-2xl font-bold text-gray-800 animate-fade-in">
          Stock Market Explorer
        </h1>
        <p className="text-gray-600 animate-fade-in delay-300">
          Your gateway to financial markets
        </p>
      </div>

      <div className="fixed bottom-8 text-gray-600 animate-fade-in delay-500">
        Developed by: Mohamed Samir
      </div>
    </div>
  );
};
