"use server";

import { auth } from "@/auth";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiKeySecret = process.env.API_SECRET_KEY;
export const tokenProvider = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("User not Logged in");
  }
  if (!apiKey) throw new Error("No API key");
  if (!apiKeySecret) throw new Error("No API key secret");
  const client = new StreamClient(apiKey, apiKeySecret);

  const token = client.generateUserToken({
    user_id: session?.user?.id as string, 
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  });  return token;
};
