"use client";
import { tokenProvider } from "@/actions/stream.action";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
export const StreamProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] =
    useState<StreamVideoClient>();
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {

    if (!session) return;
    if (!apiKey) {
      throw new Error("API Key not provided");
    }
    if (session) {
      const user = {
        id: session.user?.id as string,
        name: session.user?.name || (session.user?.email as string),
        image: session.user?.image || "/icons/logoWeb.png",
      };
      const client =  StreamVideoClient.getOrCreateInstance ({ apiKey, user, tokenProvider });

      setStreamVideoClient(client);
    }
   

  }, [session, status, router]);

  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};
