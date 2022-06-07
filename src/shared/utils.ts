export function maps<T>(list: T[], keyStrategy: (v: T) => string) {
  const map: Record<string, T | undefined> = {};

  for (const item of list) {
    map[keyStrategy(item)] = item;
  }

  return map;
}
