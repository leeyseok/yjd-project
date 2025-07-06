import React from 'react';
import ThemeCard from '../atoms/ThemeCard';

interface ThemeItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface ThemeGridProps {
  themes: ThemeItem[];
  selectedThemes: string[];
  onThemeChange: (themeId: string) => void;
}

const ThemeGrid = ({ themes, selectedThemes, onThemeChange }: ThemeGridProps) => {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          🎯 여행 테마 선택
        </h2>
        <p className="text-gray-600">
          원하는 여행 스타일을 선택해주세요 ({selectedThemes.length}개 선택됨)
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto overflow-x-hidden border border-gray-300 rounded-lg p-4">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            id={theme.id}
            name={theme.name}
            icon={theme.icon}
            description={theme.description}
            isSelected={selectedThemes.includes(theme.id)}
            onClick={onThemeChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeGrid; 