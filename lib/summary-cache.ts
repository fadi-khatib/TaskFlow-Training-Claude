interface CacheEntry {
  count: number;
  stale: boolean;
}

const cache = new Map<number, CacheEntry>();

export function getCachedTaskCount(projectId: number, compute: () => number): number {
  const entry = cache.get(projectId);
  if (entry && !entry.stale) {
    return entry.count;
  }

  const count = compute();
  cache.set(projectId, { count, stale: false });
  return count;
}

export function invalidateTaskCount(projectId: number): void {
  const entry = cache.get(projectId);
  if (entry) {
    entry.stale = true;
  }
}

/** Test-only: clears the whole cache. */
export function resetSummaryCacheForTests(): void {
  cache.clear();
}
