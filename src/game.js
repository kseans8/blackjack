import React from 'react';
import CardComponent from './components/cardComponent'

var Card = require('../scripts/card.js');
var Deck = require('../scripts/deck.js');
var Hand = require('../scripts/hand.js');

class Game extends React.Component {
  constructor() {
    super();
    var deck = new Deck();
    var player = new Hand();
    var dealer = new Hand();

    deck.newDeck();
    player.getCard(deck.deal());
    player.getCard(deck.deal());
    dealer.getCard(deck.deal());
    dealer.getCard(deck.deal());

    this.state = {
      deck: deck,
      player: player,
      dealer: dealer,
      wins: 0,
      losses: 0
    }

  }

  render() {
    let playersCards = this.state.player.cards.map((card, index) => {
      console.log(card)
      return(
        <CardComponent
          key={index}
          card={card}
        />
    )
    })
    let dealersCards = this.state.dealer.cards.map((card, index) => {
      console.log(card)
      return(
        <CardComponent
          key={index}
          card={card}
        />
    )
    })
    return(
      <div>
        {playersCards}
        {dealersCards}
      </div>
    )
  }
}

export default Game;
