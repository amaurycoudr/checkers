# Checkers Project

\
**test coverage :**
| Statements | Branches | Functions | Lines |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-99.27%25-brightgreen.svg 'Make me better!') | ![Branches](https://img.shields.io/badge/Coverage-97.45%25-brightgreen.svg 'Make me better!') | ![Functions](https://img.shields.io/badge/Coverage-99.26%25-brightgreen.svg 'Make me better!') | ![Lines](https://img.shields.io/badge/Coverage-99.25%25-brightgreen.svg 'Make me better!') |

the purpose of this package is to offer a simple api to be able to play to the checkers

> :warning: **For the moment the work is still in progress**

# CheckersParty

To start a party you only need to create a new instance of **CheckersParty**

```js
const party = new CheckersParty(options);
```

To specify the rules of your party you can pass an object `options`.

## party options

- **`firstPlayer : "white" | "black"`**
  - The first player to play.
  - `default = "white"`
- **`boardSize : 10 | 8 `**
  - The Board size.
  - `default = 10`
- **`shouldCatchPiecesMaximum : boolean`**
  - decides if player must capture the maximum possible number of pieces
  - `default = true`
- **`shouldPromoteWhenMoveEnding: boolean`**
  - decides if pieces promote only when ending their move on the final rank
  - `default = true`

## party.getState()

To access the state of the party you can use the method `getState()`
this returns an object of this format :

```json
{
  "board": {
    "A1": { "type": "Pawn", "player": "white" },
    "C1": { "type": "Pawn", "player": "white" },
    "E1": { "type": "Pawn", "player": "white" },
    "G1": { "type": "Pawn", "player": "white" },
    "I1": { "type": "Pawn", "player": "white" }
  } /* here only the first line is shown */,
  "playerTurn:": "white",
  "plays": [
    { "from": "B4", "to": "A5" },
    { "from": "B4", "to": "C5" },
    { "from": "D4", "to": "C5" },
    { "from": "D4", "to": "E5" },
    { "from": "F4", "to": "E5" },
    { "from": "F4", "to": "G5" },
    { "from": "H4", "to": "G5" },
    { "from": "H4", "to": "I5" },
    { "from": "J4", "to": "I5" }
  ]
}
```

> :information_source: This is the result of `party.getState()` at the first turn

## party.play(move: Movement)

Take in argument the move you want to play like `{ "from": "B4", "to": "A5" }`.
Return the state of the party (the new result for `party.getState()`).

## getCoordinate()

An helper is provide to handle the conversion from (x,y) to te format `"A1", "C3"...`

```js
const coordinate = getCoordinate(3, 2);
// coordinate === D3
```

## Road map to functional version

1. ~~implements a notion of **options** to let user choses specific rules~~
1. ~~implements the first play option~~
1. ~~implements the maximum catch rule~~
1. ~~implements the fact that promote only when ending their move on the final rank~~
1. ~~implements the win notion~~
1. ~~correct bug can eat after travel~~
1. ~~correct bug winner~~
1. ~~correct bug queen transformation~~
1. ~~correct queen movement~~
1. ~~implements the draw notion~~
1. handle case player can't make any play
