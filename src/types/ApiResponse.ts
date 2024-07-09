import { Message } from "@/models/User";

export interface APIResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>;
  secure_url?: string;
  public_id?: string;
};