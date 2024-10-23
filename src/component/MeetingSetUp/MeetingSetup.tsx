"use client";
import { Button } from "@/components/ui/button";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const MeetingSetup = ({
  setIsSetIpComplete,
}: {
  setIsSetIpComplete: (value:boolean) => void;
}) => {
  const [isMicCamToggle, setIsMicCamToggle] = useState(true);
  const call = useCall();
  if (!call) {
    throw new Error("useCall must be used within StreamCAll component");
  }
  useEffect(() => {
    if (isMicCamToggle) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggle, call?.camera, call?.microphone]);
  return (
    <div className="flex text-white h-screen w-full flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className=" flex h-16 items-center justify-center gap-3">
        <label className=" flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggle}
            onChange={(e) => setIsMicCamToggle(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button onClick={()=>{
        call.join()
        setIsSetIpComplete(true)}} className="rounded-md bg-green-500 px-4 py-3">
        join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
