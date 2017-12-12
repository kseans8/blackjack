var Card = require('./card.js');
function Deck() {
  var suits = [ 'diamons', 'clubs', 'spades', 'hearts' ];
  var ranks = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack','Queen', 'King', 'Ace' ];

  var cards = [];

  var newCards = function () {
    cards.splice(0,cards.length);
    suits.forEach(function(suit) {
      ranks.forEach(function (rank) {
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
