import React, { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { AIPromptStateTypes } from "@/app/types/TripPlanner/types";
import SectionTitle from "../atoms/SectionTitle";
import GeneratingPlanIndicator from "../organisms/GeneratingPlanIndicator";
import TripPlanDisplay from "../molecules/TripPlanDisplay";
import PlanActionButtons from "../molecules/PlanActionButtons";

interface Step4Props {
  aiPromptState: AIPromptStateTypes;
  onReset: () => void;
  onFinish: () => void;
}

const Step4_AITripPlan: React.FC<Step4Props> = ({
  aiPromptState,
  onReset,
  onFinish,
}) => {
  const { step1, step2, step3 } = aiPromptState;
  const { travelType, selectedThemes, themeDescription } = step1;
  const { destination } = step2;
  const { startDate, endDate } = step3;

  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isOverLimit, setIsOverLimit] = useState(false);
  const generateTripPlan = async () => {
    console.log("AI 플랜 생성을 시작합니다:", aiPromptState);
    try {
      setIsGeneratingPlan(true);
      setError(null);

      const response: Response = await fetch('/api/generate-trip-plan', {
        method: 'POST',
        body: JSON.stringify({
          travelType,
          selectedThemes,
          themeDescription,
          destination,
          startDate,
          endDate,
        }),
      });
      const { tripPlan, error } = await response.json();
      if (error) {
        setError(error);
        setGeneratedPlan(null);
        setIsOverLimit(true);
        return;
      }
      setGeneratedPlan(tripPlan || null);
    } catch (e) {
      console.log("error occurred:", e);
      setError("AI 플랜 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setGeneratedPlan(null);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  useEffect(() => {
    if (!generatedPlan && !isGeneratingPlan) {
      generateTripPlan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white p-6 shadow-lg">
      <SectionTitle title="AI 여행 플랜" />

      {error && (
        <Alert severity="warning" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {isGeneratingPlan ? (
        <GeneratingPlanIndicator
          destination={destination}
          startDate={startDate}
          endDate={endDate}
        />
      ) : (
        <>
          <div className="mt-4 flex flex-grow flex-col overflow-y-auto">
            <div className="flex-grow">
              <TripPlanDisplay tripPlan={generatedPlan} />
            </div>
          </div>
          {!isOverLimit && (
            <PlanActionButtons
              onReset={onReset}
              onRegenerate={generateTripPlan}
              onFinish={onFinish}
              isPlanGenerated={!!generatedPlan}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Step4_AITripPlan; 