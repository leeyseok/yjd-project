import React from "react";
import { Button } from "@mui/material";
import { pageConst } from "@/constant/pageConst";
import ThemeGrid from "../molecules/ThemeGrid";
import TripTypeToggle from "../atoms/TripTypeToggle";
import CustomTextArea from "../atoms/CustomTextArea";
import { Announcement } from "@mui/icons-material";
import { TravelType } from "@/app/types/TripPlanner/types";

interface Step1Props {
  travelType: TravelType;
  selectedThemes: string[];
  description: string;
  onTravelTypeChange: (travelType: TravelType) => void;
  onThemeChange: (themeId: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
  onBack?: () => void;
}

const Step1_TripTypeSelection: React.FC<Step1Props> = ({
  travelType,
  selectedThemes,
  description,
  onTravelTypeChange,
  onThemeChange,
  onDescriptionChange,
  onSubmit,
  onBack,
}) => {
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
            travelType={travelType}
            onChange={onTravelTypeChange}
          />
        </div>

        {/* 여행 테마 카드 */}
        <div className="mb-8">
          <ThemeGrid
            themes={pageConst.tripThemes}
            selectedThemes={selectedThemes}
            onThemeChange={onThemeChange}
          />
        </div>

        {/* 요청사항 입력 */}
        <div className="mb-8">
          <CustomTextArea
            value={description}
            onChange={onDescriptionChange}
            label="특별한 요청사항 (선택사항)"
            placeholder="예: 아이와 함께 여행이에요, 사진 찍기 좋은 곳 위주로, 예산은 100만원 정도, 특별한 기념일 여행..."
            rows={4}
            options={{
              labelIcon: {
                icon: (
                  <Announcement className="w-4 h-4 mr-1 text-gray-400  stroke-[1.5]" />
                ),
                position: "start",
              },
            }}
          />
          <p className="text-sm text-black font-bold mt-2">
            ※요청사항을 적어주시면 AI가 더 정확한 여행 계획을 세울 수 있어요!
          </p>
        </div>

        {/* 완료 버튼 */}
        <div className="space-y-4">
          <Button
            onClick={onSubmit}
            variant="contained"
            disabled={selectedThemes.length === 0}
            className={`
              w-full h-[48px] rounded-xl text-lg font-bold 
              ${selectedThemes.length > 0 ? "bg-blue-500" : "bg-gray-300"}
            `}
            sx={{
              "&:disabled": {
                cursor: "not-allowed", // 버튼 비활성화 시 커서 변경
                pointerEvents: "all !important",
              },
            }}
          >
            {selectedThemes.length === 0
              ? "🎯 여행 테마를 선택해주세요"
              : `✈️ 여행 시작하기!`}
          </Button>

          {/* 메인으로 버튼 */}
          <Button
            onClick={onBack}
            variant="outlined"
            className="w-full h-[48px] rounded-xl font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            🏠 메인으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step1_TripTypeSelection;
