import React from 'react';
import PropTypes from 'prop-types'

// Component Deck
const Deck = (props) => {
  // const deck_id = props.deck_id
  console.log('22222222222222', props)
  const code = props.card.code
  const image = props.card.image

  let cardImage
  if (image) {
    cardImage = <div>
      <img className='hand' src={image} alt={code} id={code} />
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

Deck.proptypes = {
  card: PropTypes.object.isReqired,
}

export default Deck
