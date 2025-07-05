"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import TripPlanner from "./TripPlanner";

const RootPage = () => {
  const [isStart, setIsStart] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <Image
        src="/main_bg.jpg"
        alt="logo"
        fill
        fetchPriority="high"
        className="relative object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center">
        {isStart ? (
          <TripPlanner onBack={() => setIsStart(false)} />
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center h-full gap-4">
            <Button
              onClick={() => {
                setIsStart(true);
              }}
              sx={{
                px: 4,
                py: 2,
                bgcolor: "#2563eb",
                color: "white",
                borderRadius: "8px",
                "&:hover": { bgcolor: "#1d4ed8" },
                fontSize: "1.25rem",
                fontWeight: "bold",
                width: { xs: "100%", md: "auto" },
              }}
            >
              <h1>여행 계획 만들기</h1>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RootPage;
