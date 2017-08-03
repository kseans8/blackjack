var Card = require('./card.js');
var Deck = require('./deck.js');
var Hand = require('./hand.js');

var counter = 0;
var deck = new Deck();
var player = new Hand();
var dealer = new Hand();

deck.newDeck();

while (counter < 2) {
  var card = deck.deal();
  player.getCard(card);
  card = deck.deal();
  dealer.getCard(card);
  counter += 1;
}
console.log("players hand is: ");
player.cards.forEach(function(card) {
  console.log('the ' + card.rank + ' of ' + card.suit);
});
console.log("players score is: " + player.calculateScore());

console.log("dealers hand is: ");
dealer.cards.forEach(function(card) {
  console.log('the ' + card.rank + ' of ' + card.suit);
});
console.log("dealers score is: " + dealer.calculateScore());
