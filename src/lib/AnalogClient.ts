import { Client, ClientEvents } from "discord.js";
import { FileProcessor } from "@/lib/utils/Parser/FileParser";
import * as path from "path";
import { ListenerConstructor } from "@/lib/structure/listener";
import { AnalogStore } from "@/lib/store/Store";
import { CommandConstructor } from "@/lib/structure/command";

export class AnalogClient extends Client {
  store: AnalogStore;
  constructor() {
    super({
      intents: [
        "DirectMessagePolls",
        "DirectMessageReactions",
        "GuildEmojisAndStickers",
        "GuildInvites",
        "GuildMembers",
        "GuildMessagePolls",
        "GuildMessageReactions",
        "GuildScheduledEvents",
        "GuildVoiceStates",
        "Guilds",
        "MessageContent",
        "GuildMessages",
      ],
    });

    this.store = new AnalogStore();
  }

  // Initialize all the configs
  public init = async () => {
    await this.loadCommands();
    await this.loadListener();
  };

  // load all listener
  private loadListener = async () => {
    const processor = new FileProcessor();
    const listenerDir = path.join(
      this.store.constant.BASE_PATHNAME,
      "listener"
    );

    const listeners = await processor.getFilesRecursively(listenerDir);

    for (const listener of listeners) {
      const importedModule = await import(listener);
      const ListenerClass = importedModule.default as ListenerConstructor<
        keyof ClientEvents
      >;

      const eventInstance = new ListenerClass(this.store);

      // check for duplicate id
      const isDuplicate = this.store.listener.get(eventInstance.id);
      if (isDuplicate) {
        throw new Error(
          `Duplicate id found in listener ${eventInstance.name}: ${eventInstance.id}`
        );
      }
      this.store.listener.set(eventInstance.id, eventInstance);

      if (eventInstance.once) {
        this.once(eventInstance.name, eventInstance.action);
      } else {
        this.on(eventInstance.name, eventInstance.action);
      }
    }
  };

  // Load all commands
  private loadCommands = async () => {
    const processor = new FileProcessor();
    const commandDir = path.join(this.store.constant.BASE_PATHNAME, "command");

    const commands = await processor.getFilesRecursively(commandDir);

    for (const command of commands) {
      const importedModule = await import(command);
      const CommandClass = importedModule.default as CommandConstructor;

      const commandInstance = new CommandClass(this.store);

      // check for duplicate id
      const isDuplicate = this.store.commands.get(commandInstance.id);
      if (isDuplicate) {
        throw new Error(
          `Duplicate id found in Command ${commandInstance.name}: ${commandInstance.id}`
        );
      }

      this.store.commands.set(commandInstance.id, commandInstance);
    }
  };
}
