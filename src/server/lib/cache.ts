interface CacheEntry<T> {
  value: T;
  expiresAt: number;
  createdAt: number;
}

class MemoryCache {
  private store = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key);

    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlMs: number): T {
    this.store.set(key, {
      value,
      createdAt: Date.now(),
      expiresAt: Date.now() + ttlMs,
    });

    return value;
  }

  async getOrSet<T>(key: string, ttlMs: number, factory: () => Promise<T>): Promise<T> {
    const cached = this.get<T>(key);

    if (cached !== undefined) return cached;

    const value = await factory();
    return this.set(key, value, ttlMs);
  }

  getMeta(key: string) {
    const entry = this.store.get(key);

    if (!entry) return undefined;

    return {
      createdAt: new Date(entry.createdAt).toISOString(),
      expiresAt: new Date(entry.expiresAt).toISOString(),
    };
  }
}

export const cache = new MemoryCache();
