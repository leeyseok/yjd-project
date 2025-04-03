export const pageConst = {
  tripType: {
    domestic: 0,
    international: 1,
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
