'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Dayjs } from 'dayjs';
import { pageConst } from '@/constant/pageConst';

// 스텝 컴포넌트 임포트
import Step0_TripTypeSelection from '../templates/Step0_TripTypeSelection';
import Step1_DestinationSelection from '../templates/Step1_DestinationSelection';
import Step2_DateSelection from '../templates/Step2_DateSelection';
import Step3_AITripPlan from '../templates/Step3_AITripPlan';

interface TripPlannerProps {
  onBack: () => void; // 메인 화면으로 돌아가는 함수
}

const TripPlanner = ({ onBack }: TripPlannerProps) => {
  // 현재 스텝 (0, 1, 2, 3)
  const [step, setStep] = useState(0); 

  // Step 0 상태 : 여행 테마들과 부가 설명
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [themeDescription, setThemeDescription] = useState('');
  const [isInternational, setIsInternational] = useState(false);

  // Step 1 상태 : 목적지
  const [destination, setDestination] = useState('');

  // Step 2 상태 : 출발일, 도착일
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // Step 3 상태 : AI 여행 플랜
  const [tripPlan, setTripPlan] = useState<string>('');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  useEffect(() => {
    // 출발일 변경 시 도착일 자동 설정(추천날짜리스트에서 선택할시에는 예외)
    if (startDate && (!endDate || startDate.isAfter(endDate))) {
      setEndDate(startDate.add(1, 'day'));
    }
  }, [startDate, endDate]);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSelectTripType = (themes: string[], description: string, international: boolean) => {
    setSelectedThemes(themes);
    setThemeDescription(description);
    setIsInternational(international);
    handleNextStep(); // 다음 스텝으로 이동
  };

  const handleComplete = () => {
    // generateTripPlan 함수 호출
    handleGenerateTripPlan();
  };

  const handleFinish = () => {
    console.log('여행 계획 완료 및 저장:', {
      selectedThemes,
      themeDescription,
      isInternational,
      destination,
      startDate: startDate?.format('YYYY-MM-DD'),
      endDate: endDate?.format('YYYY-MM-DD'),
      tripPlan,
    });
    // TODO: 여행 플랜 저장 및 다음 단계로 이동 구현
    onBack(); // 저장 후 메인으로 돌아가기
  };


  const handleReset = () => {
    setStep(0);
    setSelectedThemes([]);
    setThemeDescription('');
    setIsInternational(false);
    setDestination('');
    setStartDate(null);
    setEndDate(null);
    setTripPlan('');
    setIsGeneratingPlan(false);
  };

  // 구형 tripType 호환성을 위한 변환
  const getTripTypeForCompatibility = () => {
    return isInternational ? pageConst.tripType.international : pageConst.tripType.domestic;
  };

  const handleGenerateTripPlan = async () => {
    console.log('=== generateTripPlan 함수 호출 ===');
    console.log('현재 상태값들:');
    console.log('- selectedThemes:', selectedThemes);
    console.log('- themeDescription:', themeDescription);
    console.log('- isInternational:', isInternational);
    console.log('- destination:', destination);
    console.log('- dates:', { startDate, endDate });
    
    if (!selectedThemes?.length || !destination || !startDate || !endDate) {
      const missingInfo = [];
      if (!selectedThemes?.length) missingInfo.push('여행 테마');
      if (!destination) missingInfo.push('목적지');
      if (!startDate) missingInfo.push('시작일');
      if (!endDate) missingInfo.push('종료일');
      
      alert(`필요한 여행 정보가 부족합니다:\n- ${missingInfo.join('\n- ')}`);
      return;
    }

    setIsGeneratingPlan(true);
    try {
      const themes = selectedThemes.map(id => 
        pageConst.themeNameMapping[id as keyof typeof pageConst.themeNameMapping] || id
      );
      
      const requestData = {
        themes,
        themeDescription,
        destination,
        dates: { startDate, endDate },
        isInternational
      };
      
      console.log('API 요청 데이터:', requestData);
      
      const response = await fetch('/api/generate-trip-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('여행 플랜 생성에 실패했습니다.');
      }

      const data = await response.json();
      setTripPlan(data.tripPlan);
      setStep(3);
    } catch (error) {
      console.error('여행 플랜 생성 오류:', error);
      // alert('여행 플랜 생성에 실패했습니다. 다시 시도해주세요.');
      
      // 샘플 플랜 생성 함수 호출
      const samplePlan = generateSamplePlan();
      setTripPlan(samplePlan);
      setStep(3);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const generateSamplePlan = () => {
    const themesText = selectedThemes.map(id => 
      pageConst.themeNameMapping[id as keyof typeof pageConst.themeNameMapping] || id
    ).join(', ');
    
    const locationText = isInternational ? '해외' : '국내';
    
    return `🌟 ${themesText} 중심의 ${locationText} 여행 플랜

📍 목적지: ${destination}
📅 여행 기간: ${startDate?.format('YYYY-MM-DD')} ~ ${endDate?.format('YYYY-MM-DD')}

${themeDescription ? `💭 추가 요청사항: ${themeDescription}\n` : ''}

🗓️ **일정 개요**

**1일차**
- 09:00 출발 및 도착
- 11:00 숙소 체크인 및 주변 탐방
- 14:00 현지 맛집에서 점심
- 16:00 주요 관광지 방문
- 19:00 저녁 식사 및 휴식

**2일차**
- 08:00 아침 식사
- 09:30 ${themesText} 테마 활동
- 12:00 현지 특색 음식 체험
- 15:00 문화 체험 프로그램
- 18:00 석양 명소 방문
- 20:00 현지 야시장 탐방

**3일차**
- 09:00 마지막 관광지 방문
- 11:00 기념품 쇼핑
- 13:00 출발 준비 및 귀가

💰 **예상 예산**
- 숙박: 10-15만원/박
- 식비: 5-8만원/일
- 교통비: 3-5만원/일
- 관광/활동비: 5-10만원/일

📝 **추천 팁**
- 현지 날씨를 확인하고 적절한 복장 준비
- 주요 관광지 사전 예약 권장
- 현지 교통카드 준비
- 응급상황 대비 연락처 저장

*이 플랜은 샘플이며, 실제 여행 시 현지 상황을 확인해주세요.*`;
  };

  return (
    <div className="relative max-w-2xl max-h-[100%] sm:max-h-[90%] sm:rounded-lg w-full h-full mx-auto overflow-hidden bg-gray-50 p-2">
      {/* Step 0: 여행 테마 선택 */}
      {step === 0 && (
        <Step0_TripTypeSelection 
          onSelectTripType={handleSelectTripType} 
          onBack={onBack}
        />
      )}

      {/* Step 1: 목적지 선택 */}
      {step === 1 && (
        <Step1_DestinationSelection
          tripType={getTripTypeForCompatibility()}
          destination={destination}
          onSetDestination={setDestination}
          onNext={handleNextStep}
        />
      )}

      {/* Step 2: 날짜 선택 */}
      {step === 2 && (
        <Step2_DateSelection
          startDate={startDate}
          endDate={endDate}
          onSetStartDate={setStartDate}
          onSetEndDate={setEndDate}
          onComplete={handleComplete}
        />
      )}

      {/* Step 3: AI 여행 플랜 */}
      {step === 3 && (
        <Step3_AITripPlan
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
      )}

      {/* Step 0이 아닐 때만 이전 단계 버튼 표시 */}
      {step > 0 && (
        <Button
          onClick={handlePreviousStep}
          variant="outlined"
          sx={{ mt: 3, display: 'block', mx: 'auto', color: 'white', borderColor: 'white' }}
          disabled={isGeneratingPlan}
        >
          이전 단계로
        </Button>
      )}
    </div>
  );
};

export default TripPlanner;