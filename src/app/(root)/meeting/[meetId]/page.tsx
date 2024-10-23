"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/component/MeetingSetUp/MeetingSetup";
import MeetingRooms from "@/component/MeetingRoom/MeetingRooms";
import { useGetCallById } from "@/hooks/useGetCallById";
import LoadingPage from "@/component/Loading/LoadingPage";
import { useParams } from "next/navigation";

const MeetingRoom = ({ params }: { params: { meetId: string } }) => {
  const { data: session, status } = useSession();
  const [isSetIpComplete, setIsSetIpComplete] = useState(false);
  const {id}=useParams()
  const { call, isCallLoading } = useGetCallById(id);
  if (status === "loading" || isCallLoading) return <LoadingPage />;
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}> 
        <StreamTheme>
          {!isSetIpComplete ? <MeetingSetup setIsSetIpComplete ={setIsSetIpComplete}/> : <MeetingRooms />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingRoom;
