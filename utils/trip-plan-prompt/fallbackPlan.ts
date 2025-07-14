import dayjs from "dayjs";
import { TripData } from "@/app/types/TripPlanner/types";

// 폴백용 샘플 여행 플랜 생성 함수
export function generateFallbackPlan(tripData: TripData): string {
  const { destination, startDate, endDate } = tripData;
  const duration = dayjs(endDate).diff(dayjs(startDate), "day") + 1;

  let plan = `# (샘플) ${destination} ${duration}일 여행 플랜\n\n`;
  plan += `AI 서버 연결에 실패하여 샘플 플랜을 제공합니다.\n\n`;
  plan += `여행 기간: ${dayjs(startDate).format("YYYY.MM.DD")} ~ ${dayjs(endDate).format("YYYY.MM.DD")} (${duration}일)\n\n`;

  for (let i = 0; i < duration; i++) {
    const day = dayjs(startDate).add(i, "day");
    const dayStr = day.format("M월 D일");

    plan += `## ${i + 1}일차 (${dayStr})\n`;
    plan += `- **오전:** ${destination}의 주요 관광지 방문\n`;
    plan += `- **오후:** 현지 맛집에서 점심 식사 후 자유 시간\n`;
    plan += `- **저녁:** 저녁 식사 및 야경 감상\n\n`;
  }

  plan += `## 여행 팁\n`;
  plan += `- 이 플랜은 예시이며, 실제 AI가 생성하는 플랜은 훨씬 더 상세하고 풍부합니다.\n`;
  plan += `- 잠시 후 '플랜 다시 생성하기' 버튼을 눌러 다시 시도해주세요.\n`;

  return plan;
} 