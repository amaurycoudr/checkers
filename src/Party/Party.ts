import Board from '../Board/Board';
import { BoardState } from '../Board/BoardState';
import PartySituation from '../Turn/Turn';
import TravelPlay from '../TravelPlay/TravelPlay';
import { Color, WHITE } from '../utils/type';

export type PartyOptions = {
  /**  The first player to play \
   *  **default: white**  */
  firstPlayer: Color;
  /** The Board size \
   * **default: 10**  */
  boardSize: 10 | 8;
  /** Decides if player must capture the maximum possible number of pieces \
   *  **default: true**  */
  shouldCatchPiecesMaximum: boolean;
  /** Decides if pieces promote only when ending their move on the final ran \
   * **default: true**  */
  shouldPromoteWhenMoveEnding: boolean;
};

export const defaultOptions: PartyOptions = {
  firstPlayer: WHITE,
  boardSize: 10,
  shouldCatchPiecesMaximum: true,
  shouldPromoteWhenMoveEnding: true,
};
class Party {
  private turns: PartySituation[] = [];

  private winner: Color | undefined = undefined;

  constructor(
    initBoard: BoardState,
    options: Partial<PartyOptions> = defaultOptions,
  ) {
    const completeOptions = { ...defaultOptions, ...options };

    this.turns.push(
      new PartySituation(
        new Board(initBoard, completeOptions.boardSize),
        completeOptions.firstPlayer,
        completeOptions.shouldCatchPiecesMaximum,
      ),
    );
  }

  private getCurrentTurn(): PartySituation {
    return this.turns[this.turns.length - 1];
  }

  getCurrentBoard(): Board {
    return this.getCurrentTurn().getBoard();
  }

  getCurrentPlayer(): Color {
    return this.getCurrentTurn().getPlayerTurn();
  }

  getCurrentPlays(): TravelPlay[] {
    return this.getCurrentTurn().getPlayerPlays();
  }

  getWinner() {
    return this.winner;
  }

  playTurn(play: TravelPlay) {
    const { newSituation, hasOtherPlayerLost } =
      this.getCurrentTurn().makePlay(play);

    if (hasOtherPlayerLost) {
      this.winner = this.getCurrentPlayer();
    }
    this.turns.push(newSituation);
  }
}
export default Party;
