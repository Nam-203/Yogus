"use client";
import { useRouter } from "next/navigation";
import HomeCard from "../HomeCards/HomeCard";
import { useState } from "react";
import ModalComponent from "./../ModalComponent/ModalComponent";
import { useSession } from "next-auth/react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";

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
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  const createMeeting = async () => {
    if (!client || !session) {
      throw new Error("Stream Video Client not initialized");
    }
    try {
      const id = crypto.randomUUID().toString();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create default");

      const startAt = value.datetime.toISOString();
      const description = value.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!value.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting created successfully",
        description: `Scheduled for ${startAt}`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
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

      {!callDetails ? (
        <ModalComponent
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-center"
          buttonText="Start Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-3">
            <label className="text-base text-normal leading-[22px]">
              Add description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValue({ ...value, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-base text-normal leading-[22px]">
              Add date
            </label>
            <ReactDatePicker
              selected={value.datetime}
              onChange={(date) => setValue({ ...value, datetime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </ModalComponent>
      ) : (
        <ModalComponent
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Meeting link copied successfully" });
          }}
          image="./icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <ModalComponent
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <ModalComponent
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Join Meeting"
        className="text-center"
        buttonText="Join"
        handleClick={() => router.push(value.link)}
      
      >
         <Input
          placeholder="Meeting link"
          onChange={(e) => setValue({ ...value, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </ModalComponent>
    </>
  );
};

export default Meetinglist;
