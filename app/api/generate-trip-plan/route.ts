import { NextRequest, NextResponse } from "next/server";
import { TripData } from "@/app/types/TripPlanner/types";
import {
  buildSystemPrompt,
  buildUserPrompt,
} from "@/utils/trip-plan-prompt/promptBuilder";

async function generateAITripPlan(tripData: TripData) {
  try {
    const perplexityApiKey = process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY;
    if (!perplexityApiKey) {
      throw new Error("Perplexity API 키가 설정되지 않았습니다.");
    }
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(tripData);

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${perplexityApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });
    if (!response.ok) {
      console.error("Perplexity API 응답 오류:", await response.text());
      throw new Error(`Perplexity API 응답 오류: ${response.status}`);
    }

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return {
        tripPlan: data.choices[0].message.content,
      };
    } else {
      console.error("Perplexity API 응답 형식 오류:", data);
      throw new Error("Perplexity API 응답 형식 오류");
    }
  } catch (error) {
    console.error("AI 여행 플랜 생성 중 오류 발생:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const tripData: TripData = await request.json();

    if (
      !tripData.travelType ||
      !tripData.selectedThemes ||
      !tripData.destination ||
      !tripData.startDate ||
      !tripData.endDate
    ) {
      return NextResponse.json(
        { error: "필수 여행 정보가 누락되었습니다." },
        { status: 400 }
      );
    }
    try {
      const {tripPlan} = await generateAITripPlan(tripData);
      return NextResponse.json({ tripPlan });
    } catch (error) {
      throw new Error("AI 여행 플랜 생성 실패", { cause: error });
    }
  } catch (error) {
    console.error("요청 처리 중 심각한 오류 발생:", error);
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
