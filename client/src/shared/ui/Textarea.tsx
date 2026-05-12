import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, ...props }) => {
  const generatedId = React.useId();
  const textareaId = props.id ?? generatedId;
  const errorId = `${textareaId}-error`;
  const baseClasses = 'w-full px-3 py-2 border rounded-md focus:outline-none';
  const errorClasses = 'border-red-500 focus:ring-red-500';
  const normalClasses = 'border-gray-300 focus:ring-blue-500';

  return (
    <div>
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        aria-invalid={error ? true : props['aria-invalid']}
        aria-describedby={error ? errorId : props['aria-describedby']}
        className={`${baseClasses} ${error ? errorClasses : normalClasses}`}
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

export default Textarea;
