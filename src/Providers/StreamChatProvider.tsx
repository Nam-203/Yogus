"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Chat,
  Channel,

  useCreateChatClient,
} from "stream-chat-react";
import { tokenChatProvider } from "@/actions/stream-chat.action";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const StreamProvider = ({ children, meetingId }: { children: ReactNode; meetingId: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [channel, setChannel] = useState<Channel>(); 

  if (!apiKey) {
    throw new Error("API Key is required but not provided.");
  }

  const chatClient = useCreateChatClient({
    apiKey,
    tokenOrProvider: tokenChatProvider,
    userData: {
      id: session?.user?.id as string,
      name: session?.user?.name || (session?.user?.email as string),
      image: session?.user?.image || "/icons/logoWeb.png",
    },
  });

  useEffect(() => {
    if (!session) return;
    if (!apiKey) {
      throw new Error("API Key not provided");
    }

    if (!chatClient) return;

    const setupChannel = async () => {
      const channelId = `meeting-${meetingId}`;
      
      const channels = await chatClient.queryChannels({
        filter: { id: channelId },
      });

      if (channels.length === 0) {
        const newChannel = chatClient.channel("messaging", channelId, {
          name: `Meeting ${meetingId}`,
        });
        await newChannel.create();
        setChannel(newChannel); 
      } else {
        setChannel(channels[0]); 
        console.log(`Using existing channel: ${channelId}`);
      }
    };

    setupChannel();

    return () => {
      chatClient.disconnectUser();
    };
  }, [session, status, chatClient, router, meetingId]); 

  if (status === "loading") return null;
  if (!chatClient || !channel) return null; 

  return <Chat client={chatClient}>{children}</Chat>;
};
