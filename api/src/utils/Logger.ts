import pino from "pino";

export default (tag: string) => pino({ msgPrefix: `[${tag}] ` });
