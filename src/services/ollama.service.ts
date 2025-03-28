import { injectable } from "inversify";
import { StandardApiResponse } from "../types/api-response";
import ollama from "ollama";
import { OllamaMessageResponse } from "../types/webhook/ollama-response";

export interface IOllamaService {
  postSendMessageToChat(message: string): Promise<OllamaMessageResponse>;
}

@injectable()
export class OllamaService implements IOllamaService {
  constructor() {}

  async postSendMessageToChat(message: string): Promise<OllamaMessageResponse> {
    try {
      const chat = await ollama.chat({
        model: "expenses_whats",
        messages: [{ role: "user", content: message }],
        format: {
          type: "object",
          properties: {
            amount: {
              type: "integer",
            },
            name: {
              type: "string",
            },
            category: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
          required: ["amount", "name", "category"],
        },
      });

      const response = JSON.parse(chat.message.content);

      return response;
    } catch (error) {
      console.error("Error saving webhook", error);

      return null;
    }
  }
}
