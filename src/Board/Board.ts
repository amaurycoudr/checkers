import { cloneDeep, isEqual, map } from "lodash";
import EatenPlay from "../EatenPlay/EatenPlay";
import EmptyBox from "../EmptyBox/EmptyBox";
import { Utils } from "../genericInterface";
import Piece from "../Piece/Piece";
import PieceSituation, {
  PieceSituationType,
} from "../PieceSituation/PieceSituation";
import Position from "../Position/Position";
import Queen from "../Queen/Queen";
import TravelPlay from "../TravelPlay/TravelPlay";
import { INDEX_MAX, INDEX_MIN } from "../utils/board";
import { ERROR_NOT_PIECE, ERROR_OUT_OF_BOUND } from "../utils/error";
import { forBoard } from "../utils/fn";
import {
  BoardArray,
  BoardJSON,
  Color,
  Coordinates,
  LineArray,
  PieceJSON,
  PieceMoves,
} from "../utils/type";
import { BoardState } from "./BoardState";
export type PlayerPieces = { [key in Coordinates]?: Piece };

class Board implements Utils {
  private board: BoardState;

  constructor(initBoard: BoardState) {
    this.board = cloneDeep(initBoard);
  }

  getBox(position: Position) {
    if (!position.isInBoard()) {
      throw new Error(ERROR_OUT_OF_BOUND);
    }
    return this.board[position.getY()][position.getX()];
  }

  setBox(position: Position, newValue: EmptyBox) {
    if (!position.isInBoard()) {
      throw new Error(ERROR_OUT_OF_BOUND);
    }
    this.board[position.getY()][position.getX()] = newValue;
  }

  getJSON(): BoardJSON {
    const JSON: BoardJSON = {};
    Board.forBoardState((position: Position) => {
      const coordinate = position.getCoordinate();
      const json = this.getPositionJson(position);
      if (json) {
        JSON[coordinate] = json;
      }
    });
    return JSON;
  }

  getArray(): BoardArray {
    const array = emptyArray();

    Board.forBoardState((position: Position) => {
      const json = this.getPositionJson(position);
      if (json) {
        array[position.getY()][position.getX()] = json;
      } else {
      }
    });

    return array;
  }

  private static forBoardState(fn: (p: Position) => void) {
    for (let y = INDEX_MIN; y <= INDEX_MAX; y++) {
      for (let x = INDEX_MIN; x <= INDEX_MAX; x++) {
        fn(new Position(x, y));
      }
    }
  }

  private getPositionJson(position: Position): PieceJSON | undefined {
    try {
      return this.getPiece(position).getJSON();
    } catch (error) {
      return undefined;
    }
  }

  private getPiece(position: Position): Piece {
    const box = this.getBox(position);
    if (box instanceof Piece) {
      return box;
    }
    throw new Error(ERROR_NOT_PIECE);
  }

  getAroundSituation(position: Position, moves: PieceMoves): PieceSituation {
    const situation = moves.reduce((prev, curr): PieceSituationType => {
      const arrivalPosition = position.getArrivalPosition(curr);

      const box = arrivalPosition.isInBoard() && this.getBox(arrivalPosition);

      if (box) {
        return { ...prev, [curr]: box };
      }
      return prev;
    }, {});
    return new PieceSituation(situation);
  }

  getPlayerPieces(color: Color): PlayerPieces {
    const result: PlayerPieces = {};
    forBoard((position) => {
      try {
        const piece = this.getPiece(position);
        if (!piece.isOpponent(color)) {
          result[position.getCoordinate()] = piece;
        }
      } catch {}
    });
    return result;
  }

  getPlayerPlays(color: Color): TravelPlay[] {
    const eatenPlays = this.getPlayerEatenPlays(color);
    if (eatenPlays.length > 0) {
      return eatenPlays;
    }
    const travelMoves: TravelPlay[] = this.getPlayerTravelPlays(color);
    return travelMoves;
  }

  private getPlayerEatenPlays(color: Color) {
    const pieces = this.getPlayerPieces(color);
    const eatenPlays: EatenPlay[] = [];
    map(pieces, (piece, coordinate) => {
      eatenPlays.push(
        ...this.getPieceEatenPlays(
          piece!,
          Position.fromCoordinate(coordinate as Coordinates)
        )
      );
    });
    return eatenPlays;
  }

  private getPlayerTravelPlays(color: Color) {
    const pieces = this.getPlayerPieces(color);
    const travelPlays: TravelPlay[] = [];
    map(pieces, (piece, coordinate) => {
      travelPlays.push(
        ...this.getPieceTravelPlays(
          piece!,
          Position.fromCoordinate(coordinate as Coordinates)
        )
      );
    });
    return travelPlays;
  }

  getPieceEatenPlays(piece: Piece, position: Position) {
    return piece.getEatenPlays(
      this.getAroundSituation(position, piece.eatenMoves),
      position
    );
  }

  getPieceSecondEatenPlays(piece: Piece, position: Position) {
    return piece.getEatenPlays(
      this.getAroundSituation(position, piece.secondEatenMoves),
      position
    );
  }

  getPieceTravelPlays(piece: Piece, position: Position) {
    return piece.getTravelPlays(
      this.getAroundSituation(position, piece.travelMoves),
      position
    );
  }

  getNewBoardFromPlay(play: TravelPlay | EatenPlay) {
    const newBoardState = cloneDeep(this.board);
    const newBoard = new Board(newBoardState);
    const piece = newBoard.getPiece(play.from);
    if (play.shouldTransformInQueen()) {
      newBoard.setBox(play.to, new Queen(piece.color));
    } else {
      newBoard.setBox(play.to, piece);
    }

    newBoard.setBox(play.from, new EmptyBox());
    
    if (play instanceof EatenPlay) {
      newBoard.setBox(play.eaten, new EmptyBox());
    }

    return newBoard;
  }

  equals(board: Board) {
    return isEqual(board.getJSON(), this.getJSON());
  }
  toStr(): string {
    return JSON.stringify(this.getJSON());
  }
}
export default Board;
const emptyLine = (): LineArray => [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const emptyArray = (): BoardArray => [
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
