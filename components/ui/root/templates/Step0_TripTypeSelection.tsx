import React, { useState } from 'react';
import { Button } from '@mui/material';
import { pageConst } from '@/constant/pageConst';
import ThemeGrid from '../molecules/ThemeGrid';
import SelectedThemesList from '../molecules/SelectedThemesList';
import TripTypeToggle from '../atoms/TripTypeToggle';
import CustomTextArea from '../atoms/CustomTextArea';

interface Step0Props {
  onSelectTripType: (themes: string[], description: string, isInternational: boolean) => void;
  onBack?: () => void;
}

const Step0_TripTypeSelection = ({ onSelectTripType, onBack }: Step0Props) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isInternational, setIsInternational] = useState(false);

  const handleThemeChange = (themeId: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  const handleSubmit = () => {
    if (selectedThemes.length > 0) {
      onSelectTripType(selectedThemes, description, isInternational);
    }
  };

  const getSelectedThemeNames = () => {
    return selectedThemes.map(id => 
      pageConst.tripThemes.find(theme => theme.id === id)?.name
    ).filter(Boolean).join(', ');
  };

  return (
    <div className="w-full h-full overflow-y-auto p-2">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            여행 테마 선택
          </h1>
          <p className="text-gray-600 text-lg">
            원하는 여행 스타일을 선택해주세요 (복수 선택 가능)
          </p>
        </div>

        {/* 국내/해외 토글 */}
        <div className="mb-8">
          <TripTypeToggle
            isInternational={isInternational}
            onChange={setIsInternational}
          />
        </div>

        {/* 여행 테마 그리드 */}
        <div className="mb-8">
          <ThemeGrid
            themes={pageConst.tripThemes}
            selectedThemes={selectedThemes}
            onThemeChange={handleThemeChange}
          />
        </div>

        {/* 선택된 테마 리스트 */}
        <div className="mb-8">
          <SelectedThemesList
            selectedThemes={selectedThemes}
            themes={pageConst.tripThemes}
            onRemoveTheme={handleThemeChange}
          />
        </div>

        {/* 요청사항 입력 */}
        <div className="mb-8">
          <CustomTextArea
            value={description}
            onChange={setDescription}
            label="💭 특별한 요청사항 (선택사항)"
            placeholder="예: 아이와 함께 여행이에요, 사진 찍기 좋은 곳 위주로, 예산은 100만원 정도, 특별한 기념일 여행..."
            rows={4}
          />
          <p className="text-sm text-gray-500 mt-2">
            AI가 더 정확한 여행 계획을 세울 수 있도록 자세히 적어주세요!
          </p>
        </div>

        {/* 완료 버튼 */}
        <div className="space-y-4">
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={selectedThemes.length === 0}
            className={`
              w-full h-14 rounded-xl text-lg font-bold transition-all duration-200
              ${selectedThemes.length > 0 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
            sx={{
              background: selectedThemes.length > 0 
                ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                : '#d1d5db',
              '&:hover': {
                background: selectedThemes.length > 0 
                  ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                  : '#d1d5db',
              },
              '&.Mui-disabled': {
                background: '#d1d5db',
                color: '#6b7280'
              }
            }}
          >
            {selectedThemes.length === 0 
              ? '🎯 여행 테마를 선택해주세요' 
              : `✈️ ${getSelectedThemeNames()} 여행 시작하기!`
            }
          </Button>

          {/* 메인으로 버튼 */}
          {onBack && (
            <Button
              onClick={onBack}
              variant="outlined"
              className="w-full h-12 rounded-xl font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              🏠 메인으로 돌아가기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step0_TripTypeSelection; 