import React from 'react';

export default function Alert({ type = 'success', message }) {
  const color = type === 'error' ? 'bg-red-100 text-red-700 border-red-400' : 'bg-green-100 text-green-700 border-green-400';
  return (
    <div className={`border ${color} px-4 py-2 rounded mb-4`}>
      {message}
    </div>
  );
}
