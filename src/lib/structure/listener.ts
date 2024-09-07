import { ClientEvents } from "discord.js";
import { AnalogStore } from "../store/Store";

export class ListenerStructure<K extends keyof ClientEvents> {
  name!: keyof ClientEvents;
  once!: boolean;
  id!: string;
  store: AnalogStore;

  constructor(store: AnalogStore) {
    this.store = store;
  }

  action: (...args: ClientEvents[K]) => void = () => {};
}

export function ListenerConfig({
  id,
  once,
  name,
}: {
  id: string;
  once: boolean;
  name: keyof ClientEvents;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      name = name;
      once = once;
      id = id;
    };
  };
}

export type ListenerConstructor<K extends keyof ClientEvents> = new (
  store: AnalogStore
) => ListenerStructure<K>;
