import { cloneDeep, forEach, isEqual } from 'lodash';
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
import { BOARD_SIZE_DEFAULT, EMPTY_BOX_TYPE, INDEX_MIN } from '../utils/board';
import { ERROR_NOT_PIECE, ERROR_OUT_OF_BOUND } from '../utils/error';
import {
  BoardJSON,
  Color,
  CoordinatesStr,
  PieceJSON,
  PieceMoves,
} from '../utils/type';
import { BoardContent, BoardState } from './BoardState';

export type PlayerPieces = { [key in CoordinatesStr]?: Piece };

class Board implements Utils {
  private board: BoardState;

  private size: number;

  constructor(initBoard: BoardState, size?: number) {
    this.board = cloneDeep(initBoard);
    this.size = size ?? BOARD_SIZE_DEFAULT;
  }

  getBox(position: Coordinates) {
    if (position.isInBoard(this.size)) {
      return this.board[position.toStr()] ?? new EmptyBox();
    }
    throw new Error(ERROR_OUT_OF_BOUND);
  }

  setBox(position: Coordinates, newValue: BoardContent) {
    if (newValue instanceof Piece) {
      this.board[position.toStr()] = newValue;
    } else {
      delete this.board[position.toStr()];
    }
  }

  getJSON(): BoardJSON {
    const JSON: BoardJSON = {};
    this.forBoardState((coordinate: Coordinates) => {
      const coordinateStr = coordinate.toStr();
      const json = this.getPositionJson(coordinate);
      if (json) {
        JSON[coordinateStr] = json;
      }
    });
    return JSON;
  }

  private forBoardState(fn: (p: Coordinates) => void) {
    for (let y = INDEX_MIN; y < this.size; y += 1) {
      for (let x = INDEX_MIN; x < this.size; x += 1) {
        fn(new Coordinates(x, y));
      }
    }
  }

  private getPositionJson(coordinate: Coordinates): PieceJSON | undefined {
    try {
      return this.getPiece(coordinate).getJSON();
    } catch (error) {
      return undefined;
    }
  }

  private getPiece(coordinate: Coordinates): Piece {
    const box = this.getBox(coordinate);
    if (box instanceof Piece) {
      return box;
    }
    throw new Error(ERROR_NOT_PIECE);
  }

  getAroundSituation(
    coordinate: Coordinates,
    moves: PieceMoves,
  ): PieceSituation {
    const situation: PieceSituationType = moves.reduce(
      (prev, curr): PieceSituationType => {
        try {
          const arrivalPosition = coordinate.getArrivalCoordinate(curr);
          const box = this.getBox(arrivalPosition);
          if (box instanceof Piece) {
            return { ...prev, [curr]: { type: box.type, color: box.color } };
          }
          return { ...prev, [curr]: { type: EMPTY_BOX_TYPE } };
        } catch (e) {
          return prev;
        }
      },
      {},
    );
    return new PieceSituation(situation);
  }

  getPlayerPieces(color: Color): PlayerPieces {
    const result: PlayerPieces = {};
    this.forBoardState((position) => {
      const piece = this.getBox(position);
      if (piece instanceof Piece && !piece.isOpponent(color)) {
        result[position.get()] = piece;
      }
    });
    return result;
  }

  getPlayerEatenPlays(color: Color) {
    const pieces = this.getPlayerPieces(color);
    const eatenPlays: EatenPlay[] = [];
    forEach(pieces, (piece, coordinate) => {
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

  getPlayerTravelPlays(color: Color) {
    const pieces = this.getPlayerPieces(color);
    const travelPlays: TravelPlay[] = [];
    forEach(pieces, (piece, coordinate) => {
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
