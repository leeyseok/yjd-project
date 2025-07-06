"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import useTripPlannerControl from "@/hooks/TripPlanner/useTripPlannerControl";

// 스텝 컴포넌트 임포트
import Step1_TripTypeSelection from "../templates/Step1_TripTypeSelection";

interface TripPlannerProps {
  onBack: () => void; // 메인 화면으로 돌아가는 함수
}

const TripPlanner = ({ onBack }: TripPlannerProps) => {
  const {
    step,
    handlePreviousStep,
    handleSelectTripType
  } = useTripPlannerControl();

  // 사용하지 않는 상태들과 useEffect 제거
  const [isGeneratingPlan] = useState(false);

  // const handleComplete = () => {
  //   // generateTripPlan 함수 호출
  //   handleGenerateTripPlan();
  // };

  // const handleFinish = () => {
  //   console.log('여행 계획 완료 및 저장:', {
  //     ...aiPromptState.step1,
  //     destination,
  //     startDate: startDate?.format('YYYY-MM-DD'),
  //     endDate: endDate?.format('YYYY-MM-DD'),
  //     tripPlan,
  //   });
  //   // TODO: 여행 플랜 저장 및 다음 단계로 이동 구현
  //   onBack(); // 저장 후 메인으로 돌아가기
  // };

  // const handleReset = () => {
  //   setStep(0);
  //   setAiPromptState((prev) => ({
  //     ...prev,
  //     step1: {
  //       isInternational: false,
  //       selectedThemes: [],
  //       themeDescription: '',
  //     },
  //   }));
  //   setDestination('');
  //   setStartDate(null);
  //   setEndDate(null);
  //   setTripPlan('');
  //   setIsGeneratingPlan(false);
  // };
  // const handleGenerateTripPlan = async () => {
  //   console.log('=== generateTripPlan 함수 호출 ===');
  //   console.log('현재 상태값들:');
  //   console.log('- selectedThemes:', selectedThemes);
  //   console.log('- themeDescription:', themeDescription);
  //   console.log('- isInternational:', isInternational);
  //   console.log('- destination:', destination);
  //   console.log('- dates:', { startDate, endDate });

  //   if (!selectedThemes?.length || !destination || !startDate || !endDate) {
  //     const missingInfo = [];
  //     if (!selectedThemes?.length) missingInfo.push('여행 테마');
  //     if (!destination) missingInfo.push('목적지');
  //     if (!startDate) missingInfo.push('시작일');
  //     if (!endDate) missingInfo.push('종료일');

  //     alert(`필요한 여행 정보가 부족합니다:\n- ${missingInfo.join('\n- ')}`);
  //     return;
  //   }

  //   setIsGeneratingPlan(true);
  //   try {
  //     const themes = selectedThemes.map(id =>
  //       pageConst.themeNameMapping[id as keyof typeof pageConst.themeNameMapping] || id
  //     );

  //     const requestData = {
  //       themes,
  //       themeDescription,
  //       destination,
  //       dates: { startDate, endDate },
  //       isInternational
  //     };

  //     console.log('API 요청 데이터:', requestData);

  //     const response = await fetch('/api/generate-trip-plan', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(requestData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('여행 플랜 생성에 실패했습니다.');
  //     }

  //     const data = await response.json();
  //     setTripPlan(data.tripPlan);
  //     setStep(3);
  //   } catch (error) {
  //     console.error('여행 플랜 생성 오류:', error);
  //     // alert('여행 플랜 생성에 실패했습니다. 다시 시도해주세요.');

  //     // 샘플 플랜 생성 함수 호출
  //     const samplePlan = generateSamplePlan();
  //     setTripPlan(samplePlan);
  //     setStep(3);
  //   } finally {
  //     setIsGeneratingPlan(false);
  //   }
  // };

  return (
    <div className="relative max-w-2xl max-h-[100%] sm:max-h-[90%] sm:rounded-lg w-full h-full mx-auto overflow-hidden bg-gray-50 p-2">
      {/* Step 1: 여행 테마 선택 */}
      {step === 0 && (
        <Step1_TripTypeSelection
          onSelectTripType={handleSelectTripType}
          onBack={onBack}
        />
      )}

      {/* Step 2: 목적지 선택 */}
      {/* {step === 1 && (
        <Step2_DestinationSelection
          tripType={getTripTypeForCompatibility()}
          destination={destination}
          onSetDestination={setDestination}
          onNext={handleNextStep}
        />
      )} */}

      {/* Step 2: 날짜 선택 */}
      {/* {step === 2 && (
        <Step3_DateSelection
          startDate={startDate}
          endDate={endDate}
          onSetStartDate={setStartDate}
          onSetEndDate={setEndDate}
          onComplete={handleComplete}
        />
      )} */}

      {/* Step 3: AI 여행 플랜 */}
      {/* {step === 3 && (
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
          // 새로운 테마 정보 추가
          selectedThemes={selectedThemes}
          themeDescription={themeDescription}
          isInternational={isInternational}
        />
      )} */}

      {/* Step 0이 아닐 때만 이전 단계 버튼 표시 */}
      {step > 0 && (
        <Button
          onClick={handlePreviousStep}
          variant="outlined"
          sx={{
            mt: 3,
            display: "block",
            mx: "auto",
            color: "white",
            borderColor: "white",
          }}
          disabled={isGeneratingPlan}
        >
          이전 단계로
        </Button>
      )}
    </div>
  );
};

export default TripPlanner;
