export interface IMessageBody {
  event: string;
  instance: string;
  data: IReceiveMessageData;
  destination: string;
  date_time: string;
  sender: string;
  server_url: string;
  apikey: string;
}

export interface IReceiveMessageData {
  key: IReceiveMessageKey;
  pushName: string;
  status: string;
  message: IReceiveMessageMessage;
  messageType: string;
  messageTimestamp: number;
  instanceId: string;
  source: string;
}

export interface IReceiveMessageKey {
  remoteJid: string;
  fromMe: boolean;
  id: string;
  participant: string;
}

export interface IReceiveMessageMessage {
  conversation: string;
  messageContextInfo: IReceiveMessageMessageContextInfo;
}

export interface IReceiveMessageMessageContextInfo {
  messageSecret: string;
}
