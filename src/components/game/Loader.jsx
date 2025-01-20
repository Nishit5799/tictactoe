import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="content">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loader;
