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
    dealer.getCard(deck.deal());
    player.getCard(deck.deal());
    dealer.getCard(deck.deal());

    this.state = {
      deck: deck,
      player: player,
      dealer: dealer,
      playing: true,
      score: player.calculateScore(),
      wins: 0,
      losses: 0
    }
    this.hitMe = this.hitMe.bind(this)
    this.callStand = this.callStand.bind(this)
    this.dealNewGame = this.dealNewGame.bind(this)
  }

  hitMe() {
    let card = this.state.deck.deal()
    this.state.player.getCard(card)
    let newScore = this.state.player.calculateScore()
    this.setState({
      score: newScore
    })
    if (newScore > 20) {
      console.log("over 20")
      this.setState({
        playing: false
      })
    }
    console.log(card)
  }

  callStand() {
    this.setState({
      playing: false
    })
  }

  dealNewGame() {
    var deck = new Deck();
    var player = new Hand();
    var dealer = new Hand();

    deck.newDeck();
    player.getCard(deck.deal());
    dealer.getCard(deck.deal());
    player.getCard(deck.deal());
    dealer.getCard(deck.deal());

    this.setState({
      deck: deck,
      player: player,
      dealer: dealer,
      playing: true,
      score: player.calculateScore(),
    })
  }

  render() {
    let playersCards = this.state.player.cards.map((card, index) => {
      console.log(card)
      return(
        <CardComponent
          key={index}
          card={card}
          show={true}
        />
    )
    })
    let dealersCards = this.state.dealer.cards.map((card, index) => {
      if (this.state.playing && index > 0) {
        console.log(card)
        return(
          <CardComponent
            key={index}
            card={card}
            show={false}
          />
        )
      } else {
        console.log(card)
        return(
          <CardComponent
            key={index}
            card={card}
            show={true}
          />
        )

      }
    })
    return(
      <div>
        <div className="table">
          <div className="dealers-hand">
            {dealersCards}
          </div>
          <div className="players-hand">
            {playersCards}
          </div>
        </div>
        <div className="game-details">
          <div className="actionButtons">
            { this.state.playing ? <button onClick={this.hitMe}>Hit Me</button> : null }
            { this.state.playing ? <button onClick={this.callStand}>Stand</button> : null }
            { this.state.playing ? null : <button onClick={this.dealNewGame}>Deal</button> }
          </div>
          <div className="record">
            <p>Score: {this.state.score}</p>
            <p>Wins: {this.state.wins}</p>
            <p>Losses: {this.state.losses}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;
