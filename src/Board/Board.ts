import { cloneDeep, isEqual, map } from "lodash";
import { BoardState } from "./BoardState";
import EatenPlay from "../EatenPlay/EatenPlay";
import Piece from "../Piece/Piece";
import Player from "../Player/Player";
import Position from "../Position/Position";
import TravelPlay from "../TravelPlay/TravelPlay";
import { INDEX_MAX, INDEX_MIN } from "../utils/board";
import { ERROR_NOT_PIECE, ERROR_OUT_OF_BOUND } from "../utils/error";
import { forBoard } from "../utils/fn";
import {
  BoardJSON,
  Coordinates,
  PieceJSON,
  PieceMoves,
  PieceSituation,
} from "../utils/type";
import Box from "../Box/Box";
import { Utils } from "../genericInterface";
export type PlayerPieces = { [key in Coordinates]?: Piece };
class Board implements Utils {
  private board: BoardState;

  constructor(initBoard: BoardState) {
    this.board = initBoard;
  }

  getBox(position: Position) {
    if (!position.isInBoard()) {
      throw new Error(ERROR_OUT_OF_BOUND);
    }
    return this.board[position.getY()][position.getX()];
  }

  setBox(position: Position, newValue: Box) {
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
    return moves.reduce((prev, curr): PieceSituation => {
      const arrivalPosition = position.getArrivalPosition(curr);

      const box = arrivalPosition.isInBoard() && this.getBox(arrivalPosition);

      if (box) {
        return { ...prev, [curr]: box };
      }
      return prev;
    }, {});
  }

  getPlayerPieces(player: Player): PlayerPieces {
    const result: PlayerPieces = {};
    forBoard((position) => {
      try {
        const piece = this.getPiece(position);
        if (!piece.isOpponent(player)) {
          result[position.getCoordinate()] = piece;
        }
      } catch {}
    });
    return result;
  }

  getPlayerPlays(player: Player): TravelPlay[] {
    const eatenPlays = this.getPlayerEatenPlays(player);
    if (eatenPlays.length > 0) {
      return eatenPlays;
    }
    const travelMoves: TravelPlay[] = this.getPlayerTravelPlays(player);
    return travelMoves;
  }

  private getPlayerEatenPlays(player: Player) {
    const pieces = this.getPlayerPieces(player);
    const eatenPlays: EatenPlay[] = [];
    map(pieces, (piece, coordinate) => {
      eatenPlays.push(
        ...this.getPieceEatenPlays(
          piece!,
          Position.getPositionFromCoordinate(coordinate as Coordinates)
        )
      );
    });
    return eatenPlays;
  }

  private getPlayerTravelPlays(player: Player) {
    const pieces = this.getPlayerPieces(player);
    const travelPlays: TravelPlay[] = [];
    map(pieces, (piece, coordinate) => {
      travelPlays.push(
        ...this.getPieceTravelPlays(
          piece!,
          Position.getPositionFromCoordinate(coordinate as Coordinates)
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

  getPieceTravelPlays(piece: Piece, position: Position) {
    return piece.getTravelPlays(
      this.getAroundSituation(position, piece.travelMoves),
      position
    );
  }

  getNewBoardFromPlay(play: TravelPlay | EatenPlay) {
    const newBoardState = cloneDeep(this.board);
    const newBoard = new Board(newBoardState);
    newBoard.setBox(play.to, newBoard.getBox(play.from));
    newBoard.setBox(play.from, new Box());
    if (play instanceof EatenPlay) {
      newBoard.setBox(play.eaten, new Box());
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
