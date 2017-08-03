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
    this.handScore = score;
    return score;
  };

  this.cards = [];
  this.handScore = 0;
}

module.exports = Hand;
