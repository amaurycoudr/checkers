import Box from "./Box";
import Pawn from "./Pawn";
import Player from "./Player";
import { BLACK, BOTTOM, LengthType, TOP, WHITE } from "./utils/type";

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
];
const twoPawnLine = (player: Player): LengthType<Box> => [
  new Box(),
  new Pawn(player),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
  new Box(),
];
const centerPawnLine = (player: Player): LengthType<Box> => [
  new Box(),
  new Box(),
  new Box(),
  new Pawn(player),
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
];

export const ONE_PAWN_BOARD: BoardState = [
  onePawnLine(playerWhite),
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
  emptyLine(),
  emptyLine(),
  playerLine(playerBlack, false),
  playerLine(playerBlack, true),
  playerLine(playerBlack, false),
];
