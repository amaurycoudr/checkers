import { classicBoard } from "../Board/BoardState";
import Party, { PlayersJSON } from "../Party/Party";
import { PlayerBlack, PlayerJSON, PlayerWhite } from "../Player/Player";
import TravelPlay from "../TravelPlay/TravelPlay";
import { BoardArray, PlayJSON } from "../utils/type";

export type PartyState = {
  playerTurn: PlayerJSON;
  board: BoardArray;
  players: PlayersJSON;
  plays: PlayJSON[];
};
class PublicApi {
  private party: Party;

  constructor(playerWhiteName: string, playerBlackName: string) {
    const playerWhite = new PlayerWhite(playerWhiteName);
    const playerBlack = new PlayerBlack(playerBlackName);
    this.party = new Party(
      classicBoard(playerWhite, playerBlack),
      playerWhite,
      playerBlack
    );
  }

  getBoard(): PartyState {
    return {
      board: this.party.getCurrentBoard().getArray(),
      playerTurn: this.party.getCurrentPlayer().getJSON(),
      players: this.party.getPlayersJson(),
      plays: this.party.getPlaysPossible().map((play) => play.getJSON()),
    };
  }

  play(play: PlayJSON): PartyState {
    this.party.playTurn(TravelPlay.playFromJson(play));
    return this.getBoard();
  }
}
export default PublicApi;
