import React from 'react';
import CardComponent from './components/cardComponent';

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
      properWager: false,
      lives: 0,
    }
    this.startNewGame = this.startNewGame.bind(this);
    this.dealNewGame = this.dealNewGame.bind(this);
    this.hitMe = this.hitMe.bind(this);
    this.callStand = this.callStand.bind(this);
    this.determineWinner = this.determineWinner.bind(this);
    this.gambleChange = this.gambleChange.bind(this);
    this.sellSoul = this.sellSoul.bind(this);
    this.buyBackSoul = this.buyBackSoul.bind(this);
    this.doubleDown = this.doubleDown.bind(this);
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
        wager: Number(e.target.value)
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
    if (e.which === 13 || e.keyCode === 13) {
      this.dealNewGame();
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
    if (this.state.player.calculateScore() === 21) {
      this.callStand();
    }
  }

  hitMe() {
    let deck = this.state.deck;
    let card = deck.deal();
    let player = this.state.player;

    player.getCard(card);

    this.setState({
      deck: deck,
      player: player
    })

    if (player.calculateScore() > 20) {
      this.callStand();
    }
  }

  callStand() {
    let deck = this.state.deck;
    let dealer = this.state.dealer;
    if (this.state.player.calculateScore() < 22) {
      while (dealer.calculateScore() < 17) {
        dealer.getCard(deck.deal());
      }
    }
    this.setState({
      deck: deck,
      dealer: dealer
    })
    this.determineWinner();
  }

  determineWinner() {
    let player = this.state.player;
    let dealer = this.state.dealer;

    if (player.calculateScore() > 21){
      player.losses += 1;
      player.wallet = Math.floor(parseFloat(player.wallet) - parseFloat(this.state.wager));
    } else if (dealer.calculateScore() === player.calculateScore()){
      player.ties += 1;
    } else if (player.calculateScore() === 21) {
      player.wins += 1;
      player.wallet = Math.floor(parseFloat(player.wallet) + (parseFloat(this.state.wager) * (3/2))); // Winnah!!!
    } else if (dealer.calculateScore() > 21 || player.calculateScore() > dealer.calculateScore()){
      player.wins += 1;
      player.wallet = Math.floor(parseFloat(player.wallet) + parseFloat(this.state.wager));
    } else if (dealer.calculateScore() > player.calculateScore()){
      player.losses += 1;
      player.wallet = Math.floor(parseFloat(player.wallet) - parseFloat(this.state.wager));
    } else {
      console.log("oh boy, something bad happened")
    }
    this.setState({
      player: player,
      stage: 'postgame',
    })
  }

  sellSoul() {
    let player = this.state.player;
    let lives = this.state.lives + 1;
    player.wallet = 200;
    this.setState({
      player: player,
      lives: lives
    })
  }

  buyBackSoul() {
    let player = this.state.player;
    let lives = this.state.lives - 1;
    player.wallet = parseFloat(player.wallet) - parseFloat(1000000000);
    this.setState({
      player: player,
      lives: lives
    })
  }

  doubleDown() {
    let deck = this.state.deck;
    let card = deck.deal();
    let player = this.state.player;
    let wager = this.state.wager * 2;

    player.getCard(card);
    this.setState({
      player: player,
      wager: wager,
      deck: deck
    }, () => {
      this.callStand();
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

    let wageringElement = <div></div>
    if (this.state.stage === 'wagering') {
       if (this.state.player.wallet < 1) {
         wageringElement = <button onClick={this.sellSoul}>Sell your soul to the devil for $200</button>
      } else {
        wageringElement = <div>
          <input
            autoFocus
            type="text"
            value={this.state.wager}
            onChange={this.gambleChange}
            onKeyPress={this.gambleChange}
            />
          <button onClick={this.dealNewGame} disabled={!this.state.properWager}>gamble</button>
        </div>
      }
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
            {wageringElement}
            { this.state.stage === 'playing'  ? <button onClick={this.hitMe}>Hit Me</button> : null }
            { this.state.stage === 'playing' ? <button onClick={this.callStand}>Stand</button> : null }
            { this.state.stage === 'playing' && this.state.player.cards.length === 2 && (this.state.wager * 2) < this.state.player.wallet ? <button onClick={this.doubleDown}>Double Down</button> : null }
            { this.state.stage === 'postgame' || this.state.stage === 'pregame' ? <button onClick={this.startNewGame}>Start New Game</button> : null }
          </div>
          <div className="record">
            { this.state.stage === 'playing' || this.state.stage === 'postgame' ? <p>Score: {this.state.player.calculateScore()}</p> : null}
            { this.state.stage === 'playing' || this.state.stage === 'postgame' ? <div>{dealerScore}</div> : null }
            <p>Your Money: ${this.state.player.wallet}</p>
            <p>Wins: {this.state.player.wins}</p>
            <p>Losses: {this.state.player.losses}</p>
            <p>Ties: {this.state.player.ties}</p>
            { this.state.lives > 0 ? <p>Lives owed to the devil (worth $1,000,000,000) = {this.state.lives}</p> : null }
            { this.state.lives > 0 && this.state.player.wallet > 1000000000 ? <button onClick={this.buyBackSoul}>Buy back one soul</button> : null }
          </div>
        </div>
      </div>
    )
  }
}

export default Game;
