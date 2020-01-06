import React from 'react';
import PropTypes from 'prop-types'

// Component Hand
const Hand = (props) => {
  const cards = props.cards
  const buttonText = props.buttonText
  const cardsLeft = props.cardsLeft

  let cardsImages = []
  console.log('pppp1 ', cards.length)

  for (let i = 0; i < cards.length; i++) {
    console.log('ppppppp2')
  }
  if (cards.length > 0) {
    cardsImages = cards.map((card, index) => {
      if (index !== 4) {
        return <img className='card' src={card.image} key={card.code} id={card.code} alt={card.code} />
      } else {
        return <img className='c-card' src={card.image} key={card.code} id={card.code} alt={card.code} />
      }
    })
  } else {
    cardsImages =
      <div className='cribbage-section'>
        <img className='card' src='./card_back.jpg' alt='1' />
        <img className='card' src='./card_back.jpg' alt='2' />
        <img className='card' src='./card_back.jpg' alt='3' />
        <img className='card' src='./card_back.jpg' alt='4' />
        <img className='c-card' src='./card_back.jpg' alt='5' />
      </div>

  }
  return (
    <div className='cribbage-parent'>
      <header className='cribbage-header'>
        <button className='cribbage-button' onClick={() => props.getHand()}>{buttonText}</button>
        <button className='cribbage-button' onClick={() => props.setShowCustomHand(true)}>Custom Hand</button>
      </header>
      <div>Cards remaining in deck: {cardsLeft}</div>
      <section>
        <div>{cardsImages}</div>
      </section>
    </div>
  )
}

Hand.proptypes = {
  cards: PropTypes.array.isReqired,
  buttonText: PropTypes.string.isReqired,
  cardsLeft: PropTypes.number.isReqired
}

export default Hand
