"use client";
import { Check } from "@mui/icons-material";

interface ThemeCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

const ThemeCard = ({
  id,
  name,
  icon,
  description,
  isSelected,
  onClick,
}: ThemeCardProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`
        relative cursor-pointer rounded-xl p-5 min-h-[140px] flex flex-col items-center justify-center text-center border-2
        ${
          isSelected
          ? "border-blue-500 bg-blue-50"
          : "bg-white hover:bg-gray-100 border-gray-200 hover:border-gray-300"
        }
        group
      `}
    >
      {/* 체크된 테마 표시 */}
      <div
        className={`
        absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center
        transition-all duration-300
        ${
          isSelected
            ? "bg-blue-500 opacity-100" // 체크된 테마는 제대로 보이게 표시
            : "bg-gray-200 opacity-0 group-hover:opacity-60" // 처음엔 안보이지만 hover시 연하게 보이게 표시
        }
       
      `}
      >
        <Check
          className={` w-3.5 h-3.5 ${
            isSelected ? "text-white" : "text-gray-500"
          } p-1`}
        />
      </div>

      {/* 각테마별 아이콘 */}
      <div
        className={`
        text-4xl mb-3
      `}
      >
        {icon}
      </div>

      {/* 각테마별 테마명 */}
      <h3
        className={`
        font-semibold text-sm mb-2 leading-tight
        ${
          isSelected
            ? "text-blue-700"
            : "text-gray-800 group-hover:text-gray-900"
        }
      `}
      >
        {name}
      </h3>

      {/* 각테마별 설명 */}
      <p
        className={`
        text-xs leading-relaxed line-clamp-2 px-1
        ${
          isSelected
            ? "text-blue-600"
            : "text-gray-600 group-hover:text-gray-700"
        }
      `}
      >
        {description}
      </p>
    </div>
  );
};

export default ThemeCard;
