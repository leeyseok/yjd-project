import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Paper, Typography, Box, Alert } from '@mui/material';
import { Dayjs } from 'dayjs';
import { pageConst } from '@/constant/pageConst';

interface McpStatus {
  available: boolean;
  message: string;
  serverKey?: string;
  endpoint?: string;
}

interface Step3Props {
  tripType: typeof pageConst.tripType.domestic | typeof pageConst.tripType.international | null;
  destination: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  tripPlan: string;
  setTripPlan: (plan: string) => void;
  isGeneratingPlan: boolean;
  setIsGeneratingPlan: (isGenerating: boolean) => void;
  onFinish: () => void;
  onReset: () => void;
  selectedThemes?: string[];
  themeDescription?: string;
  isInternational?: boolean;
}

const Step3_AITripPlan = ({
  tripType,
  destination,
  startDate,
  endDate,
  tripPlan,
  setTripPlan,
  isGeneratingPlan,
  setIsGeneratingPlan,
  onFinish,
  onReset,
  selectedThemes = [],
  themeDescription = '',
  isInternational = false
}: Step3Props) => {
  const [mcpStatus, setMcpStatus] = useState<McpStatus | null>(null);
  const [isCheckingMcpStatus, setIsCheckingMcpStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CSS 애니메이션 스타일 주입
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0%, 100% { opacity: 0.5; transform: scale(0.95); }
        50% { opacity: 1; transform: scale(1); }
      }
      
      @keyframes pulse {
        0% { opacity: 0.6; }
        100% { opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // MCP 상태 확인
  const checkMcpStatus = async () => {
    setIsCheckingMcpStatus(true);
    try {
      const response = await fetch('/api/mcp-status');
      if (!response.ok) {
        throw new Error('Perplexity API 상태 확인에 실패했습니다.');
      }
      const status = await response.json();
      setMcpStatus(status);
      return status.available;
    } catch (error) {
      console.error('Perplexity API 상태 확인 중 오류 발생:', error);
      setMcpStatus({
        available: false,
        message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      });
      return false;
    } finally {
      setIsCheckingMcpStatus(false);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트되면 자동으로 Perplexity API 상태 확인
    const initializeComponent = async () => {
      const mcpAvailable = await checkMcpStatus();
      
      // Perplexity API 상태 확인 후 여행 플랜이 없으면 자동으로 생성 시작
      if (!tripPlan && !isGeneratingPlan) {
        generateTripPlan();
      }
    };
    
    initializeComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateTripPlan = async () => {
    // 디버깅을 위한 현재 상태값 출력
    console.log('여행 플랜 생성 시작 - 현재 상태값들:', {
      tripType,
      destination,
      startDate: startDate?.format('YYYY-MM-DD'),
      endDate: endDate?.format('YYYY-MM-DD'),
      selectedThemes,
      themeDescription,
      isInternational,
      startDateExists: !!startDate,
      endDateExists: !!endDate,
      destinationExists: !!destination,
      tripTypeExists: !!tripType
    });

    // 부족한 정보를 구체적으로 확인
    const missingInfo = [];
    if (!tripType && selectedThemes.length === 0) missingInfo.push('여행 테마');
    if (!destination) missingInfo.push('목적지');
    if (!startDate) missingInfo.push('출발일');
    if (!endDate) missingInfo.push('도착일');

    if (missingInfo.length > 0) {
      const errorMessage = `다음 정보가 부족합니다: ${missingInfo.join(', ')}`;
      console.error('여행 정보 부족:', errorMessage);
      setError(errorMessage);
      return;
    }
    
    setError(null);
    setIsGeneratingPlan(true);
    
    try {
      // 테마 이름 변환
      const themeNames = selectedThemes.map(themeId => {
        const themeMap: Record<string, string> = {
          'relaxation': '휴양형 여행',
          'culture': '문화·역사 탐방',
          'food': '미식 여행',
          'adventure': '어드벤처 여행',
          'wellness': '웰니스·힐링',
          'business': '비즈니스 여행',
          'luxury': '럭셔리 여행',
          'eco': '에코 투어리즘',
          'entertainment': '엔터테인먼트',
          'pilgrimage': '성지 순례',
          'anime': '애니 여행'
        };
        return themeMap[themeId] || themeId;
      });

      // API 서버와 통신하기 위한 데이터 준비
      const tripData = {
        tripType: isInternational ? '해외' : '국내',
        destination,
        startDate: startDate!.format('YYYY-MM-DD'),
        endDate: endDate!.format('YYYY-MM-DD'),
        duration: endDate!.diff(startDate!, 'day') + 1,
        themes: themeNames,
        themeDescription: themeDescription || ''
      };

      console.log('API 요청 데이터:', tripData);
      
      // MCP 서버로 요청 보내기
      const response = await fetch('/api/generate-trip-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData),
      });
      
      if (!response.ok) {
        throw new Error('여행 플랜 생성에 실패했습니다.');
      }
      
      const data = await response.json();
      setTripPlan(data.tripPlan);
      
      // 서버에서 반환된 알림 메시지가 있으면 표시
      if (data.notice) {
        setError(data.notice);
      }
    } catch (error) {
      console.error('여행 플랜 생성 중 오류 발생:', error);
      setError(error instanceof Error ? error.message : '여행 플랜 생성 중 오류가 발생했습니다.');
      
      // 에러 발생 시에도 샘플 플랜 생성
      if (!tripPlan) {
        const samplePlan = generateSamplePlan(tripType, destination, startDate, endDate);
        setTripPlan(samplePlan);
      }
    } finally {
      setIsGeneratingPlan(false);
    }
  };
  
  // API 연결 전 테스트용 샘플 플랜 생성 함수
  const generateSamplePlan = (tripType: any, destination: string, startDate: Dayjs | null, endDate: Dayjs | null) => {
    const themes = selectedThemes.length > 0 ? selectedThemes.map(id => {
      const themeMap: Record<string, string> = {
        'relaxation': '휴양형 여행',
        'culture': '문화·역사 탐방',
        'food': '미식 여행',
        'adventure': '어드벤처 여행',
        'wellness': '웰니스·힐링',
        'business': '비즈니스 여행',
        'luxury': '럭셔리 여행',
        'eco': '에코 투어리즘',
        'entertainment': '엔터테인먼트',
        'pilgrimage': '성지 순례',
        'anime': '애니 여행'
      };
      return themeMap[id] || id;
    }).join(', ') : '일반';

    const duration = endDate && startDate ? endDate.diff(startDate, 'day') + 1 : 1;
    const tripTypeKorean = isInternational ? '해외' : '국내';
    
    return `# 🌟 ${destination} ${themes} ${duration}일 여행 계획

## 📅 여행 개요
- **목적지**: ${destination}
- **여행 기간**: ${startDate?.format('YYYY.MM.DD')} ~ ${endDate?.format('YYYY.MM.DD')} (${duration}일)
- **여행 타입**: ${tripTypeKorean} ${themes} 여행
${themeDescription ? `- **특별 요청사항**: ${themeDescription}` : ''}

## 🎯 선택된 테마에 맞는 특별 추천
${selectedThemes.includes('food') ? '🍽️ **미식 체험**: 현지 전통 음식과 유명 맛집 탐방에 중점을 둔 일정' : ''}
${selectedThemes.includes('culture') ? '🏛️ **문화 탐방**: 박물관, 유적지, 전통 건축물 위주의 깊이 있는 문화 체험' : ''}
${selectedThemes.includes('relaxation') ? '🏖️ **휴양 힐링**: 스파, 리조트에서의 편안한 휴식과 재충전' : ''}
${selectedThemes.includes('adventure') ? '🏔️ **모험 활동**: 액티비티와 야외 활동 중심의 역동적인 여행' : ''}

## 📍 일차별 상세 일정

### 1일차 (${startDate?.format('MM.DD')})
**오전 09:00** - 출발 및 현지 도착
**오전 11:00** - 숙소 체크인 후 휴식
**오후 14:00** - ${destination} 대표 관광지 1 방문
**오후 16:00** - 현지 카페에서 티타임
**오후 18:00** - 환영 디너 (현지 특색 음식)
**오후 20:00** - 숙소 복귀 및 자유 시간

${duration > 1 ? `
### 2일차 (${startDate?.add(1, 'day').format('MM.DD')})
**오전 08:00** - 호텔 조식
**오전 09:30** - ${selectedThemes.includes('culture') ? '박물관 또는 역사 유적지' : selectedThemes.includes('adventure') ? '아웃도어 액티비티' : selectedThemes.includes('food') ? '전통 시장 투어' : '주요 관광지'} 방문
**오후 12:00** - ${selectedThemes.includes('food') ? '현지 유명 맛집에서 점심' : '현지 식당에서 점심'}
**오후 14:00** - ${destination} 핵심 관광지 탐방
**오후 17:00** - ${selectedThemes.includes('relaxation') ? '스파 또는 마사지' : selectedThemes.includes('entertainment') ? '현지 공연 관람' : '쇼핑 및 기념품 구입'}
**오후 19:00** - 저녁 식사 및 야경 감상
**오후 21:00** - 숙소 복귀
` : ''}

${duration > 2 ? `
### 3일차 (${startDate?.add(2, 'day').format('MM.DD')})
**오전 08:00** - 호텔 조식
**오전 10:00** - ${selectedThemes.includes('pilgrimage') ? '드라마/영화 촬영지 순례' : selectedThemes.includes('anime') ? '애니메이션 성지 방문' : selectedThemes.includes('wellness') ? '요가 또는 명상 프로그램' : '자연 명소'} 방문
**오후 12:30** - 점심 식사
**오후 14:00** - 마지막 관광 및 체험 활동
**오후 16:00** - 출발 준비 및 공항/역으로 이동
**오후 18:00** - 귀국 출발
` : ''}

## 🍽️ 추천 맛집
${selectedThemes.includes('food') ? `
- **전통 음식 전문점**: 현지 대표 요리 체험
- **미슐랭 가이드 레스토랑**: 고급 다이닝 경험  
- **현지인 추천 맛집**: 숨은 맛집 발굴
- **쿠킹 클래스**: 현지 요리 배우기 체험
` : `
- **현지 대표 음식점**: ${destination} 전통 요리
- **인기 카페**: 현지 카페 문화 체험
- **야시장/시장**: 길거리 음식 탐방
`}

## 🚗 교통 정보
- **공항 ↔ 시내**: 리무진 버스 또는 지하철 이용
- **시내 이동**: 대중교통 또는 택시 활용
- **관광지 간 이동**: 투어 버스 또는 렌터카 고려

## 💡 여행 팁
${selectedThemes.includes('luxury') ? '- 고급 서비스를 위한 사전 예약 필수' : ''}
${selectedThemes.includes('business') ? '- 비즈니스 일정과 관광의 효율적 조합' : ''}
${selectedThemes.includes('eco') ? '- 친환경 숙소 및 지속가능한 관광 실천' : ''}
- 현지 날씨 확인 및 적절한 복장 준비
- 여행자 보험 가입 권장
- 현지 화폐 및 결제 수단 준비
- 언어 번역 앱 설치 추천

## 💰 예상 경비 (1인 기준)
${selectedThemes.includes('luxury') ? `
- **숙박**: ₩200,000-500,000/박 (5성급 호텔)
- **식비**: ₩100,000-200,000/일 (파인다이닝 포함)
- **교통**: ₩50,000-100,000/일 (프라이빗 카 서비스)
- **관광**: ₩100,000-200,000/일 (프리미엄 투어)
- **총 예상 경비**: ₩${((200000 + 100000 + 50000 + 100000) * duration).toLocaleString()} ~ ₩${((500000 + 200000 + 100000 + 200000) * duration).toLocaleString()}
` : `
- **숙박**: ₩80,000-150,000/박
- **식비**: ₩30,000-60,000/일
- **교통**: ₩20,000-40,000/일
- **관광**: ₩30,000-50,000/일
- **총 예상 경비**: ₩${((80000 + 30000 + 20000 + 30000) * duration).toLocaleString()} ~ ₩${((150000 + 60000 + 40000 + 50000) * duration).toLocaleString()}
`}

---

*본 여행 계획은 ${themes} 테마에 맞춰 구성된 맞춤형 일정입니다.*
*현지 상황과 개인 취향에 따라 조정하시기 바랍니다.*`;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl text-gray-800 mb-4 font-bold">AI 여행 플랜</h2>
      
      {/* MCP 상태 표시 */}
      {mcpStatus && (
        <Alert 
          severity={mcpStatus.available ? "success" : "warning"} 
          sx={{ mb: 2 }}
        >
          {mcpStatus.available 
            ? "Perplexity AI가 정상적으로 동작 중입니다." 
            : `Perplexity AI 연결 상태: ${mcpStatus.message}`}
        </Alert>
      )}
      
      {/* 에러 메시지 표시 */}
      {error && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {isGeneratingPlan ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '400px',
          my: 6,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* 배경 애니메이션 효과 */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            animation: 'pulse 2s ease-in-out infinite alternate'
          }} />
          
          {/* 로딩 컨텐츠 */}
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <CircularProgress 
              size={60} 
              thickness={4}
              sx={{ 
                mb: 4,
                color: '#ffffff',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                }
              }} 
            />
            
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold', 
              mb: 2,
              background: 'linear-gradient(45deg, #fff, #e3f2fd)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🤖 AI가 여행 계획을 생성하고 있습니다
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              {destination}으로의 {endDate && startDate ? endDate.diff(startDate, 'day') + 1 : ''}일 여행
            </Typography>
            
            <Typography variant="body1" sx={{ 
              opacity: 0.8,
              maxWidth: '400px',
              lineHeight: 1.6,
              mx: 'auto'
            }}>
              최신 정보와 현지 상황을 분석하여<br />
              맞춤형 여행 일정을 만들고 있습니다...
            </Typography>
            
            {/* 진행 단계 표시 */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
              {['정보 분석', '일정 구성', '최적화'].map((step, index) => (
                <Box key={step} sx={{
                  px: 2,
                  py: 1,
                  borderRadius: '20px',
                  bgcolor: 'rgba(255,255,255,0.2)',
                  fontSize: '0.875rem',
                  animation: `fadeInOut 1.5s ease-in-out infinite ${index * 0.5}s`
                }}>
                  {step}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 4, 
              maxHeight: '400px', 
              overflow: 'auto',
              bgcolor: '#f8f9fa',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.7
            }}
          >
            {tripPlan ? (
              <Typography component="div" variant="body1">
                {tripPlan.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <Typography key={index} variant="h4" gutterBottom>{line.substring(2)}</Typography>;
                  } else if (line.startsWith('## ')) {
                    return <Typography key={index} variant="h5" gutterBottom sx={{ mt: 2 }}>{line.substring(3)}</Typography>;
                  } else if (line.startsWith('### ')) {
                    return <Typography key={index} variant="h6" gutterBottom sx={{ mt: 1 }}>{line.substring(4)}</Typography>;
                  } else if (line.startsWith('- ')) {
                    return <Typography key={index} component="div" sx={{ pl: 2 }} gutterBottom>{line}</Typography>;
                  } else {
                    return <Typography key={index} paragraph>{line}</Typography>;
                  }
                })}
              </Typography>
            ) : (
              <Typography color="text.secondary">
                여행 플랜이 생성되지 않았습니다. 다시 시도해주세요.
              </Typography>
            )}
          </Paper>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              onClick={onReset}
              sx={{ flexBasis: '30%' }}
            >
              처음으로 돌아가기
            </Button>
            <Button 
              variant="outlined" 
              onClick={generateTripPlan}
              sx={{ flexBasis: '30%' }}
            >
              플랜을다시 생성하기
            </Button>
            <Button 
              variant="contained" 
              onClick={onFinish}
              sx={{ flexBasis: '35%' }}
            >
              이 여행 플랜으로 확정하기
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default Step3_AITripPlan; 