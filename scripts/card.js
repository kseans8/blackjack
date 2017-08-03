function Card(suit, rank) {
  var value = '';

  if ( rank === 'J' || rank === 'Q' || rank === 'K' ) {
    value = 10;
  } else {
    value = rank;
  }

  this.suit = suit;
  this.rank = rank;
  this.value = value;
}

module.exports = Card;
