import React from 'react';

const CardComponent = (props) => {
  let cardClassName = `black card`
  if (props.card.suit === "♥" || props.card.suit === "♦") {
    cardClassName = `red card`
  }
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
}

export default CardComponent;
