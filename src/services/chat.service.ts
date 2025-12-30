import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuraResponse } from "@/services/ai.service";
import type { MessageProps } from "@/types/chat.types";

export const handleSendMessage = async (
  chatId: string,
  text: string,
  history: MessageProps[],
  onlyAura: boolean = false 
) => {
  if (!onlyAura) {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      text,
      sender: "user",
      timestamp: serverTimestamp(),
    });

    await updateDoc(doc(db, "chats", chatId), {
      updatedAt: serverTimestamp(),
    });
  }

  const formattedHistory = history.map((msg) => ({
    role: msg.sender === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  }));

  const auraText = await getAuraResponse(formattedHistory, text);

  await addDoc(collection(db, "chats", chatId, "messages"), {
    text: auraText,
    sender: "aura",
    timestamp: serverTimestamp(),
  });

  await updateDoc(doc(db, "chats", chatId), {
    updatedAt: serverTimestamp(),
  });
};
