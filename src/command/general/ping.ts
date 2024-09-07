import { AnalogStore } from "@/lib/store/Store";
import { CommandConfig, CommandStructure } from "@/lib/structure/command";

@CommandConfig({
  id: "ping_01",
  name: "ping",
  description: "Check Analog heartbeat!",
})
export default class Command extends CommandStructure {
  constructor(store: AnalogStore) {
    super(store);
  }

  action: () => unknown = () => {
    console.log("te");
  };
}
