import React from 'react'
import LanguageChanger from '../../../LanguageChanger';

const HeaderPage = () => {
  return (
    <header className='w-full bg-white shadow-sm h-[50px]'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center space-x-8'>
          {/* 로고 */}
          <h1 className='flex items-end text-2xl font-bold'>
            <span className='text-blue-600'>여정다</span>
            <span className='text-sm text-blue-600 ml-2'>여</span>
            <span className='text-sm text-black'>행을</span>
            <span className='text-sm text-blue-600 ml-2'>정</span>
            <span className='text-sm text-black'>하</span>
            <span className='text-sm text-blue-600'>다</span>
          </h1>
          
          {/*
          <nav className='hidden md:flex space-x-6'>
            <a href='#' className='text-gray-600 hover:text-blue-600 transition-colors'>
              나의 여행
            </a> */}
            {/* TODO 
              내가 만든 여행 플랜 저장하는곳 이동 여행은 캐시에 저장
            나의 여행
          </nav>
          */}
        </div>
        
        <div className='flex items-center space-x-4 '>
          <LanguageChanger />
        </div>
      </div>
    </header>
  )
}

export default HeaderPage