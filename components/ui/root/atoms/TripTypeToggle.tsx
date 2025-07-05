import React from 'react';

interface TripTypeToggleProps {
  isInternational: boolean;
  onChange: (isInternational: boolean) => void;
}

const TripTypeToggle = ({ isInternational, onChange }: TripTypeToggleProps) => {
  return (
    <div className="flex bg-gray-100 rounded-full p-1 w-fit mx-auto">
      <button
        onClick={() => onChange(false)}
        className={`
          px-6 py-2 rounded-full font-medium transition-all duration-200
          ${!isInternational 
            ? 'bg-blue-500 text-white shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
          }
        `}
      >
        🇰🇷 국내 여행
      </button>
      <button
        onClick={() => onChange(true)}
        className={`
          px-6 py-2 rounded-full font-medium transition-all duration-200
          ${isInternational 
            ? 'bg-blue-500 text-white shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
          }
        `}
      >
        🌍 해외 여행
      </button>
    </div>
  );
};

export default TripTypeToggle; 