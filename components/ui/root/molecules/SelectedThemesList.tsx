import React from 'react';

interface ThemeItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
}

interface SelectedThemesListProps {
  selectedThemes: string[];
  themes: ThemeItem[];
  onRemoveTheme: (themeId: string) => void;
}

const SelectedThemesList = ({ selectedThemes, themes, onRemoveTheme }: SelectedThemesListProps) => {
  if (selectedThemes.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
      <h3 className="font-bold text-blue-800 mb-3">
        🎯 선택된 테마
      </h3>
      <div className="flex flex-wrap gap-2">
        {selectedThemes.map(themeId => {
          const theme = themes.find(t => t.id === themeId);
          return theme ? (
            <div
              key={themeId}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
            >
              <span>{theme.icon}</span>
              <span>{theme.name}</span>
              <button
                onClick={() => onRemoveTheme(themeId)}
                className="ml-1 hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default SelectedThemesList; 