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

    this.state = {
      deck: deck,
      player: player,
      dealer: dealer,
      stage: 'pregame',
      wager: '',
      properWager: false
    }
    this.startNewGame = this.startNewGame.bind(this)
    this.dealNewGame = this.dealNewGame.bind(this)
    this.hitMe = this.hitMe.bind(this)
    this.callStand = this.callStand.bind(this)
    this.determineWinner = this.determineWinner.bind(this)
    this.gambleChange = this.gambleChange.bind(this)
  }

  startNewGame(){
    this.setState({
      stage: 'wagering',
      wager: '',
      properWager: false
    })
  }

  gambleChange(e){
    if (!isNaN(e.target.value) && e.target.value <= this.state.player.wallet) {
      this.setState({
        wager: e.target.value
      })
    } else {
      e.target.value = this.state.wager
    }
    if (0 < e.target.value && e.target.value <= this.state.player.wallet) {
      this.setState({
        properWager: true
      })
    } else {
      this.setState({
        properWager: false
      })
    }
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
      stage: 'playing',
    })
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
    let dealer = this.state.dealer;
    while (dealer.calculateScore() < 17) {
      dealer.getCard(deck.deal())
    }
    this.setState({
      deck: deck,
      dealer: dealer
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
      player: player,
      stage: 'postgame',
    })
  }

  render() {
    let playersCards = this.state.player.cards.map((card, index) => {
      if (this.state.stage === 'playing' || this.state.stage === 'postgame') {
        return(
          <CardComponent
            key={index}
            card={card}
            show={true}
            />
        )
      }
    })
    let dealersCards = this.state.dealer.cards.map((card, index) => {
      if (this.state.stage === 'playing' || this.state.stage === 'postgame') {
        if (this.state.stage == 'playing' && index > 0) {
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
      }
    })
    let dealerScore = <p></p>
    if (this.state.stage === 'playing') {
      dealerScore = <p>Dealers Score: {this.state.dealer.cards[0].value}</p>
    } else if (this.state.stage === 'postgame') {
      dealerScore = <p>Dealers Score: {this.state.dealer.calculateScore()}</p>
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
            { this.state.stage === 'wagering' ?
              <div>
                <input
                  type="text"
                  value={this.state.wager}
                  onChange={this.gambleChange}
                  />
                <button onClick={this.dealNewGame} disabled={!this.state.properWager}>gamble</button>
              </div>
              : null
            }
            { this.state.stage === 'playing'  ? <button onClick={this.hitMe}>Hit Me</button> : null }
            { this.state.stage === 'playing' ? <button onClick={this.callStand}>Stand</button> : null }
            { this.state.stage === 'postgame' || this.state.stage === 'pregame' ? <button onClick={this.startNewGame}>Start New Game</button> : null }
          </div>
          <div className="record">
            { this.state.stage === 'playing' || this.state.stage === 'postgame' ? <p>Score: {this.state.player.calculateScore()}</p> : null}
            { this.state.stage === 'playing' || this.state.stage === 'postgame' ? <div>{dealerScore}</div> : null }
            <p>Your Money: ${this.state.player.wallet}</p>
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
