import { classicBoard } from "../Board/BoardState";
import Party from "../Party/Party";
import { PlayerBlack, PlayerWhite } from "../Player/Player";
import TravelPlay from "../TravelPlay/TravelPlay";
import { BoardArray, Color, PlayJSON } from "../utils/type";

export type PartyState = {
  playerTurn: Color;
  board: BoardArray;
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

  getState(): PartyState {
    return {
      board: this.party.getCurrentBoard().getArray(),
      playerTurn: this.party.getCurrentPlayer().getColor(),
      plays: this.party.getPlaysPossible().map((play) => play.getJSON()),
    };
  }

  play(play: PlayJSON): PartyState {
    this.party.playTurn(TravelPlay.playFromJson(play));
    return this.getState();
  }
}
export default PublicApi;
