import { cloneDeep } from "lodash";
import Board from "../Board/Board";
import { BoardState } from "../Board/BoardState";
import Piece from "../Piece/Piece";
import Player, { PlayerBlack, PlayerWhite } from "../Player/Player";
import TravelPlay from "../TravelPlay/TravelPlay";
import { ERROR_PLAY_NOT_POSSIBLE } from "../utils/error";
import { BoardJSON, PartyState, PlayJSON, WHITE } from "../utils/type";

class Party {
  private playerWhite: Player;
  private playerBlack: Player;
  private turns: Board[];
  private partyState: PartyState;

  constructor(
    initBoard: BoardState,
    playerWhite: PlayerWhite,
    playerBlack: PlayerBlack
  ) {
    this.playerWhite = playerWhite;
    this.playerBlack = playerBlack;
    this.turns = [new Board(cloneDeep(initBoard))];
    this.partyState = { playerTurn: playerWhite };
  }

  getPlaysPossible(): TravelPlay[] {
    return this.getCurrentBoard().getPlayerPlays(this.partyState.playerTurn);
  }

  getCurrentBoard(): Board {
    return this.turns[this.turns.length - 1];
  }

  getCurrentPlayer(): Player {
    return this.partyState.playerTurn;
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
    const isEatenPlay = play;
    const canEatFromNewPosition =
      this.getCurrentBoard().getPieceEatenPlays(
        this.getCurrentBoard().getBox(play.to) as Piece,
        play.to
      ).length > 0;
    return isEatenPlay && canEatFromNewPosition;
  }

  private updateCurrentPlayer() {
    this.partyState.playerTurn = this.partyState.playerTurn.equals(
      this.playerBlack
    )
      ? this.playerWhite
      : this.playerBlack;
  }
}
export default Party;
