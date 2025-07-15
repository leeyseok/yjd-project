import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
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
  // TODO 회원기능 추가하면 if 문으로 회원인지 확인하고 회원이 아니면 요청 횟수 제한 로직 추가
  // IP 기반 요청 횟수 제한 로직
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const ratelimit = new Ratelimit({
    redis: kv,
    // 하루에 2번 요청 가능
    limiter: Ratelimit.slidingWindow(2, "1d"),
  });

  const { success, reset } = await ratelimit.limit(ip);

  if (!success) {
    const resetDate = new Date(reset);
    const month = String(resetDate.getMonth() + 1).padStart(2, "0");
    const day = String(resetDate.getDate()).padStart(2, "0");
    const hour = String(resetDate.getHours()).padStart(2, "0");
    const minute = String(resetDate.getMinutes()).padStart(2, "0");

    const formatted = `${month}/${day} ${hour}:${minute}`;

    return NextResponse.json(
      { error: `요청 횟수를 초과했습니다. ${formatted}에 다시 시도해주세요.` },
      { status: 429 }
    );
  }
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
      const { tripPlan } = await generateAITripPlan(tripData);
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
