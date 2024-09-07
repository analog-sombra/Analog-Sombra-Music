import { PermissionFlags } from "discord.js";
import { AnalogStore } from "../store/Store";

export class CommandStructure {
  id!: string;
  name!: string;
  description!: string;
  example?: string[];
  permissions?: PermissionFlags[];
  store: AnalogStore;

  constructor(store: AnalogStore) {
    this.store = store;
  }

  action: () => unknown = () => {};
}

export function CommandConfig({
  id,
  name,
  description,
  example,
  permissions,
}: {
  id: string;
  name: string;
  description: string;
  example?: string[];
  permissions?: PermissionFlags[];
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-object-type
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      id = id;
      name = name;
      description = description;
      example = example;
      permissions = permissions;
    };
  };
}

export type CommandConstructor = new (store: AnalogStore) => CommandStructure;
