import { HolidayRecommendation } from "@/app/types/HolidayRecommendationType";
import { pageConst } from "@/constant/pageConst";
import dayjs from "dayjs";
export const groupingHolidays = (): HolidayRecommendation[] => {
    const holidaysData = pageConst.holidays.year2025;
    if (!holidaysData || holidaysData.length === 0) {
        console.error("Holiday data is empty or invalid.");
        return [];
    }

    // 1. 공휴일 날짜를 모두 정렬
    const sortedHolidays = [...holidaysData].sort((a, b) => 
        dayjs(a.date).diff(dayjs(b.date))
    );

    // 2. 주말(토/일)을 찾아 배열에 추가 (공휴일과 주말 모두 포함)
    const allDaysOff: {date: string, name: string, isHoliday: boolean}[] = [];
    
    // 2.1. 공휴일 추가
    sortedHolidays.forEach(holiday => {
        allDaysOff.push({
        date: holiday.date,
        name: holiday.name,
        isHoliday: true
        });
    });
    
    // 2.2. 주말 추가
    const year = dayjs(sortedHolidays[0].date).year();
    let currentDate = dayjs(`${year}-01-01`);
    const yearEndDate = dayjs(`${year}-12-31`);
    
    while (!currentDate.isAfter(yearEndDate)) {
        const dayOfWeek = currentDate.day();
        const dateString = currentDate.format('YYYY-MM-DD');
        
        // 토요일(6) 또는 일요일(0)이고, 아직 배열에 없는 경우만 추가
        if ((dayOfWeek === 0 || dayOfWeek === 6) && 
            !allDaysOff.some(d => d.date === dateString)) {
        allDaysOff.push({
            date: dateString,
            name: dayOfWeek === 0 ? '일요일' : '토요일',
            isHoliday: false
        });
        }
        
        currentDate = currentDate.add(1, 'day');
    }
    
    // 3. 날짜순으로 정렬
    allDaysOff.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
    
    // 4. 휴일들을 그룹화하여 연결된 블록 찾기 + 특별 규칙 적용
    const holidayBlocks: HolidayRecommendation[] = [];
    
    // 이 부분이 핵심: 특정 기간 내의 모든 휴일을 하나의 블록으로 통합
    // 탈모오는거같음
    for (let i = 0; i < allDaysOff.length; i++) {
        // 각 휴일마다 새로운 블록 시작
        let currentStart = allDaysOff[i].date;
        let currentEnd = allDaysOff[i].date;
        
        // 이 블록에 포함된 공휴일 이름들 (Set으로 중복 방지)
        const holidayNames = new Set<string>();
        if (allDaysOff[i].isHoliday) {
        holidayNames.add(allDaysOff[i].name);
        }
        
        // 다음 날짜부터 연속된 휴일 또는 약간의 간격(최대 2일)이 있는 휴일 검사
        for (let j = i + 1; j < allDaysOff.length; j++) {
        const daysDiff = dayjs(allDaysOff[j].date).diff(dayjs(allDaysOff[j-1].date), 'day');
        
        // 연속된 경우 또는 근접한 경우(1-2일 간격)이면 확장
        if (daysDiff <= 3) {
            currentEnd = allDaysOff[j].date;
            if (allDaysOff[j].isHoliday) {
            holidayNames.add(allDaysOff[j].name);
            }
            
            // 지금부터 j까지는 이미 블록에 포함했으므로 i를 j로 업데이트
            i = j;
        } else {
            break; // 간격이 3일 이상 벌어지면 중단
        }
        }
        
        // 블록 길이 계산
        const blockStartDay = dayjs(currentStart);
        const blockEndDay = dayjs(currentEnd);
        const totalDays = blockEndDay.diff(blockStartDay, 'day') + 1;
        
        // 공휴일을 포함하는 3일 이상의 블록만 추가
        if (totalDays >= 3 && holidayNames.size > 0) {
        // 여러 공휴일 이름 및 요일 정보 생성
        const holidayDetailsStr = Array.from(holidayNames)
            .map(name => `${name}(${dayjs(currentStart).locale('ko').format('ddd')})`)
            .join(' ');
        
        // 우선순위: 4일 이상이거나 금요일 시작/월요일 종료는 우선순위 1
        const priority = (totalDays >= 4 || 
                            blockStartDay.day() === 5 || 
                            blockEndDay.day() === 1) ? 1 : 2;
        
        holidayBlocks.push({
            startDate: currentStart,
            endDate: currentEnd,
            holidayName: Array.from(holidayNames).join(', '),
            description: `${holidayDetailsStr} 주말포함 ${totalDays}일`,
            priority: priority,
            totalDays: totalDays
        });
        }
    }
    
    // 5. 우선순위 및 날짜순으로 정렬
    const sortedBlocks = holidayBlocks.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return dayjs(a.startDate).diff(dayjs(b.startDate));
    });
    return sortedBlocks;
}