import {Injectable} from '@angular/core';

type MessageToLogType = {
  message: string,
  logType: number
}

export const LogTypes = {
  LOG: 1,
  WARNING: 2,
  ERROR: 3
}

@Injectable({
  providedIn: 'root'
})

export class LoggerService {
  private _messages: MessageToLogType[] = [];

  constructor() {
  }

  addMessageToLogPool(newMessage: MessageToLogType): void {
    this._messages.push(newMessage);
  }

  getAllMessages(): MessageToLogType[] {
    return this._messages;
  }

  getMessagesLength(): number {
    return this._messages.length
  }

  logMessage(messageToLogConfig: MessageToLogType): void {
    switch (messageToLogConfig.logType) {
      case LogTypes.LOG:
        console.log(messageToLogConfig.message)
        this.addMessageToLogPool(messageToLogConfig)
        break;
      case LogTypes.WARNING:
        console.warn(messageToLogConfig.message)
        this.addMessageToLogPool(messageToLogConfig)
        break;
      case LogTypes.ERROR:
        console.error(messageToLogConfig.message)
        this.addMessageToLogPool(messageToLogConfig)
        break;
      default:
        throw new Error("This log type is not supported");
    }
  }

  getLogConfig(message: string, logType: number): MessageToLogType {
    return {message, logType}
  }
}
