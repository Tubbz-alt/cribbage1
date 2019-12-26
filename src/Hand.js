import React from 'react';
import PropTypes from 'prop-types'

// Component Hand
const Hand = (props) => {
  // const deck_id = props.deck_id
  const cards = props.cards
  const buttonText = props.buttonText
  const cardsLeft = props.cardsLeft

  let cardsImages
  if (cards.length > 0) {
    cardsImages = cards.map(card => {
      return <img className='hand' src={card.image} key={card.code} id={card.code} alt={card.code} />
    })
  } else {
    cardsImages =
      <div>
        <img className='hand' src='./card_back.jpg' alt='1' />
        <img className='hand' src='./card_back.jpg' alt='2' />
        <img className='hand' src='./card_back.jpg' alt='3' />
        <img className='hand' src='./card_back.jpg' alt='4' />
      </div>

  }
  return (
    <div>
      <button onClick={() => props.getHand()}>{buttonText}</button>
      <div>Cards remaining in deck: {cardsLeft}</div>
      <div>{cardsImages}</div>
    </div>
  )
}

Hand.proptypes = {
  cards: PropTypes.array.isReqired,
  buttonText: PropTypes.string.isReqired,
  cardsLeft: PropTypes.number.isReqired
}

export default Hand
