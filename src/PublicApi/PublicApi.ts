import { CLASSIC_BOARD } from "../Board/BoardState";
import Party from "../Party/Party";
import TravelPlay from "../TravelPlay/TravelPlay";
import { BoardArray, Color, PlayJSON } from "../utils/type";

export type PartyState = {
  playerTurn: Color;
  board: BoardArray;
  plays: PlayJSON[];
};
class PublicApi {
  private party: Party;

  constructor() {
    this.party = new Party(CLASSIC_BOARD);
  }

  getState(): PartyState {
    return {
      board: this.party.getCurrentBoard().getArray(),
      playerTurn: this.party.getCurrentPlayer(),
      plays: this.party.getPlaysPossible().map((play) => play.getJSON()),
    };
  }

  play(play: PlayJSON): PartyState {
    this.party.playTurn(TravelPlay.fromJson(play));
    return this.getState();
  }
}
export default PublicApi;
