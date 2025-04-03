'use client'
import { Button } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import TripPlanner from './TripPlanner'

const RootPage = () => {
  const [currentView, setCurrentView] = useState<0 | 1>(0); // 0: 메인, 1: 여행 계획 만들기

  const renderContent = () => {
    switch (currentView) {
      case 1:
        // 여행 계획 만들기
        return <TripPlanner onBack={() => setCurrentView(0)} />;
      default:
        // 메인
        return (
          <div className="flex flex-col md:flex-row justify-center items-center h-full gap-4">
            <Button 
              onClick={() => setCurrentView(1)}
              sx={{ 
                px: 4, 
                py: 2, 
                bgcolor: '#2563eb', 
                color: 'white', 
                borderRadius: '8px', 
                '&:hover': { bgcolor: '#1d4ed8' }, 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                width: { xs: '100%', md: 'auto' } 
              }}
            >
              <h1>여행 계획 만들기</h1>
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="relative h-[calc(100vh-50px)] w-full">
      <Image
        src="/main_bg.jpg"
        alt="logo"
        fill
        fetchPriority='high'
        className='relative'
      />
      <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center'>
        {renderContent()}
      </div>
    </div>
  );
};

export default RootPage;
