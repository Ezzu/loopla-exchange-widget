import type { CachedItem } from 'types';

export class CacheService {
  private cache: Map<string, CachedItem<any>>;
  private readonly ttl: number;

  constructor(ttlMinutes: number = 10) {
    this.cache = new Map();
    this.ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // Check if expired
    if (this.isExpired(item.timestamp)) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set<T>(key: string, data: T): void {
    const item: CachedItem<T> = {
      data,
      timestamp: Date.now(),
    };

    this.cache.set(key, item);
  }

  clear(key: string): void {
    this.cache.delete(key);
  }

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.ttl;
  }

  // For testing/debugging
  size(): number {
    return this.cache.size;
  }
}
