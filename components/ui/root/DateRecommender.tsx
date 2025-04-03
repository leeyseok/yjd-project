'use client'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/ko' // 한국어 로케일 추가
import { pageConst } from '@/constant/pageConst'

interface DateRecommenderProps {
  onBack: () => void;
}

interface HolidayRecommendation {
  startDate: string;
  endDate: string;
  holidayName: string;
  description: string;
  priority: number;
  totalDays: number;
}

const DateRecommender = ({ onBack }: DateRecommenderProps) => {
  const [recommendations, setRecommendations] = useState<HolidayRecommendation[]>([]);

  useEffect(() => {
    const holidays = pageConst.holidays.year2025;

    const getRecommendations = () => {
      const recommendations: HolidayRecommendation[] = [];

      holidays.forEach(holiday => {
        const holidayDate = dayjs(holiday.date);
        const dayOfWeek = holidayDate.day(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

        // 1순위: 금요일(5) 또는 월요일(1) 공휴일
        if (dayOfWeek === 1 || dayOfWeek === 5) {
          let startDate, endDate;
          if (dayOfWeek === 1) { // 월요일
            startDate = holidayDate.format('YYYY-MM-DD');
            endDate = holidayDate.add(2, 'day').format('YYYY-MM-DD');
          } else { // 금요일
            startDate = holidayDate.format('YYYY-MM-DD');
            endDate = holidayDate.add(2, 'day').format('YYYY-MM-DD');
          }

          recommendations.push({
            startDate,
            endDate,
            holidayName: holiday.name,
            description: `${holiday.name} (${dayjs(holiday.date).locale('ko').format('dddd')}) - 주말 포함 3일`,
            priority: 1,
            totalDays: 3
          });
        }
        // 2순위: 화요일(2) 또는 목요일(4) 공휴일
        else if (dayOfWeek === 2 || dayOfWeek === 4) {
          let startDate, endDate, description;
          if (dayOfWeek === 2) { // 화요일
            startDate = holidayDate.subtract(1, 'day').format('YYYY-MM-DD');
            endDate = holidayDate.add(2, 'day').format('YYYY-MM-DD');
            description = `${holiday.name} (${dayjs(holiday.date).locale('ko').format('dddd')}) - 월요일 휴가 사용 시 4일`;
          } else { // 목요일
            startDate = holidayDate.format('YYYY-MM-DD');
            endDate = holidayDate.add(3, 'day').format('YYYY-MM-DD');
            description = `${holiday.name} (${dayjs(holiday.date).locale('ko').format('dddd')}) - 금요일 휴가 사용 시 4일`;
          }

          recommendations.push({
            startDate,
            endDate,
            holidayName: holiday.name,
            description,
            priority: 2,
            totalDays: 4
          });
        }
      });

      return recommendations.sort((a, b) => {
        // 우선 priority로 정렬
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        // priority가 같으면 날짜순으로 정렬
        return dayjs(a.startDate).diff(dayjs(b.startDate));
      });
    };

    setRecommendations(getRecommendations());
  }, []);

  return (
    <div className="w-full max-w-md p-6 rounded-lg max-h-[500px] overflow-y-auto">
      <h2 className="text-2xl text-white mb-4">추천 여행 날짜</h2>
      <div className="flex flex-col gap-4">
        {recommendations.map((rec, index) => (
          <Card key={index} sx={{ 
            bgcolor: rec.priority === 1 ? '#e3f2fd' : '#f5f5f5',
            borderLeft: rec.priority === 1 ? '5px solid #2196f3' : '5px solid #9e9e9e'
          }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                {rec.holidayName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {dayjs(rec.startDate).format('YYYY년 MM월 DD일')} ~ {dayjs(rec.endDate).format('YYYY년 MM월 DD일')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rec.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                총 {rec.totalDays}일
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button 
        onClick={onBack}
        variant="outlined"
        sx={{ mt: 4, color: 'white', borderColor: 'white' }}
      >
        뒤로가기
      </Button>
    </div>
  );
};

export default DateRecommender; 