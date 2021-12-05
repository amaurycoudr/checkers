import { Player, Position } from ".";

class Box {
  position: Position;
  player: Player;

  constructor(position: Position, player: Player) {
    this.position = position;
    this.player = player;
  }
}
export default Box;
