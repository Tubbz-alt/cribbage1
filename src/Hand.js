import React from 'react';

// Component Hand
const Hand = (props) => {
  const { deck_id } = props
  const cards = props.cards
  const cardsLeft = props.cardsLeft

  let cardsImages
  if (cards.length > 0) {
    cardsImages = cards.map(card => {
      return <img className='hand' src={card.image} key={card.code} alt={card.code} />
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
      <button onClick={() => props.getHand({ deck_id })}>Get Hand</button>
      <div>Cards remaining in deck: {cardsLeft}</div>
      <div>{cardsImages}</div>
    </div>
  )
}

export default Hand
