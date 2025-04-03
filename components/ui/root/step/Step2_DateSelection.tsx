import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일
import { pageConst } from '@/constant/pageConst';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // 아이콘 추가
import { HolidayRecommendation } from '@/app/types/HolidayRecommendationType';
import { groupingHolidays } from '@/utils/groupingHolidays';

interface Step2Props {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onSetStartDate: (date: Dayjs | null) => void;
  onSetEndDate: (date: Dayjs | null) => void;
  onComplete: () => void;
}


const Step2_DateSelection = ({ startDate, endDate, onSetStartDate, onSetEndDate, onComplete }: Step2Props) => {
  const [recommendations, setRecommendations] = useState<HolidayRecommendation[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  useEffect(() => {
    const createUnifiedRecommendations = () => {
      try {
        const sortedHolidays = groupingHolidays();
        
        console.log("New Recommendation Blocks:", sortedHolidays);
        setRecommendations(sortedHolidays);
      } catch (error) {
        console.error("Error creating holiday recommendations:", error);
      }
    };

    createUnifiedRecommendations();
  }, []);

  // 월별 필터링
  const getFilteredRecommendations = () => {
    if (selectedMonth === null) return [];
    return recommendations.filter(rec => {
      const startMonth = dayjs(rec.startDate).month() + 1;
      const endMonth = dayjs(rec.endDate).month() + 1;
      // 시작 또는 종료 월이 선택한 월과 같거나, 블록이 선택한 월을 포함하는 경우(월에 걸쳐있는 경우)
      return startMonth === selectedMonth || endMonth === selectedMonth || (startMonth < selectedMonth && endMonth > selectedMonth);
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl text-gray-800 mb-6 font-bold">여행 일정 선택</h2>

        {/* 출발일 & 도착일 가로 배치 */}
        <div className="flex items-center gap-2 mb-6 border border-gray-300 rounded-lg p-3">
          <div className="flex-1">
            <h3 className="text-gray-500 text-sm mb-1">출발일</h3>
            <DatePicker
              value={startDate}
              onChange={onSetStartDate}
              sx={{ width: '100%', '& .MuiInputBase-input': { padding: '8.5px 14px' } }}
              slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
            />
          </div>
          <SwapHorizIcon sx={{ color: 'gray' }} />
          <div className="flex-1">
            <h3 className="text-gray-500 text-sm mb-1">도착일</h3>
            <DatePicker
              value={endDate}
              onChange={onSetEndDate}
              sx={{ width: '100%', '& .MuiInputBase-input': { padding: '8.5px 14px' } }}
              slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
            />
          </div>
        </div>

        {/* 월 선택 및 추천 리스트 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 왼쪽: 월 선택 */}
          <div className="w-full md:w-1/3">
            <h3 className="text-gray-700 font-semibold mb-3">월 선택</h3>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(12)].map((_, index) => (
                <Button
                  key={index}
                  variant={selectedMonth === index + 1 ? "contained" : "outlined"}
                  onClick={() => setSelectedMonth(index + 1)}
                  sx={{ minWidth: 0, height: '40px' }}
                >
                  {index + 1}월
                </Button>
              ))}
            </div>
          </div>

          {/* 오른쪽: 선택한 월의 추천 리스트 */}
          <div className="flex-1">
             <h3 className="text-gray-700 font-semibold mb-3">
                 {selectedMonth ? `${selectedMonth}월 추천 일정` : '추천 일정'}
             </h3>
             {selectedMonth ? (
                <div className="max-h-[350px] overflow-y-auto pr-2 border border-gray-200 rounded-md p-3">
                  <div className="flex flex-col gap-3">
                    {getFilteredRecommendations().length > 0 ? (
                      getFilteredRecommendations().map((rec, index) => (
                        <Card
                          key={index}
                          sx={{
                            borderLeft: rec.priority === 1 ? '5px solid #1976d2' : '5px solid #bdbdbd',
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
                          }}
                          onClick={() => {
                            onSetStartDate(dayjs(rec.startDate));
                            onSetEndDate(dayjs(rec.endDate));
                          }}
                        >
                          <CardContent sx={{ padding: '12px !important' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: rec.priority === 1 ? '#1976d2': '#555' }} gutterBottom>
                                {rec.holidayName} 연휴
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {dayjs(rec.startDate).format('YY.MM.DD')} ~ {dayjs(rec.endDate).format('YY.MM.DD')} ({rec.totalDays}일)
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {rec.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                        이 달에 추천 일정이 없습니다.
                      </Typography>
                    )}
                  </div>
                </div>
             ) : (
                 <div className="max-h-[350px] border border-gray-200 rounded-md p-3 flex items-center justify-center">
                    <Typography variant="body2" color="text.secondary">
                        추천 일정을 보려면 월을 선택하세요.
                    </Typography>
                 </div>
             )}
          </div>
        </div>

        <Button
          onClick={onComplete}
          variant="contained"
          disabled={!startDate || !endDate}
          sx={{ width: '100%', height: '50px', mt: 4 }}
        >
          완료
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default Step2_DateSelection;