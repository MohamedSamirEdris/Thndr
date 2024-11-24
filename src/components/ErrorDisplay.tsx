/* eslint-disable @typescript-eslint/no-unused-expressions */
import { RateLimitError, NetworkError } from '@/types/errors';
import { useRootStore } from '@/stores/StoreContext';
import React from 'react';

interface ErrorDisplayProps {
  error: Error;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  let title = 'Error loading stocks';
  let message = 'Please try again later';
  let icon = (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  );

  const { uiStore } = useRootStore();
  const [, forceUpdate] = React.useState({});
  
  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (error instanceof RateLimitError && uiStore.isRateLimited) {
      timer = setInterval(() => {
        if (uiStore.rateLimitRemainingSeconds > 0) {
          forceUpdate({});
        } else {
          timer && clearInterval(timer);
          forceUpdate({}); // Force one last update when timer reaches 0
        }
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [error, uiStore]);
  
  if (error instanceof RateLimitError) {
    title = 'Rate Limit Exceeded';
    const seconds = uiStore.rateLimitRemainingSeconds;
    message = seconds > 0 
      ? `Retrying in ${seconds} seconds...` 
      : 'Please wait a moment before trying again';
    icon = (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    );
  } else if (error instanceof NetworkError) {
    title = 'Network Error';
    message = 'Please check your internet connection';
    icon = (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-red-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {icon}
      </svg>
      <div className="text-lg font-medium">{title}</div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};
