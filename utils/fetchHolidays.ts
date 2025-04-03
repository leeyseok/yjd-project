/**
 * 공공데이터포털 API에서 공휴일 정보를 가져오는 함수
 * @param year 가져올 연도 (예: '2025')
 * @returns 공휴일 데이터 배열
 */
export const fetchHolidays = async (year: string) => {
    const serviceKey = process.env.NEXT_PUBLIC_DATA_API_KEY;
    const holidaysList = [];
  
    // 12개월에 대해 각각 API 호출
    for (let month = 1; month <= 12; month++) {
      const monthStr = month.toString().padStart(2, '0'); // 1 -> '01', 2 -> '02', ...
      
      const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo`;
      const queryParams = new URLSearchParams({
        serviceKey: decodeURIComponent(serviceKey || ''),
        solYear: year,
        solMonth: monthStr
      });
  
      try {
        const response = await fetch(`${url}?${queryParams}`);
        const data = await response.text();

        // XML 응답을 파싱
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        // items 노드 가져오기
        const items = xmlDoc.getElementsByTagName('item');
        // 각 item에서 공휴일 정보 추출
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const locdate = item.getElementsByTagName('locdate')[0]?.textContent;
          const dateName = item.getElementsByTagName('dateName')[0]?.textContent;
          
          if (locdate && dateName) {
            // 날짜 형식 변환 (YYYYMMDD -> YYYY-MM-DD)
            const formattedDate = `${locdate.slice(0, 4)}-${locdate.slice(4, 6)}-${locdate.slice(6, 8)}`;
            
            holidaysList.push({
              date: formattedDate,
              name: dateName
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching holidays for ${year}-${monthStr}:`, error);
      }
    }
  
    return holidaysList;
  };