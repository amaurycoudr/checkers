# Checkers Project

\
**test coverage :**
| Statements | Branches | Functions | Lines |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") |

the purpose of this package is to offer a simple api to be able to play to the checkers

> :warning: **for the moment the work is still in progress**

# CheckersParty

To start a party you only need to create a new instance of **CheckersParty**

```js
const party = new CheckersParty("whitePlayerName", "blackPlayerName");
```

To access the state of the party you can use the method `getBoard()`
this returns an object of this format :

```json
{
  "board": [
    [
      { "player": "white", "type": "Pawn" },
      null,
      { "player": "white", "type": "Pawn" },
      null,
      { "player": "white", "type": "Pawn" },
      null,
      { "player": "white", "type": "Pawn" },
      null,
      { "player": "white", "type": "Pawn" },
      null
    ] /* here only the first line is shown */
  ],
  "playerTurn": "white",
  "players": {
    "white": {
      "name": "whitePlayerName"
    },
    "black": {
      "name": "blackPlayerName"
    }
  },
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

> :information_source: this is the result of `party.getBoard()` at the first turn
