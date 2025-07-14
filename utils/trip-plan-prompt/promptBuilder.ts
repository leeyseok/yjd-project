import dayjs from "dayjs";
import { TripData } from "@/app/types/TripPlanner/types";
import { pageConst } from "@/constant/pageConst";

const getThemeSpecificRequests = (themes: string[]) => {
  const themeRequests: Record<string, string> = {
    "휴양형 여행":
      "스파, 리조트, 해변가 카페, 선셋 포인트 등 휴양과 힐링에 중점을 둔 장소를 추천해주세요.",
    "문화·역사 탐방":
      "박물관, 유적지, 전통 건축물, 역사적 장소, 문화 체험 프로그램을 중심으로 계획해주세요.",
    "미식 여행":
      "현지 유명 맛집, 전통 음식, 쿠킹 클래스, 시장 투어, 와이너리/양조장 방문을 포함해주세요.",
    "어드벤처 여행":
      "하이킹, 등산, 수상 스포츠, 익스트림 스포츠, 자연 탐험 활동을 중심으로 계획해주세요.",
    "웰니스·힐링":
      "요가 센터, 명상 프로그램, 스파, 온천, 자연 속 힐링 장소를 우선적으로 추천해주세요.",
    "비즈니스 여행":
      "컨퍼런스 센터 근처의 편의시설, 비즈니스 디너 장소, 효율적인 이동 경로를 고려해주세요.",
    "럭셔리 여행":
      "고급 호텔, 미슐랭 레스토랑, 프리미엄 서비스, 프라이빗 투어, VIP 경험을 중심으로 계획해주세요.",
    "에코 투어리즘":
      "자연 보호구역, 친환경 숙소, 지속가능한 관광지, 야생동물 관찰 프로그램을 포함해주세요.",
    "엔터테인먼트":
      "콘서트홀, 공연장, K-pop 관련 장소, 엔터테인먼트 시설, 팬 미팅 장소를 추천해주세요.",
    "성지 순례":
      "드라마/영화 촬영지, 유명인 방문 장소, 인스타그램 핫플레이스를 중심으로 계획해주세요.",
    "애니 여행":
      "애니메이션 성지, 오타쿠 문화 관련 장소, 피규어샵, 만화카페, 코스프레 체험을 포함해주세요.",
  };

  const translatedThemes = themes.map(
    (theme) => (pageConst.themeNameMapping as Record<string, string>)[theme] || theme,
  );

  return translatedThemes
    .map((theme: string) => themeRequests[theme] || "")
    .filter(Boolean)
    .join(" ");
};

export const buildSystemPrompt = () => {
  return `당신은 여행 계획 전문가입니다. 다음 지침을 따라 상세하고 실용적인 여행 계획을 작성해주세요:

1. 최신 여행 정보와 현지 상황을 반영하여 계획하세요.
2. 각 날짜별로 구체적인 시간대별 일정을 제공하세요.
3. 실제 존재하는 관광지, 레스토랑, 숙박시설을 추천하세요.
4. 현지 교통편, 입장료, 운영시간 등 실용적인 정보를 포함하세요.
5. 독특하고 기억에 남을 만한 경험을 포함하세요.
6. 계절과 날씨를 고려한 적절한 활동을 제안하세요.
7. 현지 문화와 관습을 존중하는 여행 팁을 제공하세요.
8. 마크다운 형식으로 깔끔하게 구성하세요.
9. 선택된 여행 테마에 맞는 특별한 활동과 장소를 우선적으로 추천하세요.

응답은 한국어로 작성하되, 정확하고 최신의 정보를 바탕으로 해주세요.`; // TODO 아직 국제화가 안되어서 한국어만 이후에 locale 받아서 국제화
};

export const buildUserPrompt = (tripData: TripData) => {
  const duration = dayjs(tripData.endDate).diff(dayjs(tripData.startDate), "day") + 1;
  const translatedThemes = tripData.selectedThemes.map(
    (theme: string) => (pageConst.themeNameMapping as Record<string, string>)[theme] || theme,
  );

  return `다음 조건에 맞는 상세한 여행 계획을 작성해주세요:

**여행 정보:**
- 여행 유형: ${tripData.travelType}
- 목적지: ${tripData.destination}
- 출발일: ${dayjs(tripData.startDate).format("YYYY-MM-DD")}
- 도착일: ${dayjs(tripData.endDate).format("YYYY-MM-DD")}
- 여행 기간: ${duration}일
${translatedThemes.length > 0 && `- 여행 테마: ${translatedThemes.join(", ")}`}
${tripData.themeDescription && `- 특별 요청사항: ${tripData.themeDescription}`}

**요청사항:**
1. ${tripData.destination}의 현재 상황(계절, 날씨, 특별 이벤트 등)을 고려해주세요.
2. 꼭 가봐야 할 필수 관광지와 숨은 명소를 모두 포함해주세요.
3. 현지인들이 추천하는 맛집과 특별한 음식 경험을 포함해주세요.
4. 독특하고 기억에 남을 만한 활동이나 체험을 추천해주세요.
5. 실용적인 교통편 정보와 이동 경로를 제안해주세요.
6. 각 날짜별 상세 일정을 시간대별로 구성해주세요.
${translatedThemes.length > 0 && `7. **테마별 특별 요청**: ${getThemeSpecificRequests(tripData.selectedThemes)}`}

다음 형식으로 작성해주세요:
- 여행 개요 및 기간 정보
- 선택된 테마에 맞는 특별한 추천사항
- 일차별 상세 일정 (시간대별 활동)
- 주요 관광지 및 체험 활동 추천
- 맛집 및 현지 음식 추천
- 교통 및 이동 정보
- 여행 팁 및 주의사항
- 예산 가이드 (선택사항)

${tripData.destination}만의 특별한 매력을 충분히 경험할 수 있고, 선택하신 ${
    translatedThemes.join(", ") || "여행"
  } 테마에 완벽히 맞는 최고의 여행 계획을 부탁드립니다.`;
}; 