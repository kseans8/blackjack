function Card(suit, rank){
  var holder = '';
  if ( rank === "J" || rank === "Q" || rank === "K" ) {
    holder = 10;
  } else {
    holder = rank;
  }

  this.suit = suit;
  this.rank = rank;
  this.value = holder;
}

module.exports = Card;
