import React, { Component } from 'react';

class Hand extends Component {
  render() {
        const { deck_id } = this.props;
        const { getHand } = this.props
        console.log('Monday1a',this.props)
        const code = this.props.card.code
        const image = this.props.card.image
        console.log('Monday1b', code)
        console.log('Monday1c', image)

        return (
          <div>
            <button onClick={() => this.props.getHand({deck_id})}>Get Hand</button>
            <p>This will become the card hands: {deck_id}</p>
            <p>This the first card: {code}</p>
            <img src={image} height="228" width="162"/ >
            <img src={image} height="228" width="162"/ >
            <img src={image} height="228" width="162"/ >
            <img src={image} height="228" width="162"/ >
          </div>
        )
    }
}

export default Hand
