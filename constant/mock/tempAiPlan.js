"use client";
import { pageConst } from "@/constant/pageConst";

export const generateSamplePlan = (
  travelType,
  destination,
  startDate,
  endDate,
  selectedThemes,
  themeDescription,
) => {
  const themes =
    selectedThemes.length > 0
      ? selectedThemes
        .map((id) => {
          const themeMap = pageConst.themeNameMapping;
          return themeMap[id] || id;
        })
        .join(", ")
      : "일반";

  const duration =
    endDate && startDate ? endDate.diff(startDate, "day") + 1 : 1;
  const tripTypeKorean = travelType === "international" ? "해외" : "국내";

  return `# 🌟 ${destination} ${themes} ${duration}일 여행 계획

## 📅 여행 개요
- **목적지**: ${destination}
- **여행 기간**: ${startDate?.format("YYYY.MM.DD")} ~ ${endDate?.format("YYYY.MM.DD")} (${duration}일)
- **여행 타입**: ${tripTypeKorean} ${themes} 여행
${themeDescription ? `- **특별 요청사항**: ${themeDescription}` : ""}

## 📍 일차별 상세 일정

### 1일차 (${startDate?.format("MM.DD")})
**오전 09:00** - 출발 및 현지 도착
**오후 14:00** - ${destination} 대표 관광지 1 방문
**오후 18:00** - 환영 디너 (현지 특색 음식)

### 2일차 (${startDate?.add(1, "day").format("MM.DD")})
**오전 09:30** - 테마별 활동 (예: 박물관, 액티비티)
**오후 13:00** - 현지 맛집 점심
**오후 19:00** - 야경 감상

...이후 일정은 AI가 더욱 상세하게 채워줄 거예요!`;
};