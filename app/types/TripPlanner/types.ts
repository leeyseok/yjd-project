import { Dayjs } from "dayjs";

export type TravelType = "domestic" | "international";

export type AIPromptStateTypes = {
  step1: {
    travelType: TravelType;
    selectedThemes: string[];
    themeDescription: string;
  };
  step2: {
    destination: string;
  };
  step3: {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };
};

export interface TripData {
  travelType: TravelType;
  selectedThemes: string[];
  themeDescription: string;
  destination: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}
