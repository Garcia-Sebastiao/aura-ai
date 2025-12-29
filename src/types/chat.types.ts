/* eslint-disable @typescript-eslint/no-explicit-any */
export type MessageProps = {
  id: string;
  text: string;
  sender: "user" | "aura";
  timestamp: string;
};

export type ChatProps = {
  id: string;
  userId: string;
  title: string;
  createdAt: any;
  updatedAt: any;
  messages?: MessageProps[];
};
