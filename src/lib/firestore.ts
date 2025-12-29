import type { UserProps } from "@/types/user.types";
import type { ChatProps, MessageProps } from "@/types/chat.types"; // Importando os novos tipos
import { db } from "./firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const syncUser = async (user: UserProps): Promise<void> => {
  const userRef = doc(db, "users", user.id);

  await setDoc(
    userRef,
    {
      uid: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      lastSeen: serverTimestamp(),
    },
    { merge: true }
  );
};

export const startNewChat = async (
  userId: string,
  initialMessage: string
): Promise<string> => {
  const chatDoc = await addDoc(collection(db, "chats"), {
    userId,
    title: initialMessage.slice(0, 40) + "...",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await addDoc(collection(db, "chats", chatDoc.id, "messages"), {
    text: initialMessage,
    sender: "user",
    timestamp: serverTimestamp(),
  });

  return chatDoc.id;
};

export const subscribeToUserChats = (
  userId: string,
  callback: (chats: ChatProps[]) => void
) => {
  const q = query(
    collection(db, "chats"),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (querySnapshot) => {
    const chats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ChatProps[];

    callback(chats);
  });
};

export const subscribeToMessages = (
  chatId: string,
  callback: (messages: MessageProps[]) => void
) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MessageProps[];

    callback(messages);
  });
};
