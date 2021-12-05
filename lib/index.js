'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var INDEX_MIN = 0;
var INDEX_MAX = 8;

var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    Position.prototype.isInBoard = function () {
        return this.isCoordinateInBoard(this.x) && this.isCoordinateInBoard(this.y);
    };
    Position.prototype.isCoordinateInBoard = function (n) {
        return n <= INDEX_MAX && n > INDEX_MIN;
    };
    Position.prototype.toStr = function () {
        return "(".concat(this.x, ",").concat(this.y, ")");
    };
    Position.prototype.equals = function (position) {
        return this.x === position.x && this.y === position.y;
    };
    Position.prototype.getArrivalPosition = function (move) {
        return new Position(this.x + move.x, this.y + move.y);
    };
    Position.LEFT_TOP = new Position(-1, -1);
    Position.LEFT_BOTTOM = new Position(-1, 1);
    Position.RIGHT_TOP = new Position(1, -1);
    Position.RIGHT_BOTTOM = new Position(1, 1);
    Position.LEFT_TOP_2 = new Position(-2, -2);
    Position.LEFT_BOTTOM_2 = new Position(-2, 2);
    Position.RIGHT_TOP_2 = new Position(2, -2);
    Position.RIGHT_BOTTOM_2 = new Position(2, 2);
    return Position;
}());

exports.Position = Position;
//# sourceMappingURL=index.js.map
