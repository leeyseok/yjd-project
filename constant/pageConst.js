export const pageConst = {
  tripType: {
    domestic: 0,
    international: 1,
  },
  // 여행 테마 정의
  tripThemes: [
    {
      id: 'relaxation',
      name: '휴양형 여행',
      icon: '🏖️',
      description: '해변, 리조트, 스파에서의 편안한 휴식',
      color: '#4FC3F7',
      gradient: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)'
    },
    {
      id: 'culture',
      name: '문화·역사 탐방',
      icon: '🏛️',
      description: '박물관, 유적지, 전통 건축물 방문',
      color: '#FFB74D',
      gradient: 'linear-gradient(135deg, #FFB74D 0%, #FFA726 100%)'
    },
    {
      id: 'food',
      name: '미식 여행',
      icon: '🍽️',
      description: '현지 특색 요리와 맛집 탐방',
      color: '#FF8A65',
      gradient: 'linear-gradient(135deg, #FF8A65 0%, #FF7043 100%)'
    },
    {
      id: 'adventure',
      name: '어드벤처 여행',
      icon: '🏔️',
      description: '등산, 스포츠, 액티비티 중심',
      color: '#81C784',
      gradient: 'linear-gradient(135deg, #81C784 0%, #66BB6A 100%)'
    },
    {
      id: 'wellness',
      name: '웰니스·힐링',
      icon: '🧘',
      description: '요가, 명상, 건강과 치유 중심',
      color: '#CE93D8',
      gradient: 'linear-gradient(135deg, #CE93D8 0%, #BA68C8 100%)'
    },
    {
      id: 'business',
      name: '비즈니스 여행',
      icon: '💼',
      description: '출장과 여가를 결합한 블레저',
      color: '#90A4AE',
      gradient: 'linear-gradient(135deg, #90A4AE 0%, #78909C 100%)'
    },
    {
      id: 'luxury',
      name: '럭셔리 여행',
      icon: '✨',
      description: '프리미엄 서비스와 고급 경험',
      color: '#F06292',
      gradient: 'linear-gradient(135deg, #F06292 0%, #EC407A 100%)'
    },
    {
      id: 'eco',
      name: '에코 투어리즘',
      icon: '🌿',
      description: '자연 보호와 지속 가능한 관광',
      color: '#66BB6A',
      gradient: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)'
    },
    {
      id: 'entertainment',
      name: '엔터테인먼트',
      icon: '🎵',
      description: '콘서트, 공연, K-pop 관련 여행',
      color: '#AB47BC',
      gradient: 'linear-gradient(135deg, #AB47BC 0%, #9C27B0 100%)'
    },
    {
      id: 'pilgrimage',
      name: '성지 순례',
      icon: '📍',
      description: '드라마/영화 촬영지, 유명인 방문지',
      color: '#FFAB91',
      gradient: 'linear-gradient(135deg, #FFAB91 0%, #FF8A65 100%)'
    },
    {
      id: 'anime',
      name: '애니 여행',
      icon: '🎌',
      description: '애니메이션 성지순례, 오타쿠 문화',
      color: '#E57373',
      gradient: 'linear-gradient(135deg, #E57373 0%, #EF5350 100%)'
    }
  ],
  // 테마 이름 매핑 (API 전송용)
  themeNameMapping: {
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
  },
  // 국내 지역
  domestic: {
    Regions: [
      { seoul: "서울" },
      { gyeonggi: "경기" },
      { gangwon: "강원도" },
      { chungnam: "충청도" },
      { jeonnam: "전라도" },
      { gyeongnam: "경상도" },
      { jeju: "제주도" },
    ],
  },
  // 해외 지역
  international: {
    Regions: [
      { japan: "일본" },
      { china: "중국" },
      { southeastAsia: "동남아시아" },
      { europe: "유럽" },
      { us: "미주" },
      { etc: "기타" },
    ],
  },
  holidays: {
    year2025: [
      { date: "2025-01-01", name: "1월1일" },
      { date: "2025-01-27", name: "임시공휴일" },
      { date: "2025-01-28", name: "설날" },
      { date: "2025-01-29", name: "설날" },
      { date: "2025-01-30", name: "설날" },
      { date: "2025-03-01", name: "삼일절" },
      { date: "2025-03-03", name: "대체공휴일" },
      { date: "2025-05-05", name: "어린이날" },
      { date: "2025-05-05", name: "부처님오신날" },
      { date: "2025-05-06", name: "대체공휴일" },
      { date: "2025-06-06", name: "현충일" },
      { date: "2025-08-15", name: "광복절" },
      { date: "2025-10-03", name: "개천절" },
      { date: "2025-10-05", name: "추석" },
      { date: "2025-10-06", name: "추석" },
      { date: "2025-10-07", name: "추석" },
      { date: "2025-10-08", name: "대체공휴일" },
      { date: "2025-10-09", name: "한글날" },
      { date: "2025-12-25", name: "기독탄신일" },
    ],
  },
};
