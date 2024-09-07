import logger from "@/lib/utils/logger";
import { createConstants } from "../utils/constant";
import { CommandStructure } from "../structure/command";
import { ListenerStructure } from "../structure/listener";
import { ClientEvents } from "discord.js";

export class AnalogStore {
  public constant;
  public logger;
  public listener: Map<string, ListenerStructure<keyof ClientEvents>> =
    new Map();
  public commands: Map<string, CommandStructure> = new Map();

  constructor() {
    this.constant = createConstants();
    this.logger = logger;
  }
}
