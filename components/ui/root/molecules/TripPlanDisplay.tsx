import React from "react";
import { Paper, Typography } from "@mui/material";

interface TripPlanDisplayProps {
  tripPlan: string | null;
}

const TripPlanDisplay: React.FC<TripPlanDisplayProps> = ({ tripPlan }) => {
  const renderFormattedText = (plan: string) => {
    return plan.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <Typography key={index} variant="h4" gutterBottom>
            {line.substring(2)}
          </Typography>
        );
      } else if (line.startsWith("## ")) {
        return (
          <Typography key={index} variant="h5" gutterBottom sx={{ mt: 2 }}>
            {line.substring(3)}
          </Typography>
        );
      } else if (line.startsWith("### ")) {
        return (
          <Typography key={index} variant="h6" gutterBottom sx={{ mt: 1 }}>
            {line.substring(4)}
          </Typography>
        );
      } else if (line.startsWith("- ")) {
        return (
          <Typography key={index} component="div" sx={{ pl: 2 }} gutterBottom>
            {line}
          </Typography>
        );
      } else {
        return (
          <Typography key={index} paragraph>
            {line || "\u00A0"}
          </Typography>
        );
      }
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        overflow: "auto",
        bgcolor: "#f8f9fa",
        whiteSpace: "pre-wrap",
        lineHeight: 1.7,
        border: "1px solid #dee2e6",
        borderRadius: "8px",
      }}
    >
      {tripPlan ? (
        <Typography component="div" variant="body1">
          {renderFormattedText(tripPlan)}
        </Typography>
      ) : (
        <Typography
          color="text.secondary"
          sx={{ textAlign: "center", py: 5 }}
        >
          여행 플랜이 아직 생성되지 않았습니다. &apos;플랜 다시
          생성하기&apos; 버튼을 눌러주세요.
        </Typography>
      )}
    </Paper>
  );
};

export default TripPlanDisplay; 