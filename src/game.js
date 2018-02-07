import React from 'react';
import CardComponent from './components/cardComponent'

var Card = require('../scripts/card.js');
var Deck = require('../scripts/deck.js');
var Hand = require('../scripts/hand.js');

class Game extends React.Component {
  constructor() {
    super();
    let deck = new Deck();
    let player = new Hand();
    let dealer = new Hand();

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
    }
    this.hitMe = this.hitMe.bind(this)
    this.callStand = this.callStand.bind(this)
    this.dealNewGame = this.dealNewGame.bind(this)
    this.determineWinner = this.determineWinner.bind(this)
  }

  hitMe() {
    let card = this.state.deck.deal()
    this.state.player.getCard(card)
    let newScore = this.state.player.calculateScore()
    this.setState({
      score: newScore
    })
    if (newScore > 20) {
      this.callStand()
    }
  }

  callStand() {
    let deck = this.state.deck;
    let player = this.state.player;
    let dealer = this.state.dealer;
    while (dealer.calculateScore() < 17) {
      dealer.getCard(deck.deal())
    }
    this.setState({
      deck: deck,
      dealer: dealer,
      playing: false
    })
    this.determineWinner()
  }

  determineWinner() {
    let player = this.state.player
    let dealer = this.state.dealer

    if (player.calculateScore() > 21 || dealer.calculateScore() === 21){
      player.losses += 1;
    } else if (dealer.calculateScore() > 21 || player.calculateScore() === 21 || player.calculateScore() > dealer.calculateScore()){
      player.wins += 1;
    } else if (dealer.calculateScore() > player.calculateScore()){
      player.losses += 1;
    } else if (dealer.calculateScore() === player.calculateScore()){
      player.ties += 1;
    } else {
      console.log("oh boy, something bad happened")
    }
    this.setState({
      player: player
    })
  }

  dealNewGame() {
    let deck = new Deck();
    let player = this.state.player;
    let dealer = this.state.dealer;

    player.fold();
    dealer.fold();

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
        return(
          <CardComponent
            key={index}
            card={card}
            show={false}
          />
        )
      } else {
        return(
          <CardComponent
            key={index}
            card={card}
            show={true}
          />
        )

      }
    })
    let dealerScore = <p>Dealers Score: {this.state.dealer.cards[0].value}</p>
    if (!this.state.playing) {
      dealerScore = (
        <p>Dealers Score: {this.state.dealer.calculateScore()}</p>
      )
    }
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
            <p>Your Money: ${this.state.player.wallet}</p>
            <p>Score: {this.state.player.calculateScore()}</p>
            {dealerScore}
            <p>Wins: {this.state.player.wins}</p>
            <p>Losses: {this.state.player.losses}</p>
            <p>Ties: {this.state.player.ties}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;
