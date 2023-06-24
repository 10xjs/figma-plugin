import { useMemo, useSyncExternalStore } from 'react';

class ImmutableSet<T> implements Set<T> {
  [Symbol.toStringTag] = 'ProxtSet';

  #target: Set<T>;
  #proxy: ProxySet<T>;

  constructor(target: Set<T>, proxy: ProxySet<T>) {
    this.#target = target;
    this.#proxy = proxy;
  }

  add(value: T): this {
    this.#proxy.add(value);
    return this;
  }

  clear(): void {
    this.#proxy.clear();
  }

  delete(value: T): boolean {
    return this.#proxy.delete(value);
  }

  forEach(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    thisArg?: any
  ): void {
    return this.#target.forEach(callbackfn, thisArg);
  }

  has(value: T): boolean {
    return this.#target.has(value);
  }

  get size(): number {
    return this.#target.size;
  }

  entries(): IterableIterator<[T, T]> {
    return this.#target.entries();
  }

  keys(): IterableIterator<T> {
    return this.#target.keys();
  }

  values(): IterableIterator<T> {
    return this.#target.values();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.#target[Symbol.iterator]();
  }

  [Symbol.toStringTag] = 'ProxtSet';
}

class ProxySet<T> {
  #listeners = new Set<() => void>();
  #snapshot;

  constructor(values?: Iterable<T> | T[] | null | undefined) {
    this.#snapshot = new ImmutableSet(new Set(values), this);
    this.subscribe = this.subscribe.bind(this);
    this.getSnapshot = this.getSnapshot.bind(this);
  }

  forEach(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    thisArg: any = this
  ): void {
    return this.#snapshot.forEach(callbackfn, thisArg);
  }

  subscribe(listener: () => void) {
    this.#listeners.add(listener);

    return () => {
      this.#listeners.delete(listener);
    };
  }

  #notify() {
    this.#listeners.forEach((listener) => listener());
  }

  getSnapshot() {
    return this.#snapshot;
  }

  add(value: T) {
    if (this.#snapshot.has(value)) {
      return this;
    }

    const state = new Set(this.#snapshot);
    state.add(value);

    this.#snapshot = new ImmutableSet(state, this);

    this.#notify();

    return this.#snapshot;
  }

  delete(value: T) {
    if (!this.#snapshot.has(value)) {
      return false;
    }

    const state = new Set(this.#snapshot);
    state.delete(value);

    (this.#snapshot = new ImmutableSet(state, this)), this;
    this.#notify();

    return true;
  }

  clear() {
    if (this.#snapshot.size === 0) {
      return;
    }

    this.#snapshot = new ImmutableSet(new Set<T>(), this);

    this.#notify();
  }
}

export function useSet<T>(
  values?:
    | Iterable<T>
    | T[]
    | null
    | (() => Iterable<T> | T[] | null)
    | undefined
) {
  const proxy = useMemo(() => {
    return new ProxySet(typeof values === 'function' ? values() : values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useSyncExternalStore(proxy.subscribe, proxy.getSnapshot);
}
