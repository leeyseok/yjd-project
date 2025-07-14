import React from 'react';
import { TravelType } from '@/app/types/TripPlanner/types';
import { pageConst } from '@/constant/pageConst';

interface TripTypeToggleProps {
  travelType: TravelType;
  onChange: (travelType: TravelType) => void;
}

const TripTypeToggle = ({ travelType, onChange }: TripTypeToggleProps) => {
  return (
    <div className="flex bg-gray-100 rounded-full p-1 w-fit mx-auto">
      <button
        onClick={() => onChange(pageConst.travelType.domestic as TravelType)}
        className={`
          px-6 py-2 rounded-full font-medium transition-all duration-200
          ${travelType === pageConst.travelType.domestic 
            ? 'bg-blue-500 text-white shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
          }
        `}
      >
        🇰🇷 국내 여행
      </button>
      <button
        onClick={() => onChange(pageConst.travelType.international as TravelType)}
        className={`
          px-6 py-2 rounded-full font-medium transition-all duration-200
          ${travelType === pageConst.travelType.international 
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