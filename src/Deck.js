import React from 'react';

// Component Deck
const Deck = (props) => {
  // const deck_id = props.deck_id
  const code = props.card.code
  const image = props.card.image

  let cardImage
  if (image) {
    cardImage = <div>
      <img className='hand' src={image} alt={code} />
    </div>
  } else {
    cardImage = <div>
      <img className='hand' src='./card_back.jpg' alt={code} />
    </div>
  }

  return (
    <div>
      <button onClick={() => props.turnOverCard()}>Reveal New Card</button>
      <div>Community Card</div>
      {cardImage}
    </div>
  )
}

export default Deck
