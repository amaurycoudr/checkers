import { Color, Side } from "./utils/type";
declare class Player {
    private color;
    private position;
    private name;
    constructor(color: Color, position: Side, name: string);
    toStr(): string;
    equals(player: Player): boolean;
    isTop(): boolean;
    getColor(): Color;
}
export default Player;
