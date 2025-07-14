import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { HolidayRecommendation } from "@/app/types/HolidayRecommendationType";
import { groupingHolidays } from "@/utils/groupingHolidays";
import SectionTitle from "../atoms/SectionTitle";
import DateRangePicker from "../molecules/DateRangePicker";
import RecommendedDates from "../organisms/RecommendedDates";

interface Step3Props {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onSetStartDate: (date: Dayjs | null) => void;
  onSetEndDate: (date: Dayjs | null) => void;
  onComplete: () => void;
}

const Step3_DateSelection: React.FC<Step3Props> = ({
  startDate,
  endDate,
  onSetStartDate,
  onSetEndDate,
  onComplete,
}) => {
  const [recommendations, setRecommendations] = useState<
    HolidayRecommendation[]
  >([]);

  useEffect(() => {
    try {
      // 휴일 그룹화
      const sortedHolidays = groupingHolidays();
      setRecommendations(sortedHolidays);
    } catch (error) {
      console.error("Error creating holiday recommendations:", error);
    }
  }, []);

  const handleSelectRecommendation = (rec: HolidayRecommendation) => {
    onSetStartDate(dayjs(rec.startDate));
    onSetEndDate(dayjs(rec.endDate));
  };

  const handleSwapDates = () => {
    const tempStartDate = startDate;
    onSetStartDate(endDate);
    onSetEndDate(tempStartDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <div className="h-full w-full overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <SectionTitle title="여행 일정 선택" />

        <div className="my-6">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onSwapDates={handleSwapDates}
            onSetStartDate={onSetStartDate}
            onSetEndDate={onSetEndDate}
          />
        </div>

        <div className="mb-6">
          <RecommendedDates
            recommendations={recommendations}
            onSelectRecommendation={handleSelectRecommendation}
          />
        </div>

        <Button
          onClick={onComplete}
          variant="contained"
          disabled={!startDate || !endDate}
          className={`
            w-full h-[48px] rounded-xl text-lg font-bold 
            ${!startDate || !endDate ? "bg-gray-300" : "bg-blue-500"}
          `}
        >
          완료
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default Step3_DateSelection;