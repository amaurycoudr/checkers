import Board from '../Board/Board';
import TravelPlay from '../TravelPlay/TravelPlay';
import { Color } from '../utils/type';

class PlaysPossible {
  board: Board;

  playerTurn: Color;

  constructor(board: Board, playerTurn: Color) {
    this.board = board;
    this.playerTurn = playerTurn;
  }

  getPlayerPlays(): TravelPlay[] {
    const eatenPlays = this.board.getPlayerEatenPlays(this.playerTurn);
    if (eatenPlays.length > 0) {
      return eatenPlays;
    }
    const travelMoves: TravelPlay[] = this.board.getPlayerTravelPlays(
      this.playerTurn,
    );
    return travelMoves;
  }
}
export default PlaysPossible;
