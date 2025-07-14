import React from "react";
import { Button, Box } from "@mui/material";

interface PlanActionButtonsProps {
  onReset: () => void;
  onRegenerate: () => void;
  onFinish: () => void;
  isPlanGenerated: boolean;
}

const PlanActionButtons: React.FC<PlanActionButtonsProps> = ({
  onReset,
  onRegenerate,
  onFinish,
  isPlanGenerated,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", mt: 4 }}>
      <Button variant="outlined" onClick={onReset} sx={{ flexBasis: "30%" }}>
        처음으로 돌아가기
      </Button>
      <Button
        variant="outlined"
        onClick={onRegenerate}
        sx={{ flexBasis: "30%" }}
      >
        플랜 다시 생성하기
      </Button>
      <Button
        variant="contained"
        onClick={onFinish}
        disabled={!isPlanGenerated}
        sx={{ flexBasis: "35%" }}
      >
        이 플랜으로 확정
      </Button>
    </Box>
  );
};

export default PlanActionButtons; 