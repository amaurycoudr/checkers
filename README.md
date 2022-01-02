# Checkers Project

\
**test coverage :**
| Statements | Branches | Functions | Lines |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-99.72%25-brightgreen.svg 'Make me better!') | ![Branches](https://img.shields.io/badge/Coverage-98.8%25-brightgreen.svg 'Make me better!') | ![Functions](https://img.shields.io/badge/Coverage-99.1%25-brightgreen.svg 'Make me better!') | ![Lines](https://img.shields.io/badge/Coverage-99.72%25-brightgreen.svg 'Make me better!') |

the purpose of this package is to offer a simple api to be able to play to the checkers

> :warning: **For the moment the work is still in progress**

# CheckersParty

To start a party you only need to create a new instance of **CheckersParty**

```js
const party = new CheckersParty(options);
```

To specify the rules of your party you can pass `options`.

## party options

- **`firstPlayer : "white"|"black"`**
  - The first player to play.
  - `default = "white"`
- **`boardSize : 10 | 8 `**
  - The Board size.
  - `default = 10`
- **`shouldCatchPiecesMaximum : boolean`**
  - decides if player must capture the maximum possible number of pieces
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

## Road map

1. ~~implements a notion of **options** to let user choses specific rules~~
2. ~~implements the first play option~~
3. ~~implements the maximum catch rule~~
4. implements the fact that promote only when ending their move on the final rank
5. implements the win notion
6. implements the draw notion
