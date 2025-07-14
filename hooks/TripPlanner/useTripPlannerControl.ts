import { useState } from "react";
import { pageConst } from "@/constant/pageConst";
import { TravelType } from "@/app/types/TripPlanner/types";
import { Dayjs } from "dayjs";

type AIPromptStateTypes = {
  step1: {
    travelType: TravelType;
    selectedThemes: string[];
    themeDescription: string;
  };
  step2: {
    destination: string;
  };
  step3: {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };
}

export const useTripPlannerControl = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [aiPromptState, setAiPromptState] = useState<AIPromptStateTypes>({
    step1: {
      travelType: pageConst.travelType.domestic as TravelType,
      selectedThemes: [],
      themeDescription: "",
    },
    step2: {
      destination: "",
    },
    step3: {
      startDate: null,
      endDate: null,
    },
  });

  // =====common function =====
  // 스텝 제어 함수
  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePrevStep = () => setCurrentStep((prev) => prev - 1);
  const handleReset = () => setCurrentStep(0);

  // ===== Step 1 function =====
  // 여행 종류(국내, 해외) 변경 핸들러
  const handleTravelTypeChange = (travelType: TravelType) => {
    setAiPromptState((prev) => ({
      ...prev,
      step1: { ...prev.step1, travelType },
    }));
  };

  // 여행 테마 선택 핸들러
  const handleThemeChange = (themeId: string) => {
    setAiPromptState((prev) => {
      const currentThemes = prev.step1.selectedThemes;
      const newThemes = currentThemes.includes(themeId)
        ? currentThemes.filter((id) => id !== themeId)
        : [...currentThemes, themeId];
      return {
        ...prev,
        step1: { ...prev.step1, selectedThemes: newThemes },
      };
    });
  };

  // 여행 테마 설명 입력 핸들러
  const handleThemeDescriptionChange = (description: string) => {
    setAiPromptState((prev) => ({
      ...prev,
      step1: { ...prev.step1, themeDescription: description },
    }));
  };

  // Step1단계 완료 핸들러  
  const handleSubmitStep1 = () => {
    if (aiPromptState.step1.selectedThemes.length > 0) {
      handleNextStep();
    }
  };

  // Step 2 상태 변경 핸들러
  const handleDestinationChange = (destination: string) => {
    setAiPromptState((prev) => ({
      ...prev,
      step2: {
        destination: destination,
      },
    }));
  };

  // Step3 상태 변경 핸들러
  const handleStartDateChange = (startDate: Dayjs | null) => {
    setAiPromptState((prev) => ({
      ...prev,
      step3: { ...prev.step3, startDate },
    }));
  };

  const handleEndDateChange = (endDate: Dayjs | null) => {
    setAiPromptState((prev) => ({
      ...prev,
      step3: { ...prev.step3, endDate },
    }));
  };

  return {
    currentStep,
    aiPromptState,
    handleNextStep,
    handlePrevStep,
    handleReset,
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
  };
};
