import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
      <p className="text-red-800">{message}</p>
    </div>
  );
};

export default ErrorMessage;