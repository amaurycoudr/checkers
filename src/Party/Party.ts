import Board from "../Board/Board";
import { BoardState } from "../Board/BoardState";
import EatenPlay from "../EatenPlay/EatenPlay";
import Piece from "../Piece/Piece";

import TravelPlay from "../TravelPlay/TravelPlay";
import { ERROR_PLAY_NOT_POSSIBLE } from "../utils/error";
import { BLACK, Color, WHITE } from "../utils/type";

class Party {
  private turns: Board[];
  private playerTurn: Color;

  constructor(initBoard: BoardState) {
    this.turns = [new Board(initBoard)];
    this.playerTurn = WHITE;
  }

  getPlaysPossible(): TravelPlay[] {
    return this.getCurrentBoard().getPlayerPlays(this.playerTurn);
  }

  getCurrentBoard(): Board {
    return this.turns[this.turns.length - 1];
  }

  getCurrentPlayer(): Color {
    return this.playerTurn;
  }

  playTurn(play: TravelPlay) {
    const realPlay = this.findPlayInPossible(play);

    if (!realPlay) {
      throw new Error(ERROR_PLAY_NOT_POSSIBLE);
    }
    this.makePlay(realPlay);
    const canPlayAgain = this.canCurrentPlayerPlayAgain(realPlay);

    if (!canPlayAgain) {
      this.updateCurrentPlayer();
    }
  }

  private findPlayInPossible(play: TravelPlay) {
    return this.getPlaysPossible().find((playPossible) => {
      return playPossible.equals(play);
    });
  }

  private makePlay(play: TravelPlay) {
    this.turns.push(this.getCurrentBoard().getNewBoardFromPlay(play));
  }

  private canCurrentPlayerPlayAgain(play: TravelPlay) {
    const isEatenPlay = play instanceof EatenPlay;

    const canEatFromNewPosition =
      this.getCurrentBoard().getPieceSecondEatenPlays(
        this.getCurrentBoard().getBox(play.to) as Piece,
        play.to
      ).length > 0;

    return isEatenPlay && canEatFromNewPosition;
  }

  private updateCurrentPlayer() {
    const isBlackTurn = this.playerTurn === BLACK;

    this.playerTurn = isBlackTurn ? WHITE : BLACK;
  }
}
export default Party;
