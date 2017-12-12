import React from 'react';

var Card = require('../scripts/card.js');
var Deck = require('../scripts/deck.js');
var Hand = require('../scripts/hand.js');

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      player: [],
      dealer: [],
      wins: 0,
      losses: 0
    }
    
  }

  componentDidMount() {
    var deck = new Deck();
    var player = new Hand();
    var dealer = new Hand();

    deck.newDeck();
    player.getCard(deck.deal());
    player.getCard(deck.deal());
    dealer.getCard(deck.deal());
    dealer.getCard(deck.deal());

    this.setState({
      deck: deck,
      player: player,
      dealer: dealer
    })

  }

  render() {
    debugger
    return(
      <div>
        inside of game
      </div>
    )
  }
}

export default Game;
