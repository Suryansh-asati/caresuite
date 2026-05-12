import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, error, children, ...props }) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none';
  const errorClasses = 'border-red-500 focus:ring-red-500';
  const normalClasses = 'border-gray-300 focus:ring-blue-500';
  const generatedId = React.useId();
  const selectId = props.id ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [props['aria-describedby'], errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`${baseClasses} ${error ? errorClasses : normalClasses}`}
        aria-invalid={error ? true : props['aria-invalid']}
        aria-describedby={describedBy}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
