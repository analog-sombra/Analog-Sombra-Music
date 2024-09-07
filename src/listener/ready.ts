import { AnalogStore } from "@/lib/store/Store";
import { ListenerConfig, ListenerStructure } from "@/lib/structure/listener";
import { ClientEvents } from "discord.js";

@ListenerConfig({
  id: "ready_01",
  name: "ready",
  once: true,
})
export default class Listener extends ListenerStructure<"ready"> {
  constructor(store: AnalogStore) {
    super(store);
  }

  action = (...args: ClientEvents["ready"]) => {
    const client = args[0];
    this.store.logger.info(
      `${client.user.username} successfully connnected to discord gateway!`
    );
    this.store.logger.info(
      `initialized ${this.store.listener.size} Listeners!`
    );
    this.store.logger.info(`initialized ${this.store.commands.size} Commands!`);
  };
}
