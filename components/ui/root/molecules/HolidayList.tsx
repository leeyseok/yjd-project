import React from "react";
import dayjs from "dayjs";
import { HolidayRecommendation } from "@/app/types/HolidayRecommendationType";
import HolidayCard from "../atoms/HolidayCard";

interface HolidayListProps {
  recommendations: HolidayRecommendation[];
  selectedMonth: number | null;
  onSelectRecommendation: (rec: HolidayRecommendation) => void;
}

const HolidayList: React.FC<HolidayListProps> = ({
  recommendations,
  selectedMonth,
  onSelectRecommendation,
}) => {
  const getFilteredRecommendations = () => {
    if (selectedMonth === null) return [];
    return recommendations.filter((rec) => {
      const startMonth = dayjs(rec.startDate).month() + 1;
      const endMonth = dayjs(rec.endDate).month() + 1;
      return (
        startMonth === selectedMonth ||
        endMonth === selectedMonth ||
        (startMonth < selectedMonth && endMonth > selectedMonth)
      );
    });
  };

  const filteredRecs = getFilteredRecommendations();

  return (
    <div className="flex-1">
      <h3 className="mb-3 text-lg font-semibold text-gray-700">
        {selectedMonth ? `${selectedMonth}월 추천 일정` : "추천 일정"}
      </h3>
      <div className="h-80 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-3 pr-2">
        {selectedMonth ? (
          filteredRecs.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filteredRecs.map((rec, index) => (
                <HolidayCard
                  key={index}
                  recommendation={rec}
                  onClick={() => onSelectRecommendation(rec)}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">이 달에 추천 일정이 없습니다.</p>
            </div>
          )
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">
              추천 일정을 보려면 월을 선택하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayList; 