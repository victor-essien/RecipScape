import React from "react";
import { MdOutlineRefresh } from "react-icons/md";

const ErrorComponent = ({ error, handleRefresh }) => {
  return (
    <div className="w-full pr-0 pl:0 lg:pr-10 lg:pl-2 pb-10 lg:pb-0  2xl:px-40 bg-darj lg:rounded-lg h-screen overflow-hidden">
      <div className="flex text-gray font-bold text-xl w-full h-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          {" "}
          {/* Added items-center and space-y-4 for spacing */}
          <p>{error}</p> {/* Error text */}
          {/* Button will no longer be affected by flex of the parent */}
          <button
            onClick={() => handleRefresh()}
            className="bg-secondary text-black px-4 py-2 rounded-2xl flex items-center justify-center space-x-2"
          >
            {/* Icon and text side by side */}
            <MdOutlineRefresh size={30} className="font-" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
