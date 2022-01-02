import { Utils } from '../genericInterface';
import Coordinate from '../Position/Coordinate/Coordinate';
import { MoveStr, PlayJSON } from '../utils/type';
declare class TravelPlay implements Utils {
    from: Coordinate;
    to: Coordinate;
    constructor(from: Coordinate, to: Coordinate);
    toStr(): string;
    equals(o: TravelPlay): boolean;
    getJSON(): PlayJSON;
    canTransformInQueen(size: number): boolean;
    static fromJson(json: PlayJSON): TravelPlay;
    static fromMove(from: Coordinate, to: MoveStr): TravelPlay;
}
export default TravelPlay;
