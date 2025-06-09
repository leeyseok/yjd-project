import { NextResponse } from 'next/server';

async function checkPerplexityApiStatus() {
  try {
    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    
    if (!perplexityApiKey) {
      return {
        available: false,
        message: 'Perplexity API 키가 설정되지 않았습니다.',
      };
    }
    
    // Perplexity API 연결 테스트
    try {
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
              content: '간단한 테스트 메시지입니다.'
            },
            {
              role: 'user',
              content: '안녕하세요'
            }
          ],
        }),
      });
      
      if (!response.ok) {
        return {
          available: false,
          message: `Perplexity API 응답 오류: ${response.status}`,
        };
      }
      
      return {
        available: true,
        message: 'Perplexity API 연결 성공',
        endpoint: 'https://api.perplexity.ai/chat/completions',
      };
    } catch (error) {
      return {
        available: false,
        message: `Perplexity API 연결 실패: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  } catch (error) {
    return {
      available: false,
      message: `API 상태 확인 중 오류 발생: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

export async function GET() {
  try {
    const status = await checkPerplexityApiStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error('Perplexity API 상태 확인 중 오류 발생:', error);
    return NextResponse.json(
      { 
        available: false,
        message: '서버 오류로 Perplexity API 상태를 확인할 수 없습니다.' 
      },
      { status: 500 }
    );
  }
} 