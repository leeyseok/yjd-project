import React from 'react';
import { Button, FormControl, Select, MenuItem } from '@mui/material';
import { pageConst } from '@/constant/pageConst';

interface Step1Props {
  tripType: typeof pageConst.tripType.domestic | typeof pageConst.tripType.international | null;
  destination: string;
  onSetDestination: (dest: string) => void;
  onNext: () => void;
}

const Step1_DestinationSelection = ({ tripType, destination, onSetDestination, onNext }: Step1Props) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl text-gray-800 mb-4 font-bold">여행지 선택</h2>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <h3 className="text-gray-700 font-semibold mb-2">
          {tripType === pageConst.tripType.domestic ? '국내' : '해외'} 여행지 선택
        </h3>
        <Select
          value={destination}
          onChange={(e) => onSetDestination(e.target.value)}
        >
          {(tripType === pageConst.tripType.domestic
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
        sx={{
          width: '100%',
          height: '50px',
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.7)',
            backgroundColor: 'rgba(25, 118, 210, 0.5)',
          },
        }}
      >
        다음
      </Button>
    </div>
  );
};

export default Step1_DestinationSelection;
