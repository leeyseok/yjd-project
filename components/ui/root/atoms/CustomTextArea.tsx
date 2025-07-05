import React from 'react';

interface CustomTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
}

const CustomTextArea = ({ 
  value, 
  onChange, 
  placeholder, 
  label, 
  rows = 4 
}: CustomTextAreaProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full px-4 py-3 border border-gray-300 rounded-xl resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          placeholder-gray-400 text-gray-900
          transition-all duration-200
          bg-white hover:border-gray-400
        "
      />
    </div>
  );
};

export default CustomTextArea; 