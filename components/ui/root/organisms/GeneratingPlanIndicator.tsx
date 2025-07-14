import React from "react";
import { CircularProgress, Box } from "@mui/material";
import { Dayjs } from "dayjs";
import { Android } from "@mui/icons-material";
import { indigo, purple } from "@mui/material/colors";

interface GeneratingPlanIndicatorProps {
  destination: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

const GeneratingPlanIndicator: React.FC<GeneratingPlanIndicatorProps> = ({
  destination,
  startDate,
  endDate,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        my: 2,
        p: 3,
        background: `linear-gradient(135deg, ${purple[500]} 0%, ${indigo[500]} 100%)`,
        borderRadius: "16px",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="relative z-10">
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            mb: 4,
            color: "#ffffff",
          }}
        />

        <h4
          className="flex flex-col font-bold items-center justify-center text-2xl mb-4"
        >
          <Android sx={{ fontSize: 40 }} />
          AI가 여행 계획을 생성하고 있습니다
        </h4>

        <p className="mb-3 text-xl">
          {destination}으로의{" "}
          {endDate && startDate ? endDate.diff(startDate, "day") + 1 : ""}일
          여행
        </p>

        <p className="mx-auto text-lg">
          최신 정보와 현지 상황을 분석하여
          <br />
          맞춤형 여행 일정을 만들고 있습니다...
        </p>

        <div className="mt-4 flex justify-center gap-1">
          {["정보 분석", "일정 구성", "최적화"].map((step, index) => (
            <div
              key={step}
              className="
                px-2 py-1
                rounded-[20px]
                bg-white bg-opacity-20
                text-sm
                animate-fade-in-out
              "
              style={{
                "--duration": `1.5s`,
                "--delay": `${index * 0.5}s`,
              } as React.CSSProperties} // tailswind config참조
            >
              {step}
            </div>
          ))}
        </div>
      </div>
    </Box >
  );
};

export default React.memo(GeneratingPlanIndicator); 