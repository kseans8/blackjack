import React from 'react';

const CardComponent = (props) => {
  let cardClassName = `black card`
  if (props.card.suit === "♥" || props.card.suit === "♦") {
    cardClassName = `red card`
  }

  if (props.show === true){
    return(
      <div className={cardClassName}>
        <div className="rank">
          {props.card.rank}
        </div>
        <div className="suit">
          {props.card.suit}
        </div>
      </div>
    )
  } else {
    return(
      <div className="card">
        <img className="card-back" src="http://chetart.com/blog/wp-content/uploads/2012/05/playing-card-back.jpg"/>
      </div>
    )
  }
}

export default CardComponent;
