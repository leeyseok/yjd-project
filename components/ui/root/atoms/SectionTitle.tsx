import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-base text-gray-500">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle; 