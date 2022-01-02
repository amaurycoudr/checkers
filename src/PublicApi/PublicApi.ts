import { CLASSIC_BOARD } from '../Board/BoardState';
import Party, { PartyOptions } from '../Party/Party';
import TravelPlay from '../TravelPlay/TravelPlay';
import { BoardJSON, Color, PlayJSON } from '../utils/type';

export type PartyState = {
  /** color of the player turn */
  playerTurn: Color;
  /** current state of the board */
  board: BoardJSON;
  /** plays possible for the current player */
  plays: PlayJSON[];
  /** color of the winner */
  winner?: Color;
};

class PublicApi {
  private party: Party;

  constructor(options?: Partial<PartyOptions>) {
    this.party = new Party(CLASSIC_BOARD, options);
  }

  getState(): PartyState {
    return {
      board: this.party.getCurrentBoard().getJSON(),
      playerTurn: this.party.getCurrentPlayer(),
      plays: this.party.getCurrentPlays().map((play) => play.getJSON()),
      winner: this.party.getWinner(),
    };
  }

  play(play: PlayJSON): PartyState {
    this.party.playTurn(TravelPlay.fromJson(play));
    return this.getState();
  }
}

export default PublicApi;
