import React from "react";
import dayjs from "dayjs";
import { HolidayRecommendation } from "@/app/types/HolidayRecommendationType";

interface HolidayCardProps {
  recommendation: HolidayRecommendation;
  onClick: () => void;
}

const HolidayCard: React.FC<HolidayCardProps> = ({
  recommendation,
  onClick,
}) => {
  const isPriority = recommendation.priority === 1;
  const borderColor = isPriority ? "border-blue-500" : "border-gray-300";
  const titleColor = isPriority ? "text-blue-600" : "text-gray-800";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg border-l-4 bg-white p-3 transition-all duration-100 hover:shadow-md ${borderColor}`}
    >
      <h4 className={`mb-1 text-base font-bold ${titleColor}`}>
        {recommendation.holidayName} 연휴
      </h4>
      <p className="mb-1 text-sm font-medium text-gray-700">
        {dayjs(recommendation.startDate).format("YY.MM.DD")} ~{" "}
        {dayjs(recommendation.endDate).format("YY.MM.DD")} (
        {recommendation.totalDays}일)
      </p>
      <p className="text-xs text-gray-500">{recommendation.description}</p>
    </div>
  );
};

export default HolidayCard; 