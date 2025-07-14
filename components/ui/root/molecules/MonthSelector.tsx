import React from "react";
import { Button } from "@mui/material";

interface MonthSelectorProps {
  selectedMonth: number | null;
  onSelectMonth: (month: number) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  onSelectMonth,
}) => {
  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-gray-700">여행 월 선택</h3>
      <div className="grid grid-cols-3 gap-2">
        {[...Array(12)].map((_, index) => (
          <Button
            key={index}
            variant={selectedMonth === index + 1 ? "contained" : "outlined"}
            onClick={() => onSelectMonth(index + 1)}
            className={`h-10 rounded-lg text-base font-semibold ${
              selectedMonth === index + 1
                ? "bg-blue-500 text-white"
                : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            {index + 1}월
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MonthSelector; 