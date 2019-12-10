import React, { Component } from 'react';

class Hand extends Component {
  render() {
        const { deck_id } = this.props;
        const cards = this.props.cards
        let cardsImages
        if (cards.length > 0) {
          cardsImages = cards.map(card => {
            return <img className='hand' src={card.image} key={card.code} alt={card.code}/>
          })
        } else {
          cardsImages = <div><img className='hand' src='card_back.jpg' alt='1'/ >
          <img className='hand' src='./card_back.jpg' alt='2'/ >
          <img className='hand' src='./card_back.jpg' alt='3'/ >
          <img className='hand' src='../card_back.jpg' alt='4'/ ></div>
        }
        return (
          <div>
            <button className='freddy' onClick={() => this.props.getHand({deck_id})}>Get Hand</button>
            <div>{cardsImages}</div>
          </div>
        )
    }
}

export default Hand
