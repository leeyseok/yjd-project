import { useState } from "react";

const useTripPlannerControl = () => {
  // 현재 스텝 (0, 1, 2, 3)
  const [step, setStep] = useState(0);
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const [aiPromptState, setAiPromptState] = useState({
    // step1 state
    step1: {
      isInternational: false,
      selectedThemes: [] as string[],
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

  const handleSelectTripType = (
    themes: string[],
    description: string,
    international: boolean
  ) => {
    setAiPromptState((prev) => ({
      ...prev,
      step1: {
        isInternational: international,
        selectedThemes: themes,
        themeDescription: description,
      },
    }));
    handleNextStep();
  };
  return {
    step,
    handleNextStep,
    handlePreviousStep,
    aiPromptState,
    setAiPromptState,
    handleSelectTripType,
  };
};

export default useTripPlannerControl;
