import React from 'react';
import { Button, FormControl, Select, MenuItem } from '@mui/material';
import { pageConst } from '@/constant/pageConst';
import { TravelType } from '@/app/types/TripPlanner/types';

interface Step1Props {
  tripType: TravelType;
  destination: string;
  onSetDestination: (dest: string) => void;
  onNext: () => void;
}

const Step1_DestinationSelection:React.FC<Step1Props> = ({ tripType, destination, onSetDestination, onNext }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl text-gray-800 mb-4 font-bold">여행지 선택</h2>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <h3 className="text-gray-700 font-semibold mb-2">
          {tripType === pageConst.travelType.domestic ? '국내' : '해외'} 여행지 선택
        </h3>
        <Select
          value={destination}
          onChange={(e) => onSetDestination(e.target.value)}
        >
          {(tripType === pageConst.travelType.domestic
            ? pageConst.domestic.Regions
            : pageConst.international.Regions
          ).map((region) => {
            const [key, value] = Object.entries(region)[0];
            return (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        onClick={onNext}
        variant="contained"
        disabled={!destination}
        className={`
          w-full h-[48px] rounded-xl text-lg font-bold 
          ${destination ? "bg-blue-500" : "bg-gray-300"}
        `}
      >
        다음
      </Button>
    </div>
  );
};

export default Step1_DestinationSelection;
