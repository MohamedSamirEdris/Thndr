import { useEffect } from 'react';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      <img
        src="/nasdaq-logo.svg"
        alt="Nasdaq Logo"
        className="w-64 h-64 animate-fade-in"
      />
      <div className="fixed bottom-8 text-gray-600">Mohamed Samir</div>
    </div>
  );
};
