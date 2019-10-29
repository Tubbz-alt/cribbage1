import React, { Component } from 'react';

class CardHand extends Component {
  render() {
        const { deck_id } = this.props;
        const { getCards } = this.props
        console.log('Monday1a',this.props)
        const code = this.props.card.code
        const image = this.props.card.image
        console.log('Monday1b', code)
        console.log('Monday1c', image)
        
        return (
          <div>
            <button onClick={() => this.props.getCards({deck_id})}>Get Cards</button>
            <p>This will become the card hands: {deck_id}</p>
            <p>This the first card: {code}</p>
            <img src={image}/ >
          </div>
        )
    }
}

export default CardHand
