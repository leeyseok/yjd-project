import fs from 'fs';
import path from 'path';

/**
 * MCP 서버 구성 상태를 확인하는 함수
 * @returns MCP 서버 구성 상태 객체
 */
export async function checkMcpStatus() {
  try {
    // MCP 서버 구성 파일 경로
    const userHomePath = process.env.HOME || process.env.USERPROFILE;
    const mcpConfigPath = path.join(userHomePath || '', '.cursor', 'mcp.json');
    
    // MCP 서버 구성 존재 여부 확인
    if (!fs.existsSync(mcpConfigPath)) {
      return {
        available: false,
        message: 'MCP 구성 파일을 찾을 수 없습니다.',
      };
    }
    
    // MCP 서버 구성 읽기
    const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf-8'));
    
    // MCP 서버가 구성되어 있지 않은 경우
    if (!mcpConfig.mcpServers || Object.keys(mcpConfig.mcpServers).length === 0) {
      return {
        available: false,
        message: 'MCP 서버가 구성되어 있지 않습니다.',
      };
    }
    
    // 첫 번째 구성된 MCP 서버 사용
    const serverKey = Object.keys(mcpConfig.mcpServers)[0];
    const serverConfig = mcpConfig.mcpServers[serverKey];
    
    if (!serverConfig || !serverConfig.endpoint) {
      return {
        available: false,
        message: '유효한 MCP 서버 엔드포인트를 찾을 수 없습니다.',
      };
    }
    
    // MCP 서버 연결 테스트
    try {
      const response = await fetch(serverConfig.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(serverConfig.apiKey && { 'Authorization': `Bearer ${serverConfig.apiKey}` }),
        },
        body: JSON.stringify({
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
          message: `MCP 서버 응답 오류: ${response.status}`,
        };
      }
      
      return {
        available: true,
        message: 'MCP 서버 연결 성공',
        serverKey,
        endpoint: serverConfig.endpoint,
      };
    } catch (error) {
      return {
        available: false,
        message: `MCP 서버 연결 실패: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  } catch (error) {
    return {
      available: false,
      message: `MCP 상태 확인 중 오류 발생: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
} 