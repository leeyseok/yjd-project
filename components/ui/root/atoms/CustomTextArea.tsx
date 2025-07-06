import React from "react";

interface CustomTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  options?: {
    labelIcon: {
      icon: React.ReactNode;
      position: "start" | "end";
    };
  };
}

const CustomTextArea:React.FC<CustomTextAreaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  options,
}: CustomTextAreaProps) => {

  const { icon, position } = options?.labelIcon || {};
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {icon && position === "start" && icon}
          {label}
          {icon && position === "end" && icon}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full px-4 py-3 rounded-xl
          border border-gray-300 hover:border-gray-400 focus:border-blue-500
          focus:outline-none focus:ring-2 focus:ring-blue-500
          resize-none
          text-black text-[16px]
        "
      />
    </div>
  );
};

export default CustomTextArea;
