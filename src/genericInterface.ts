export interface Utils {
  toStr(): string;
  equals(o: Object): boolean;
}
export interface Json<T> {
  getJSON(): T;
}
