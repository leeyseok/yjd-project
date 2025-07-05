import React from "react";
import LanguageChanger from "../../../LanguageChanger";

const HeaderPage = () => {
  return (
    <header className="flex justify-between items-center w-full bg-white h-[50px] px-4">
      <div className="flex items-center">
        {/* 로고 */}
        <h1 className="flex items-end text-2xl font-bold">
          <span className="text-blue-600">여정다</span>
          <span className="text-sm text-blue-600 ml-2">여</span>
          <span className="text-sm text-black">행을</span>
          <span className="text-sm text-blue-600 ml-2">정</span>
          <span className="text-sm text-black">하</span>
          <span className="text-sm text-blue-600">다</span>
        </h1>
      </div>

      <div className="flex items-center space-x-4 ">
        <LanguageChanger />
      </div>
    </header>
  );
};

export default HeaderPage;
