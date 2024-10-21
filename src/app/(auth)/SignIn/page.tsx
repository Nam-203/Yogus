import React from "react";
import Formlogin from "../_Component/Formlogin";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex justify-center items-center bg-gray-900 p-8">
        <div className="max-w-md w-full">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Hello,{" "}
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-300">
                Wellcom to my website
              </span>
            </h1>
          </div>
          <p className="text-gray-400 mb-8">
            Log in to platform to start creating magic.
          </p>
          <Formlogin />
        </div>
      </div>
      <div className="flex-1 h-screen relative">
        <Image
          src="/back7.png"
          fill
          style={{ objectFit: "cover" }}
          alt="Background"
        />
        <div className=" pl-6 ml-7 absolute bottom-0 w-[600px] p-6 ">
          <h3 className="text-white text-3xl mb-5 pb-3 ">
            Nia has been a game-changer for our content creation process.
          </h3>
          <p className="text-white mb-5 pb-3 text-3xl">
            The AI-powered tools are incredibly user-friendly and have saved us
            countless hours of work.
          </p>
          <p className="text-gray-400 mt-2">Lily Alisson</p>
          <p className=" text-xs text-[#b6f09c]">CMO at Nia team</p>
        </div>
      </div>
    </div>
  );
};

export default page;
