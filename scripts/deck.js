var Card = require('./card.js');
function Deck() {
  SUITS = [ 'Diamons', 'Clubs', 'Spades', 'Hearts' ];
  RANKS = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack','Queen', 'King', 'Ace' ];

  var cards = [];

  var newCards = function () {
    SUITS.forEach(function(suit) {
      RANKS.forEach(function (rank) {
        cards.push(new Card(suit, rank));
      });
    });
  };

  var shuffleDeck = function () {
    cards.sort( function (a, b) {
      return 0.5 - Math.random();
    });
  };

  this.deal = function () {
    var card = this.allCards.pop();
    return card;
  };

  this.newDeck = function () {
    newCards();
    shuffleDeck();
  };

  this.allCards = cards;
}

module.exports = Deck;
