import React from 'react';
import { Button } from '@mui/material';
import { pageConst } from '@/constant/pageConst';

interface Step0Props {
  onSelectTripType: (type: typeof pageConst.tripType.domestic | typeof pageConst.tripType.international) => void;
}

const Step0_TripTypeSelection = ({ onSelectTripType }: Step0Props) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl text-gray-800 mb-4 font-bold">여행 종류 선택</h2>
      <Button
        onClick={() => onSelectTripType(pageConst.tripType.domestic)}
        variant="contained"
        sx={{ mb: 2, width: '100%', height: '50px' }}
      >
        국내 여행
      </Button>
      <Button
        onClick={() => onSelectTripType(pageConst.tripType.international)}
        variant="contained"
        sx={{ width: '100%', height: '50px' }}
      >
        해외 여행
      </Button>
    </div>
  );
};

export default Step0_TripTypeSelection;