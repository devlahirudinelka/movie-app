import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <p className="text-gray-300 text-xl mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-bgfive hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};