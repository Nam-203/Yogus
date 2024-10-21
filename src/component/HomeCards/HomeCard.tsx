import { HomeCardProps } from "@/lib/types/TypeProps";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

const HomeCard: React.FC<HomeCardProps> = ({
  className,
  title,
  img,
  description,
  handleClick,
}) => {
  return (
    <div
      className={cn(
        " px-4 py-6 flex flex-col justify-between w-full  xl:max-w-96 min-h-[260px] rounded-3xl ",
        className
      )}
      onClick={handleClick}
    >
      <div className=" flex glassmorphism size-12 rounded-[10px] ">
        <Image src={img} alt="meetting" width={30} height={30} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className=" text-2xl font-bold"> {title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
