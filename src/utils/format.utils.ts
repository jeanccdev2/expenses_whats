import { injectable } from "inversify";
import { IMessageBody } from "../types/webhook/message";

type FormatMessageResponse = {
  message: string;
  sender_number: string;
  created_at: string;
};

export interface IFormat {
  formatMessageBody(body: IMessageBody): FormatMessageResponse;
  getPhoneNumber(sender: string): string;
}

@injectable()
export class Format implements IFormat {
  public formatMessageBody(body: IMessageBody): FormatMessageResponse {
    return {
      message: body.data.message.conversation,
      sender_number: this.getPhoneNumber(body.sender),
      created_at: new Date(body.date_time).toISOString(),
    };
  }

  public getPhoneNumber(sender: string): string {
    const splitPhoneNumber = sender.split("@")[0];

    return splitPhoneNumber;
  }
}
