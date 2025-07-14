import React, { useState } from "react";
import dayjs from "dayjs";

import { HolidayRecommendation } from "@/app/types/HolidayRecommendationType";
import MonthSelector from "../molecules/MonthSelector";
import HolidayList from "../molecules/HolidayList";
import SectionTitle from "../atoms/SectionTitle";

interface RecommendedDatesProps {
  recommendations: HolidayRecommendation[];
  onSelectRecommendation: (rec: HolidayRecommendation) => void;
}

const RecommendedDates: React.FC<RecommendedDatesProps> = ({
  recommendations,
  onSelectRecommendation,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    dayjs().month() + 1,
  );

  return (
    <div>
      <div className="mb-6">
        <SectionTitle
          title="여행 월 선택"
          subtitle="※여행하는 월을 선택해주시면 추천 날짜를 제시해드릴게요!"
        />
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-2/5">
          <MonthSelector
            selectedMonth={selectedMonth}
            onSelectMonth={setSelectedMonth}
          />
        </div>
        <div className="flex-1">
          <HolidayList
            recommendations={recommendations}
            selectedMonth={selectedMonth}
            onSelectRecommendation={onSelectRecommendation}
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedDates; 