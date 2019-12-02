import React, { Component } from 'react';

class Hand extends Component {
  render() {
        const { deck_id } = this.props;
        const cards = this.props.cards
        const cardsImages = cards.map(card => {
          return <img className='hand' src={card.image} key={card.code} alt={card.code} height="228" width="162"/>
        })
        return (
          <div>
            <button onClick={() => this.props.getHand({deck_id})}>Get Hand</button>
            <div>{cardsImages}</div>
          </div>
        )
    }
}

export default Hand
