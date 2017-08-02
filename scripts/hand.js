function Hand() {
  var cards = [];
  var handScore = 0;

  this.getCard = function (newCard) {
    cards.push(newCard);
  };

  this.calculateScore = function () {
    cards.forEach(function (card) {
      var score = 0,
          counter = 0;

      if (card.rank === 'A') {
        counter += 1;
      } else {
        handScore += card.value;
      }

      while (counter !== 0) {
        sum += aceCalculation(card);
        counter -= 1;
      }

    });

    var aceCalculation = function (ace) {
      if (handScore < 11) {
        return 11;
      } else {
        return 1;
      }
    };
  };

}
