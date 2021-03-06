import { cloneDeep } from 'lodash';
import { methodTest } from '../test/utils';
import Board from '../Board/Board';
import {
  BoardState,
  CLASSIC_BOARD,
  EAT_BOARD,
  TWO_PLAY_BOARD,
} from '../Board/BoardState';
import EatenPlay from '../EatenPlay/EatenPlay';
import { pawnBlack, pawnWhite } from '../Piece/Pawn/pawns';
import {
  A1,
  A2,
  A5,
  A7,
  A8,
  B1,
  B4,
  B6,
  B9,
  C10,
  C3,
  C5,
  C7,
  D4,
  D6,
  E5,
  E7,
  F10,
  F4,
  F6,
  F8,
  G5,
  G7,
  G9,
  H4,
  H6,
  I5,
  I7,
  J4,
  J6,
} from '../Position/Coordinate/coordinates';
import TravelPlay from '../TravelPlay/TravelPlay';
import { ERROR_PARTY_FINISH, ERROR_PLAY_NOT_POSSIBLE } from '../utils/error';
import { BLACK, WHITE } from '../utils/type';
import Party from './Party';
import Queen from '../Queen/Queen';

const startParty = new Party(CLASSIC_BOARD);

const eatParty = new Party(EAT_BOARD);

const startBlackParty = new Party(CLASSIC_BOARD, { firstPlayer: 'black' });

const whiteFirstTurnPlays = [
  new TravelPlay(B4, A5),
  new TravelPlay(B4, C5),
  new TravelPlay(D4, C5),
  new TravelPlay(D4, E5),
  new TravelPlay(F4, E5),
  new TravelPlay(F4, G5),
  new TravelPlay(H4, G5),
  new TravelPlay(H4, I5),
  new TravelPlay(J4, I5),
];

const blackFirstTurnPlays = [
  new TravelPlay(A7, B6),
  new TravelPlay(C7, B6),
  new TravelPlay(C7, D6),
  new TravelPlay(E7, D6),
  new TravelPlay(E7, F6),
  new TravelPlay(G7, F6),
  new TravelPlay(G7, H6),
  new TravelPlay(I7, H6),
  new TravelPlay(I7, J6),
];

methodTest(startParty.getCurrentBoard, () => {
  it('should return the start board at turn 0', () => {
    expect(startParty.getCurrentBoard()).toStrictEqual(
      new Board(CLASSIC_BOARD),
    );
    expect(eatParty.getCurrentBoard()).toStrictEqual(new Board(EAT_BOARD));
  });
});

methodTest(startParty.getCurrentPlayer, () => {
  it('should return current player black at the first turn if {firstPLayer:black} ', () => {
    expect(startBlackParty.getCurrentPlayer()).toBe(BLACK);
  });
  it('should return current player white at the first turn by default ', () => {
    expect(startParty.getCurrentPlayer()).toBe(WHITE);
  });
});

methodTest(startParty.getCurrentPlays, () => {
  it('should return whiteFirstTurnPlays at turn 0 white CLASSIC_BOARD', () => {
    expect(startParty.getCurrentPlays()).toIncludeSameMembers(
      whiteFirstTurnPlays,
    );
  });
  const partyWin = new Party({ A8: pawnWhite, B9: pawnBlack });
  it('should return an empty array if game finish', () => {
    partyWin.playTurn(new TravelPlay(A8, C10));
    expect(partyWin.getCurrentPlays()).toStrictEqual([]);
  });
});

