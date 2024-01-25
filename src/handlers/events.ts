import { Instance } from "../instance";
import { readdir } from "fs/promises";
import { snakeToCamel } from "../utils/string";

export interface EventHandler<T = any> {
  event: string;
  execute(instance: Instance, packet: T): void;
}

export async function registerEvents(instance: Instance) {
  const path =
    process.env.NODE_ENV === "development" ? "./src/events" : "./dist/events";

  const files = await readdir(path);

  for (const file of files) {
    const { default: event }: { default: EventHandler } = await import(
      `../events/${file}`
    );

    instance.client.on(event.event, (data) => {
      const camelData = snakeToCamel(data);

      event.execute(instance, camelData);
    });
  }

  console.log(`Events registered (${files.length})`);
}
