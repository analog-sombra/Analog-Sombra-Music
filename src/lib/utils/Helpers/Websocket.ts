import { io, Socket } from "socket.io-client";
import { Logger } from "winston";

export type ServerToClientEvents = { count: () => void };

export type ClientToServerEvents = {
  updateEvent: (updatedEvent: unknown) => void;
};

export class AnalogSocket {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | undefined;
  logger: Logger | undefined;

  constructor() {}

  connect = async (address: string, logger: Logger) => {
    try {
      this.logger = logger;
      this.socket = io(address);
    } catch (error) {
      logger.error(error);
    }
  };

  init = async () => {
    this.socket?.on("connect", () => {
      this.logger?.info(`Connected to WebSocket server: ${this.socket?.id}`);
    });

    this.socket?.on("disconnect", () => {
      this.logger?.info("Disconnected from WebSocket server");
    });
  };

  get = () => {
    return this.socket;
  };
}
