"use client";
import { useRouter } from "next/navigation";
import HomeCard from "../HomeCards/HomeCard";
import { useState } from "react";
import ModalComponent from "./../ModalComponent/ModalComponent";
import { useSession } from "next-auth/react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";

const Meetinglist = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [value, setValue] = useState({
    datetime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { data: session } = useSession();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !session) {
      throw new Error("Stream Video Client not initialized");
    }
    try {
      if (!value.datetime) {
        toast({
          title: "Please select date and time",
        });
        return;
      }
      const id = crypto.randomUUID().toString();
      const call = client.call("default", id);
      if (!call) throw new Error(" Failed to create default");
      const startAt = value.datetime.toISOString();
      const desciption = value.description || "InstantMeeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            desciption,
          },
        },
      });
      setCallDetails(call);
      if (!value.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created successfully",
        description: ` ${startAt}`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "fail to create meeting",
        description: "Friday, February 10, 2023 at 5:57 PM",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <section className=" grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <HomeCard
          className="bg-orange-1"
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Start new meeting"
          handleClick={() => setMeetingState("isInstantMeeting")}
        />
        <HomeCard
          className="bg-blue-1"
          img="/icons/join-meeting.svg"
          title="Join Meeting"
          description="via invitation link"
          handleClick={() => setMeetingState("isJoiningMeeting")}
        />
        <HomeCard
          img="/icons/schedule.svg"
          title="Schedule Meeting"
          description="Plan your meeting"
          className="bg-purple-1"
          handleClick={() => setMeetingState("isScheduleMeeting")}
        />
        <HomeCard
          img="/icons/recordings.svg"
          title="View Recordings"
          description="Meeting Recordings"
          className="bg-yellow-1"
          handleClick={() => router.push("/recordings")}
        />
      </section>
      <ModalComponent
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </>
  );
};

export default Meetinglist;
