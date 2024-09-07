import { AnalogStore } from "@/lib/store/Store";
import { ListenerConfig, ListenerStructure } from "@/lib/structure/listener";
import { ClientEvents } from "discord.js";

@ListenerConfig({
  id: "messageCreate_01",
  name: "messageCreate",
  once: false,
})
export default class Listener extends ListenerStructure<"messageCreate"> {
  constructor(store: AnalogStore) {
    super(store);
  }

  action = async (...args: ClientEvents["messageCreate"]) => {
    const message = args[0];

    if (message.content.toLocaleLowerCase() === "asp") {
      const ping = this.store.commands.get("ping_01");
      console.log(ping);
      await ping?.action();
    }
  };
}
