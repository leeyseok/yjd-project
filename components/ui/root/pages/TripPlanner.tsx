"use client";
import React from "react";
import { useTripPlannerControl } from "@/hooks/TripPlanner/useTripPlannerControl";
import dynamic from "next/dynamic";

// 스텝 컴포넌트, 초기화면에 렌더링 되지 않는 컴포넌트
const Step1_TripTypeSelection = dynamic(() => import("../templates/Step1_TripTypeSelection"), { ssr: false });
const Step2_DestinationSelection = dynamic(() => import("../templates/Step2_DestinationSelection"), { ssr: false });
const Step3_DateSelection = dynamic(() => import("../templates/Step3_DateSelection"), { ssr: false });

interface TripPlannerProps {
  onBack: () => void; // 메인 화면으로 돌아가는 함수
}

const TripPlanner = ({ onBack }: TripPlannerProps) => {
  const {
    currentStep,
    aiPromptState,
    handleNextStep,
    // handlePrevStep,
    // handleReset,
    // Step 1
    handleTravelTypeChange,
    handleThemeChange,
    handleThemeDescriptionChange,
    handleSubmitStep1,
    // Step 2
    handleDestinationChange,
    // Step 3
    handleStartDateChange,
    handleEndDateChange,
  } = useTripPlannerControl();

  return (
    <div className="relative max-w-2xl max-h-[100%] sm:max-h-[90%] sm:rounded-lg w-full h-full mx-auto overflow-hidden bg-gray-50 p-2">
      {/* Step 1: 여행 테마 선택 */}
      {currentStep === 0 && (
        <Step1_TripTypeSelection
          travelType={aiPromptState.step1.travelType}
          selectedThemes={aiPromptState.step1.selectedThemes}
          description={aiPromptState.step1.themeDescription}
          onTravelTypeChange={handleTravelTypeChange}
          onThemeChange={handleThemeChange}
          onDescriptionChange={handleThemeDescriptionChange}
          onSubmit={handleSubmitStep1}
          onBack={onBack}
        />
      )}

      {/* Step 2: 여행 목적지 선택 */}
      {currentStep === 1 && (
        <Step2_DestinationSelection
          tripType={aiPromptState.step1.travelType}
          destination={aiPromptState.step2.destination}
          onSetDestination={handleDestinationChange}
          onNext={handleNextStep}
        />
      )}

      {/* Step 2: 日付の選択 */}
      {currentStep === 2 && (
        <Step3_DateSelection
          startDate={aiPromptState.step3.startDate}
          endDate={aiPromptState.step3.endDate}
          onSetStartDate={handleStartDateChange}
          onSetEndDate={handleEndDateChange}
          onComplete={handleNextStep}
        />
      )}

      {/* Step 3: AI旅行プラン */}
      {/* {currentStep === 3 && (
        <Step4_AITripPlan
          tripType={getTripTypeForCompatibility()}
          destination={destination}
          startDate={startDate}
          endDate={endDate}
          tripPlan={tripPlan}
          setTripPlan={setTripPlan}
          isGeneratingPlan={isGeneratingPlan}
          setIsGeneratingPlan={setIsGeneratingPlan}
          onFinish={handleFinish}
          onReset={handleReset}
          // 新しいテーマ情報を追加
          selectedThemes={selectedThemes}
          themeDescription={themeDescription}
          isInternational={isInternational}
        />
      )} */}

      {/* Step 0でない場合にのみ前のステップへボタン表示 */}
      {/* {currentStep > 0 && (
        <button
          onClick={handlePrevStep}
          className="fixed top-1/2 left-1/4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )} */}
    </div>
  );
};

export default TripPlanner;
