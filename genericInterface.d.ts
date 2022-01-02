export interface Utils {
    toStr(): string;
    equals(o: unknown): boolean;
}
export interface Json<T> {
    getJSON(): T;
}
