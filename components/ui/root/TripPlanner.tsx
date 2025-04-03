'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Dayjs } from 'dayjs';
import { pageConst } from '@/constant/pageConst';

// 스텝 컴포넌트 임포트
import Step0_TripTypeSelection from './step/Step0_TripTypeSelection';
import Step1_DestinationSelection from './step/Step1_DestinationSelection';
import Step2_DateSelection from './step/Step2_DateSelection';

interface TripPlannerProps {
  onBack: () => void; // 메인 화면으로 돌아가는 함수
}

const TripPlanner = ({ onBack }: TripPlannerProps) => {
  // 현재 스텝 (0, 1, 2)
  const [step, setStep] = useState(0); 

  // Step 0 상태 : 여행타입
  type TripType = typeof pageConst.tripType.domestic | typeof pageConst.tripType.international | null;
  const [tripType, setTripType] = useState<TripType>(null);

  // Step 1 상태 : 목적지
  const [destination, setDestination] = useState('');

  // Step 2 상태 : 출발일, 도착일
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

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

  const handleSelectTripType = (type: TripType) => {
    setTripType(type);
    handleNextStep(); // 다음 스텝으로 이동
  };

  const handleComplete = () => {
    console.log('여행 계획 완료:', {
      tripType,
      destination,
      startDate: startDate?.format('YYYY-MM-DD'),
      endDate: endDate?.format('YYYY-MM-DD'),
    });
    // TODO: 여기서 실제 완료이후 할것 작성성
  };

  // 스텝별 컨텐츠 렌더링
  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return <Step0_TripTypeSelection onSelectTripType={handleSelectTripType} />;
      case 1:
        return (
          <Step1_DestinationSelection
            tripType={tripType}
            destination={destination}
            onSetDestination={setDestination}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <Step2_DateSelection
            startDate={startDate}
            endDate={endDate}
            onSetStartDate={setStartDate}
            onSetEndDate={setEndDate}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {renderCurrentStep()}
      <Button
        onClick={step === 0 ? onBack : handlePreviousStep}
        variant="outlined"
        sx={{ mt: 3, display: 'block', mx: 'auto', color: 'white', borderColor: 'white' }} // 버튼 스타일 조정
      >
        {step === 0 ? '메인으로' : '이전 단계로'}
      </Button>
    </div>
  );
};

export default TripPlanner;