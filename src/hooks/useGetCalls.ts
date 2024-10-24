"use client";

import { useState, useEffect } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCalls = async () => {
      if (!session || !session.user?.id || !client) return;
      setIsLoading(true);
      try {
        const result = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: session.user.id },
              { members: { $in: [session.user.id] } },
            ],
          },
        });
        const callsWithAvatars = result.calls.map((call: Call) => {
          const avatar = call.members?.find(
            (member) => member.user_id === session.user.id
          )?.image; 
          return {
            ...call,
            avatar, 
          };
          
        });  
        setCalls(callsWithAvatars)      
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalls();
  }, [client, session?.user?.id]);
  const now = new Date();
console.log(calls,"đaasdasdas")
  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });
  const upcommingCalls=calls.filter(({ state: { startsAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now);
  });
  return { endedCalls, upcommingCalls, callRecordings: calls, isLoading };
};
