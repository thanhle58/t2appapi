export interface Repo<T> {
  exists(): Promise<boolean>;
  save(t: T): Promise<T>;
}
