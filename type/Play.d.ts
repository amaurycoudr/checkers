import Position from "./Position";
declare class Play {
    private from;
    private to;
    constructor(from: Position, to: Position);
    toStr(): string;
}
export default Play;
