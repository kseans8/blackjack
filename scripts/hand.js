function Hand() {
  this.getCard = function (newCard) {
    this.cards.push(newCard);
  };

  this.calculateScore = function () {
    var counter = 0;
    var score = 0;

    this.cards.forEach(function (card) {
      if (card.rank === 'A') {
        counter += 1;
      } else {
        score += card.value;
      }
    });

    while (counter !== 0) {
      score += aceCalculation();
      counter -= 1;
    }

    function aceCalculation() {
      if (score < 11) {
        return 11;
      } else {
        return 1;
      }
    }
    return score;
  };

  this.fold = function() {
    this.cards = [];
  }

  this.split = function() {
    if (this.cards.length === 2) {
      return this.cards.splice(1,1)[0]
    }
  }

  this.wallet = 200;
  this.wins = 0;
  this.losses = 0;
  this.ties = 0;
  this.cards = [];
}

module.exports = Hand;
