"use server";

import { auth } from "@/auth";
import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiKeySecret = process.env.API_SECRET_KEY;
export const tokenChatProvider = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("User not Logged in");
  }
  if (!apiKey) throw new Error("No API key");
  if (!apiKeySecret) throw new Error("No API key secret");
  const userId = session.user?.id;
  if (!userId) {
    throw new Error("User ID is not defined");
  }
  const client = StreamChat.getInstance(apiKey, apiKeySecret);
  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;
const token = client.createToken(userId,expirationTime,issuedAt)
  return token;
};
