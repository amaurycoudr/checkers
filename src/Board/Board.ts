import { cloneDeep, isEqual, map } from 'lodash';
import EatenPlay from '../EatenPlay/EatenPlay';
import EmptyBox from '../EmptyBox/EmptyBox';
import { Utils } from '../genericInterface';
import Piece from '../Piece/Piece';
import PieceSituation, {
  PieceSituationType,
} from '../PieceSituation/PieceSituation';
import Coordinates from '../Position/Coordinate/Coordinate';
import Queen from '../Queen/Queen';
import TravelPlay from '../TravelPlay/TravelPlay';
import { INDEX_MAX, INDEX_MIN } from '../utils/board';
import { ERROR_NOT_PIECE } from '../utils/error';
import {
  BoardArray,
  BoardJSON,
  Color,
  CoordinatesStr,
  LineArray,
  PieceJSON,
  PieceMoves,
} from '../utils/type';
import { BoardState } from './BoardState';

export type PlayerPieces = { [key in CoordinatesStr]?: Piece };

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

class Board implements Utils {
  private board: BoardState;

  constructor(initBoard: BoardState) {
    this.board = cloneDeep(initBoard);
  }

  getBox(position: Coordinates) {
    return this.board[position.getY()][position.getX()];
  }

  setBox(position: Coordinates, newValue: EmptyBox) {
    this.board[position.getY()][position.getX()] = newValue;
  }

  getJSON(): BoardJSON {
    const JSON: BoardJSON = {};
    Board.forBoardState((position: Coordinates) => {
      const coordinate = position.get();
      const json = this.getPositionJson(position);
      if (json) {
        JSON[coordinate] = json;
      }
    });
    return JSON;
  }

  getArray(): BoardArray {
    const array = emptyArray();

    Board.forBoardState((position: Coordinates) => {
      const json = this.getPositionJson(position);
      if (json) {
        array[position.getY()][position.getX()] = json;
      }
    });

    return array;
  }

  private static forBoardState(fn: (p: Coordinates) => void) {
    for (let y = INDEX_MIN; y <= INDEX_MAX; y += 1) {
      for (let x = INDEX_MIN; x <= INDEX_MAX; x += 1) {
        fn(new Coordinates(x, y));
      }
    }
  }

  private getPositionJson(position: Coordinates): PieceJSON | undefined {
    try {
      return this.getPiece(position).getJSON();
    } catch (error) {
      return undefined;
    }
  }

  private getPiece(position: Coordinates): Piece {
    const box = this.getBox(position);
    if (box instanceof Piece) {
      return box;
    }
    throw new Error(ERROR_NOT_PIECE);
  }

  getAroundSituation(position: Coordinates, moves: PieceMoves): PieceSituation {
    const situation = moves.reduce((prev, curr): PieceSituationType => {
      try {
        const arrivalPosition = position.getArrivalCoordinate(curr);
        const box = this.getBox(arrivalPosition);
        return { ...prev, [curr]: box };
      } catch (e) {
        return prev;
      }
    }, {});
    return new PieceSituation(situation);
  }

  getPlayerPieces(color: Color): PlayerPieces {
    const result: PlayerPieces = {};
    Board.forBoardState((position) => {
      const piece = this.getBox(position);
      if (piece instanceof Piece && !piece.isOpponent(color)) {
        result[position.get()] = piece;
      }
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
      if (piece) {
        eatenPlays.push(
          ...this.getPieceEatenPlays(
            piece,
            Coordinates.create(coordinate as CoordinatesStr),
          ),
        );
      }
    });
    return eatenPlays;
  }

  private getPlayerTravelPlays(color: Color) {
    const pieces = this.getPlayerPieces(color);
    const travelPlays: TravelPlay[] = [];
    map(pieces, (piece, coordinate) => {
      if (piece) {
        travelPlays.push(
          ...this.getPieceTravelPlays(
            piece,
            Coordinates.create(coordinate as CoordinatesStr),
          ),
        );
      }
    });
    return travelPlays;
  }

  getPieceEatenPlays(piece: Piece, position: Coordinates) {
    return piece.getEatenPlays(
      this.getAroundSituation(position, piece.eatenMoves),
      position,
    );
  }

  getPieceSecondEatenPlays(piece: Piece, position: Coordinates) {
    return piece.getEatenPlays(
      this.getAroundSituation(position, piece.secondEatenMoves),
      position,
    );
  }

  getPieceTravelPlays(piece: Piece, position: Coordinates) {
    return piece.getTravelPlays(
      this.getAroundSituation(position, piece.travelMoves),
      position,
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
