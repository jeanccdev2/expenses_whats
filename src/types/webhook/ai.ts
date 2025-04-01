export type AIMessageResponse = {
  name: string;
  amount: number;
  category?: string | null;
  description?: string | null;
};

export interface IAIService {
  postSendMessageToChat(message: string): Promise<AIMessageResponse>;
}
