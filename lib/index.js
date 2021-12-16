'use strict';

var INDEX_MIN = 0;
var INDEX_MAX = 8;

var ERROR_COORDINATE_OUT = "errorCoordinateOut";

var TOP = "top";
var coordinatesY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var coordinatesX = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
];

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
    Position.prototype.getX = function () {
        return this.x;
    };
    Position.prototype.getY = function () {
        return this.y;
    };
    Position.getPositionFromCoordinate = function (coordinates) {
        var yCoordinate = parseInt(coordinates[1], 10);
        var y = coordinatesY.indexOf(yCoordinate);
        var xCoordinate = coordinates[0];
        var x = coordinatesX.indexOf(xCoordinate);
        return new Position(x, y);
    };
    Position.prototype.getCoordinate = function () {
        var x = coordinatesX[this.x];
        var y = coordinatesY[this.y];
        if (!x || !y) {
            throw new Error(ERROR_COORDINATE_OUT);
        }
        return "".concat(x).concat(y);
    };
    Position.getPositionFromMove = function (moveDescription) {
        var x = this.getXorYFromMoveCoordinate(moveDescription.slice(0, 2));
        var y = this.getXorYFromMoveCoordinate(moveDescription.slice(3, 5));
        return new Position(x, y);
    };
    Position.getXorYFromMoveCoordinate = function (moveCoordinate) {
        var value = parseInt(moveCoordinate[1], 10);
        return moveCoordinate[0] === "+" ? value : -value;
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

var Player = /** @class */ (function () {
    function Player(color, position, name) {
        this.name = name;
        this.position = position;
        this.color = color;
    }
    Player.prototype.toStr = function () {
        return "".concat(this.name, " the ").concat(this.color, " player");
    };
    Player.prototype.equals = function (player) {
        return this.color === player.color;
    };
    Player.prototype.isTop = function () {
        return this.position === TOP;
    };
    Player.prototype.getColor = function () {
        return this.color;
    };
    return Player;
}());

var Box = /** @class */ (function () {
    function Box() {
    }
    Box.prototype.isNotEmpty = function () {
        return false;
    };
    return Box;
}());

var index = { Position: Position, Player: Player, Box: Box };

module.exports = index;
//# sourceMappingURL=index.js.map
