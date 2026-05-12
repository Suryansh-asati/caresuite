import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none';
  const errorClasses = 'border-red-500 focus:ring-red-500';
  const normalClasses = 'border-gray-300 focus:ring-blue-500';
  const generatedId = React.useId();
  const inputId = props.id ?? generatedId;
  const errorId = `${inputId}-error`;
  const ariaDescribedBy = error
    ? [props['aria-describedby'], errorId].filter(Boolean).join(' ')
    : props['aria-describedby'];

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseClasses} ${error ? errorClasses : normalClasses}`}
        aria-describedby={ariaDescribedBy}
        aria-invalid={props['aria-invalid'] ?? !!error}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
