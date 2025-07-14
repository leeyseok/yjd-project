import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

interface DateRangePickerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onSwapDates: () => void;
  onSetStartDate: (date: Dayjs | null) => void;
  onSetEndDate: (date: Dayjs | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onSwapDates,
  onSetStartDate,
  onSetEndDate,
}) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-300 p-3">
      <div className="flex-1">
        <label className="mb-1 block text-sm text-gray-500">출발일</label>
        <DatePicker
          value={startDate}
          onChange={onSetStartDate}
          minDate={dayjs().startOf('day')}
          format="YYYY.MM.DD"
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              fontSize: "16px",
              height: "40px",
              padding: "0 14px",
            },
          }}
          slotProps={{
            textField: {
              variant: "standard",
              InputProps: { disableUnderline: true },
              placeholder: "YYYY.MM.DD",
            },
          }}
        />
      </div>

      <SwapHorizIcon onClick={onSwapDates} className="text-gray-400 cursor-pointer" />

      <div className="flex-1">
        <label className="mb-1 block text-sm text-gray-500">도착일</label>
        <DatePicker
          value={endDate}
          onChange={onSetEndDate}
          format="YYYY.MM.DD"
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              fontSize: "16px",
              height: "40px",
              padding: "0 14px",
            },
          }}
          slotProps={{
            textField: {
              variant: "standard",
              InputProps: { disableUnderline: true },
              placeholder: "YYYY.MM.DD",
            },
          }}
        />
      </div>
    </div>
  );
};

export default DateRangePicker; 