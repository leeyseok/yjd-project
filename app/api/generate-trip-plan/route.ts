import { NextRequest, NextResponse } from 'next/server';

interface TripData {
  tripType: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  themes?: string[];
  themeDescription?: string;
}

// Perplexity API를 사용하여 여행 플랜 생성 함수
async function generateAITripPlan(tripData: TripData) {
  try {
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    
    console.log('perplexityApiKey', perplexityApiKey)
    if (!perplexityApiKey) {
      throw new Error('Perplexity API 키가 설정되지 않았습니다.');
    }
    
    // 여행 계획에 특화된 system prompt
    const systemPrompt = `당신은 여행 계획 전문가입니다. 다음 지침을 따라 상세하고 실용적인 여행 계획을 작성해주세요:

1. 최신 여행 정보와 현지 상황을 반영하여 계획하세요
2. 각 날짜별로 구체적인 시간대별 일정을 제공하세요
3. 실제 존재하는 관광지, 레스토랑, 숙박시설을 추천하세요
4. 현지 교통편, 입장료, 운영시간 등 실용적인 정보를 포함하세요
5. 독특하고 기억에 남을 만한 경험을 포함하세요
6. 계절과 날씨를 고려한 적절한 활동을 제안하세요
7. 현지 문화와 관습을 존중하는 여행 팁을 제공하세요
8. 마크다운 형식으로 깔끔하게 구성하세요
9. 선택된 여행 테마에 맞는 특별한 활동과 장소를 우선적으로 추천하세요

응답은 한국어로 작성하되, 정확하고 최신의 정보를 바탕으로 해주세요.`;

    // 테마별 특별 요청사항 생성
    const getThemeSpecificRequests = (themes: string[]) => {
      const themeRequests: Record<string, string> = {
        '휴양형 여행': '스파, 리조트, 해변가 카페, 선셋 포인트 등 휴양과 힐링에 중점을 둔 장소를 추천해주세요.',
        '문화·역사 탐방': '박물관, 유적지, 전통 건축물, 역사적 장소, 문화 체험 프로그램을 중심으로 계획해주세요.',
        '미식 여행': '현지 유명 맛집, 전통 음식, 쿠킹 클래스, 시장 투어, 와이너리/양조장 방문을 포함해주세요.',
        '어드벤처 여행': '하이킹, 등산, 수상 스포츠, 익스트림 스포츠, 자연 탐험 활동을 중심으로 계획해주세요.',
        '웰니스·힐링': '요가 센터, 명상 프로그램, 스파, 온천, 자연 속 힐링 장소를 우선적으로 추천해주세요.',
        '비즈니스 여행': '컨퍼런스 센터 근처의 편의시설, 비즈니스 디너 장소, 효율적인 이동 경로를 고려해주세요.',
        '럭셔리 여행': '고급 호텔, 미슐랭 레스토랑, 프리미엄 서비스, 프라이빗 투어, VIP 경험을 중심으로 계획해주세요.',
        '에코 투어리즘': '자연 보호구역, 친환경 숙소, 지속가능한 관광지, 야생동물 관찰 프로그램을 포함해주세요.',
        '엔터테인먼트': '콘서트홀, 공연장, K-pop 관련 장소, 엔터테인먼트 시설, 팬 미팅 장소를 추천해주세요.',
        '성지 순례': '드라마/영화 촬영지, 유명인 방문 장소, 인스타그램 핫플레이스를 중심으로 계획해주세요.',
        '애니 여행': '애니메이션 성지, 오타쿠 문화 관련 장소, 피규어샵, 만화카페, 코스프레 체험을 포함해주세요.'
      };
      
      return themes.map(theme => themeRequests[theme] || '').filter(Boolean).join(' ');
    };

    // 사용자 입력 정보를 바탕으로 한 user prompt
    const userPrompt = `다음 조건에 맞는 상세한 여행 계획을 작성해주세요:

**여행 정보:**
- 여행 유형: ${tripData.tripType}
- 목적지: ${tripData.destination}
- 출발일: ${tripData.startDate}
- 도착일: ${tripData.endDate}
- 여행 기간: ${tripData.duration}일
${tripData.themes && tripData.themes.length > 0 ? `- 여행 테마: ${tripData.themes.join(', ')}` : ''}
${tripData.themeDescription ? `- 특별 요청사항: ${tripData.themeDescription}` : ''}

**요청사항:**
1. ${tripData.destination}의 현재 상황(계절, 날씨, 특별 이벤트 등)을 고려해주세요
2. 꼭 가봐야 할 필수 관광지와 숨은 명소를 모두 포함해주세요
3. 현지인들이 추천하는 맛집과 특별한 음식 경험을 포함해주세요
4. 독특하고 기억에 남을 만한 활동이나 체험을 추천해주세요
5. 실용적인 교통편 정보와 이동 경로를 제안해주세요
6. 각 날짜별 상세 일정을 시간대별로 구성해주세요
${tripData.themes && tripData.themes.length > 0 ? `7. **테마별 특별 요청**: ${getThemeSpecificRequests(tripData.themes)}` : ''}

다음 형식으로 작성해주세요:
- 여행 개요 및 기간 정보
- 선택된 테마에 맞는 특별한 추천사항
- 일차별 상세 일정 (시간대별 활동)
- 주요 관광지 및 체험 활동 추천
- 맛집 및 현지 음식 추천
- 교통 및 이동 정보
- 여행 팁 및 주의사항
- 예산 가이드 (선택사항)

${tripData.destination}만의 특별한 매력을 충분히 경험할 수 있고, 선택하신 ${tripData.themes?.join(', ') || '여행'} 테마에 완벽히 맞는 최고의 여행 계획을 부탁드립니다.`;
    console.log('userPrompt', userPrompt)
    // Perplexity API 호출
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ]
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Perplexity API 응답 오류: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Perplexity API 응답에서 여행 플랜 추출
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      console.error('Perplexity API 응답 형식 오류:', data);
      throw new Error('Perplexity API 응답 형식 오류');
    }
  } catch (error) {
    console.error('AI 여행 플랜 생성 중 오류 발생:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const tripData: TripData = await request.json();
    
    // 필수 여행 정보 유효성 검사
    if (!tripData.destination || !tripData.startDate || !tripData.endDate || !tripData.tripType) {
      return NextResponse.json(
        { error: '여행 정보가 부족합니다.' },
        { status: 400 }
      );
    }
    
    try {
      // AI 여행 플랜 생성
      const tripPlan = await generateAITripPlan(tripData);
      
      return NextResponse.json({ tripPlan });
    } catch (error) {
      console.error('AI 여행 플랜 생성 중 오류 발생:', error);
      
      // 샘플 여행 플랜 생성 (Perplexity API 사용 불가 시 폴백)
      const samplePlan = generateSamplePlan(tripData);
      
      return NextResponse.json({ 
        tripPlan: samplePlan,
        notice: 'Perplexity API 연결 실패로 샘플 여행 플랜이 제공되었습니다.' 
      });
    }
  } catch (error) {
    console.error('요청 처리 중 오류 발생:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 폴백용 샘플 여행 플랜 생성 함수
function generateSamplePlan(tripData: TripData): string {
  const { tripType, destination, startDate, endDate, duration } = tripData;
  
  let plan = `# ${destination} ${duration}일 여행 플랜\n\n`;
  plan += `여행 유형: ${tripType}\n`;
  plan += `여행 기간: ${startDate} ~ ${endDate} (${duration}일)\n\n`;
  
  for (let i = 0; i < duration; i++) {
    const day = new Date(startDate);
    day.setDate(day.getDate() + i);
    const dayStr = `${day.getMonth() + 1}월 ${day.getDate()}일`;
    
    plan += `## ${i + 1}일차 (${dayStr})\n\n`;
    
    // 아침
    plan += `### 오전\n`;
    plan += `- 08:00 ~ 09:00: 호텔에서 아침식사\n`;
    plan += `- 09:30 ~ 12:00: ${destination} 주요 관광지 방문\n\n`;
    
    // 점심
    plan += `### 오후\n`;
    plan += `- 12:30 ~ 14:00: 현지 맛집에서 점심식사\n`;
    plan += `- 14:30 ~ 17:30: 자유 관광 및 쇼핑\n\n`;
    
    // 저녁
    plan += `### 저녁\n`;
    plan += `- 18:00 ~ 20:00: 저녁식사\n`;
    plan += `- 20:30 ~ 22:00: 야경 감상 또는 휴식\n\n`;
  }
  
  plan += `## 주요 방문지 추천\n\n`;
  plan += `1. ${destination} 랜드마크\n`;
  plan += `2. 현지 유명 박물관\n`;
  plan += `3. 쇼핑 거리\n`;
  plan += `4. 현지 맛집가\n\n`;
  
  plan += `## 여행 팁\n\n`;
  plan += `- 현지 교통편 이용 방법\n`;
  plan += `- 꼭 가봐야 할 숨은 명소\n`;
  plan += `- 현지 음식 추천\n`;
  
  return plan;
} 