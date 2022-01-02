import { cloneDeep, flatten, isEqual, map, mapValues, pickBy } from 'lodash';
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
import { BOARD_SIZE_DEFAULT, EMPTY_BOX_TYPE } from '../utils/board';
import { ERROR_NOT_PIECE, ERROR_OUT_OF_BOUND } from '../utils/error';
import { BoardJSON, Color, CoordinatesStr, PieceMoves } from '../utils/type';
import { BoardContent, BoardState } from './BoardState';

export type PlayerPieces = Partial<{ [key in CoordinatesStr]: Piece }>;

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
    return mapValues(this.board, (piece) => piece?.getJSON());
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

  getPlayerPieces(color: Color) {
    return pickBy(this.board, (value) => !value?.isOpponent(color));
  }

  getPlayerEatenPlays(color: Color) {
    const pieces = this.getPlayerPieces(color);
    return flatten(
      map(pieces, (piece, coordinate) =>
        this.getPieceEatenPlays(
          piece,
          Coordinates.create(coordinate as CoordinatesStr),
        ),
      ),
    );
  }

  getPlayerTravelPlays(color: Color) {
    const pieces = this.getPlayerPieces(color);
    return flatten(
      map(pieces, (piece, coordinate) =>
        this.getPieceTravelPlays(
          piece,
          Coordinates.create(coordinate as CoordinatesStr),
        ),
      ),
    );
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
    if (play.canTransformInQueen(this.size)) {
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
