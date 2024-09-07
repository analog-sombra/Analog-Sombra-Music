import "tsconfig-paths/register";
import "@/lib/utils/constant";
import { AnalogClient } from "./lib/AnalogClient";

(async () => {
  const client = new AnalogClient();
  await client.init();
  await client.login(client.store.constant.DISCORD_BOT_TOKEN);
})();
