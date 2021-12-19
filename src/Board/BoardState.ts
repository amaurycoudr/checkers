import Box from "../Box/Box";
import Pawn from "../Pawn/Pawn";
import Player from "../Player/Player";
import { BLACK, BOTTOM, LengthType, TOP, WHITE } from "../utils/type";

export type BoardState = LengthType<LengthType<Box>>;
const playerWhite = new Player(WHITE, BOTTOM, "Moutarde");
const playerBlack = new Player(BLACK, TOP, "Le Blanc");
const emptyLine = (): LengthType<Box> => [
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
];
const playerLine = (player: Player, isEven: boolean): LengthType<Box> => [
  isEven ? new Pawn(player) : new Box(),
  isEven ? new Box() : new Pawn(player),
  isEven ? new Pawn(player) : new Box(),
  isEven ? new Box() : new Pawn(player),
  isEven ? new Pawn(player) : new Box(),
  isEven ? new Box() : new Pawn(player),
  isEven ? new Pawn(player) : new Box(),
  isEven ? new Box() : new Pawn(player),
  isEven ? new Pawn(player) : new Box(),
  isEven ? new Box() : new Pawn(player),
];
const onePawnLine = (player: Player): LengthType<Box> => [
  new Pawn(player),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
];

export const EMPTY_BOARD: BoardState = [
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];

export const ONE_WHITE_PAWN_BOARD: BoardState = [
  onePawnLine(playerWhite),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];
export const CLASSIC_BOARD: BoardState = [
  playerLine(playerWhite, true),
  playerLine(playerWhite, false),
  playerLine(playerWhite, true),
  playerLine(playerWhite, false),
  emptyLine(),
  emptyLine(),
  playerLine(playerBlack, true),
  playerLine(playerBlack, false),
  playerLine(playerBlack, true),
  playerLine(playerBlack, false),
];
export const EAT_BOARD: BoardState = [
  playerLine(playerWhite, true),
  playerLine(playerBlack, false),
  emptyLine(),
  playerLine(playerWhite, false),
  playerLine(playerBlack, true),
  playerLine(playerWhite, false),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];

export const a1PawnBoard = (player: Player): BoardState => [
  onePawnLine(player),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
  emptyLine(),
];
export const START_BOARD_JSON = {
  A1: { type: "Pawn", player: "white" },
  C1: { type: "Pawn", player: "white" },
  E1: { type: "Pawn", player: "white" },
  G1: { type: "Pawn", player: "white" },
  I1: { type: "Pawn", player: "white" },
  B2: { type: "Pawn", player: "white" },
  D2: { type: "Pawn", player: "white" },
  F2: { type: "Pawn", player: "white" },
  H2: { type: "Pawn", player: "white" },
  J2: { type: "Pawn", player: "white" },
  A3: { type: "Pawn", player: "white" },
  C3: { type: "Pawn", player: "white" },
  E3: { type: "Pawn", player: "white" },
  G3: { type: "Pawn", player: "white" },
  I3: { type: "Pawn", player: "white" },
  B4: { type: "Pawn", player: "white" },
  D4: { type: "Pawn", player: "white" },
  F4: { type: "Pawn", player: "white" },
  H4: { type: "Pawn", player: "white" },
  J4: { type: "Pawn", player: "white" },
  A7: { type: "Pawn", player: "black" },
  C7: { type: "Pawn", player: "black" },
  E7: { type: "Pawn", player: "black" },
  G7: { type: "Pawn", player: "black" },
  I7: { type: "Pawn", player: "black" },
  B8: { type: "Pawn", player: "black" },
  D8: { type: "Pawn", player: "black" },
  F8: { type: "Pawn", player: "black" },
  H8: { type: "Pawn", player: "black" },
  J8: { type: "Pawn", player: "black" },
  A9: { type: "Pawn", player: "black" },
  C9: { type: "Pawn", player: "black" },
  E9: { type: "Pawn", player: "black" },
  G9: { type: "Pawn", player: "black" },
  I9: { type: "Pawn", player: "black" },
  B10: { type: "Pawn", player: "black" },
  D10: { type: "Pawn", player: "black" },
  F10: { type: "Pawn", player: "black" },
  H10: { type: "Pawn", player: "black" },
  J10: { type: "Pawn", player: "black" },
};