methodTest(startParty.playTurn, () => {
  it('should throw playNotPossible if play is not in getCurrentPlays() ', () => {
    expect(() => {
      startParty.playTurn(new TravelPlay(A1, A1));
    }).toThrowError(ERROR_PLAY_NOT_POSSIBLE);
  });

  const playOne = new TravelPlay(B4, A5);

  const onePlayParty = new Party(CLASSIC_BOARD);

  const onePlayBoardState: BoardState = cloneDeep(CLASSIC_BOARD);
  onePlayBoardState.A5 = onePlayBoardState.B4;
  delete onePlayBoardState.B4;
  const onePlayBoard = new Board(onePlayBoardState);

  it('should return BLACK onePlayBoard blackFirstTurnPlays at black first turn', () => {
    onePlayParty.playTurn(playOne);
    expect(onePlayParty.getCurrentBoard()).toStrictEqual(onePlayBoard);
    expect(onePlayParty.getCurrentPlayer()).toBe(BLACK);
    expect(onePlayParty.getCurrentPlays()).toIncludeSameMembers(
      blackFirstTurnPlays,
    );
  });

  it('should return white after two plays', () => {
    const playTwo = new TravelPlay(A7, B6);
    const twoPlayParty = new Party(CLASSIC_BOARD);
    twoPlayParty.playTurn(playOne);
    twoPlayParty.playTurn(playTwo);
    expect(twoPlayParty.getCurrentPlayer()).toBe(WHITE);
  });

  const twoEatenPlayParty = new Party(TWO_PLAY_BOARD);
  const playTwoEaten = new TravelPlay(A1, C3);
  const eatenPlays = [new EatenPlay(C3, E5, D4), new EatenPlay(C3, A5, B4)];
  it('should return the same color if the player can play again', () => {
    twoEatenPlayParty.playTurn(playTwoEaten);
    expect(twoEatenPlayParty.getCurrentPlayer()).toBe(WHITE);
  });
  it('should only return plays for one piece if it is a second play', () => {
    expect(twoEatenPlayParty.getCurrentPlays()).toIncludeSameMembers(
      eatenPlays,
    );
  });
  const partyWin = new Party({ A8: pawnWhite, B9: pawnBlack });
  it('should throw an error if the game is finish', () => {
    partyWin.playTurn(new TravelPlay(A8, C10));
    expect(() => {
      partyWin.playTurn(new TravelPlay(C10, B9));
    }).toThrowError(ERROR_PARTY_FINISH);
  });
});

methodTest(startParty.getWinner, () => {
  const partyWin = new Party({ A8: pawnWhite, B9: pawnBlack });
  it('should return undefined before the play', () => {
    expect(partyWin.getWinner()).toBeUndefined();
  });
  it('should return white after the play', () => {
    partyWin.playTurn(new TravelPlay(A8, C10));

    expect(partyWin.getWinner()).toBe(WHITE);
  });
});

methodTest(startParty.getIsDraw, () => {
  it('should return true if 3 consecutive identical pieces position', () => {
    const identicalLast3Turns = new Party({
      B1: new Queen(WHITE),
      F10: new Queen(BLACK),
    });
    identicalLast3Turns.playTurn(new TravelPlay(B1, A2));
    identicalLast3Turns.playTurn(new TravelPlay(F10, G9));
    identicalLast3Turns.playTurn(new TravelPlay(A2, B1));
    identicalLast3Turns.playTurn(new TravelPlay(G9, F10));
    identicalLast3Turns.playTurn(new TravelPlay(B1, A2));
    identicalLast3Turns.playTurn(new TravelPlay(F10, G9));
    identicalLast3Turns.playTurn(new TravelPlay(A2, B1));
    identicalLast3Turns.playTurn(new TravelPlay(G9, F10));

    expect(identicalLast3Turns.getIsDraw()).toBeTrue();
  });
  it('should return false not 3 consecutive identical pieces position', () => {
    const identicalLast3Turns = new Party({
      B1: new Queen(WHITE),
      F10: new Queen(BLACK),
    });
    identicalLast3Turns.playTurn(new TravelPlay(B1, A2));
    identicalLast3Turns.playTurn(new TravelPlay(F10, G9));
    identicalLast3Turns.playTurn(new TravelPlay(A2, B1));
    identicalLast3Turns.playTurn(new TravelPlay(G9, F10));
    identicalLast3Turns.playTurn(new TravelPlay(B1, A2));
    identicalLast3Turns.playTurn(new TravelPlay(F10, G9));
    identicalLast3Turns.playTurn(new TravelPlay(A2, B1));
    identicalLast3Turns.playTurn(new TravelPlay(G9, F8));

    expect(identicalLast3Turns.getIsDraw()).toBeFalse();
  });
});
