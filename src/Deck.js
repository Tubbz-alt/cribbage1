import React, { Component } from 'react';

class Deck extends Component {
  render() {
    const { deck_id } = this.props
    const code = this.props.card.code
    const image = this.props.card.image

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
        <button onClick={() => this.props.turnOverCard({ deck_id })}>Turn Over</button>
        <div>Community Card</div>
        {cardImage}
      </div>
    )
  }
}

export default Deck
