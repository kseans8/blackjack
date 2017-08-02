var Card = require('./card.js');
var Deck = function () {
  SUITS = [ 'Diamons', 'Clubs', 'Spades', 'Hearts' ];
  RANKS = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J','Q', 'K', 'A' ];

  var cards = [];

  var newCards = function () {
    SUITS.forEach(function(suit) {
      RANKS.forEach(function (rank) {
        console.log("Making new card: " + suit + " " + rank);
        cards.push(new Card(suit, rank));
      });
    });
  };

  var shuffleDeck = function () {
    cards.sort( function (a, b) {
      return 0.5 - Math.random();
    });
  };

  this.newHand = function () {
    newCards();
    shuffleDeck();
  };

  newHand();
};

Deck();
