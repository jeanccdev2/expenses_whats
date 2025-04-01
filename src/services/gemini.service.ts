import { injectable } from "inversify";
import ollama from "ollama";
import { AIMessageResponse, IAIService } from "../types/webhook/ai";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const geminiConfig = {
  model: {
    model: "gemini-2.5-pro-exp-03-25",
    systemInstruction: `Extraia as seguintes informações e retorne um JSON com o formato:
  {
    "amount": <valor do item>,
    "name": "<nome do item>",
    "category": "<categoria>",
    "description": "<descrição>"
  }
  Se não souber algum valor, retorne null.`,
  },
  config: {
    temperature: 0.2,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 4096,
    responseModalities: [],
    responseMimeType: "application/json",
  },
};

@injectable()
export class GeminiService implements IAIService {
  private model: GenerativeModel;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    this.model = genAI.getGenerativeModel(geminiConfig.model);
  }

  async postSendMessageToChat(message: string): Promise<AIMessageResponse> {
    try {
      const chatSession = this.model.startChat({
        generationConfig: {
          ...geminiConfig.config,
        },
      });

      const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
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
