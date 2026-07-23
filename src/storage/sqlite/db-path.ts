import path from "node:path";

const DEFAULT_RELATIVE_PATH = "data/pfinance.db";

export function resolveDbPath(): string {
  const configured = process.env.PFINANCE_DB_PATH?.trim();
  const relativeOrAbsolute = configured && configured.length > 0 ? configured : DEFAULT_RELATIVE_PATH;
  return path.isAbsolute(relativeOrAbsolute)
    ? relativeOrAbsolute
    : path.join(/* turbopackIgnore: true */ process.cwd(), relativeOrAbsolute);
}
