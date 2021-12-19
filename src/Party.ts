import Board from "./Board/Board";
import { BoardState } from "./Board/BoardState";
import Player, { PlayerBlack, PlayerWhite } from "./Player";
import TravelPlay from "./TravelPlay";
import { BoardJSON, PartyState, WHITE } from "./utils/type";

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
    this.turns = [new Board(initBoard)];
    this.partyState = { playerTurn: playerWhite };
  }

  getPlaysPossible(): TravelPlay[] {
    return this.getCurrentBoard().getPlayerPlays(this.partyState.playerTurn);
  }

  private getCurrentBoard(): Board {
    return this.turns[this.turns.length - 1];
  }

  getCurrentBoardJSON(): BoardJSON {
    return this.getCurrentBoard().getJSON();
  }
}
export default Party;
