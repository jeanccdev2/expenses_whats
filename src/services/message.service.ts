import { injectable } from "inversify";
import { ISendMessageBody } from "../types/message/sendMessage";
import { evolutionApi } from "../configs/axios";

export interface IMessageService {
  postSendMessage(instance: string, body: ISendMessageBody);
}

@injectable()
export class MessageService implements IMessageService {
  constructor() {}

  async postSendMessage(instance: string, body: ISendMessageBody) {
    try {
      console.log("Body:", body);

      await evolutionApi.post(`/message/sendText/${instance}`, {
        number: body.number,
        text: body.text,
        // options
        // "delay": 1200,
        // "quoted": {
        //     // payload message or key.id only for get message in database
        //     "key": {
        //         "id": " MESSAGE_ID"
        //     },
        //     "message": {
        //         "conversation": "CONTENT_MESSAGE"
        //     }
        // },
        // "linkPreview": false,
        // "mentionsEveryOne": false,
        // "mentioned": [
        //     "{{remoteJid}}"
        // ]
      });
    } catch (error) {
      console.error("Error sending message", error);
    }
  }
}
