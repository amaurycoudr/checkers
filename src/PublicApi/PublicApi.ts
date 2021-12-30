import { CLASSIC_BOARD } from '../Board/BoardState';
import Party from '../Party/Party';
import TravelPlay from '../TravelPlay/TravelPlay';
import { BoardJSON, Color, PlayJSON } from '../utils/type';

export type PartyState = {
  playerTurn: Color;
  board: BoardJSON;

  plays: PlayJSON[];
};

class PublicApi {
  private party: Party;

  constructor() {
    this.party = new Party(CLASSIC_BOARD);
  }

  getState() {
    return {
      board: this.party.getCurrentBoard().getJSON(),
      playerTurn: this.party.getCurrentPlayer(),
      plays: this.party.getCurrentPlays().map((play) => play.getJSON()),
    };
  }

  play(play: PlayJSON): PartyState {
    this.party.playTurn(TravelPlay.fromJson(play));
    return this.getState();
  }
}

export default PublicApi;
