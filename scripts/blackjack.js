var Card = require('./card.js');
var Deck = require('./deck.js');
var Hand = require('./hand.js');

var counter = 0;
var deck = new Deck();
var player = new Hand();
var dealer = new Hand();

var keepHitting = function(hand) {
  var underSeventeen = houseLogic(hand);

  while(underSeventeen) {
    hand.getCard(deck.deal());
    underSeventeen = houseLogic(hand);
  }
};

var houseLogic = function (hand) {
  if (hand.calculateScore() < 17) {
    return true;
  }
};

var finishGame = function(player, dealer) {
  var playerScore = player.calculateScore();
  var dealerScore = dealer.calculateScore();

  console.log("players hand is: ");
  printResults(player);

  console.log("dealers hand is: ");
  printResults(dealer);

  determineWinner(playerScore, dealerScore);
};

var printResults = function(hand) {
  hand.cards.forEach(function(card) {
    console.log('the ' + card.rank + ' of ' + card.suit);
  });
  console.log('with a score of: ' + hand.calculateScore());
};

var determineWinner = function(player, dealer) {
  if (player > 21) {
    console.log('Bust! loser...');
  } else if (dealer > 21) {
    console.log('Dealer bust! Player wins!');
  } else if (player === dealer) {
    console.log("It's a tie!");
  } else if (player > dealer) {
    console.log('Player wins!');
  } else if (player < dealer) {
    console.log('Dealer wins! loser...');
  } else {
    console.log('well somebody is clearly cheating');
  }
};

deck.newDeck();

while (counter < 2) {
  player.getCard(deck.deal());
  dealer.getCard(deck.deal());
  counter += 1;
}

keepHitting(player);

var playerIsNotBusted = (player.calculateScore() <= 21);

if (playerIsNotBusted) {
  keepHitting(dealer);
}

finishGame(player, dealer);
