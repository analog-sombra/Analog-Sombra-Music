import * as path from "path";
import dotenv from "dotenv";
dotenv.config();

const DISCORD_BOT_TOKEN: string = process.env.DISCORD_BOT_TOKEN ?? "";
if (!DISCORD_BOT_TOKEN)
  throw new Error("Provide DISCORD_BOT_TOKEN in environment variable!");

const BASE_PATHNAME: string = path.join(__dirname, "..", "..");

// Function to create and return the constants object
export function createConstants() {
  return {
    DISCORD_BOT_TOKEN,
    BASE_PATHNAME,
  };
}
