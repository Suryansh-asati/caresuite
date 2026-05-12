import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center"
      role="status"
      aria-live="polite"
    >
      <div
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"
        aria-hidden="true"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
