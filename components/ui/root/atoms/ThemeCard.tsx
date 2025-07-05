import React from 'react';

interface ThemeCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const ThemeCard = ({ 
  id, 
  name, 
  icon, 
  description, 
  isSelected, 
  onClick 
}: ThemeCardProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`
        relative cursor-pointer rounded-2xl p-4 h-36 flex flex-col items-center justify-center text-center
        transition-all duration-300 transform hover:scale-105 border-2
        ${isSelected 
          ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-purple-600 text-white scale-105 shadow-lg' 
          : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm'
        }
        group
      `}
    >
      {/* 선택 체크마크 */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center">
          <span className="text-blue-500 font-bold text-sm">✓</span>
        </div>
      )}
      
      {/* 아이콘 */}
      <div className="text-4xl mb-2 transition-transform group-hover:scale-110">
        {icon}
      </div>
      
      {/* 제목 */}
      <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
        {name}
      </h3>
      
      {/* 설명 */}
      <p className={`text-xs leading-tight line-clamp-2 ${isSelected ? 'text-gray-100' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
};

export default ThemeCard; 