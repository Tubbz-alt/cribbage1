import React, { Component } from 'react';

class Hand extends Component {
  render() {
        const { deck_id } = this.props;
        const { getHand } = this.props
        console.log('GETHAND Main1 props',this.props)
        const cards = this.props.cards
        console.log('GETHAND cards: ', cards)
        // console.log('GETHAND Main2 props',this.props)
        // const code = this.props.card.code
          //const image = this.props.card.image
        // console.log('GET HAND', code)
        // console.log('GET HAND', image)

        // console.log('APP checking stae.cards1 ', cards = this.state.hands
        // <img src={image} height="228" width="162"/ >
        // <img src={image} height="228" width="162"/ >
        // <img src={image} height="228" width="162"/ >
        const cardsImages = cards.map(card => {
          return <img className='hand' src={card.image} key={card.code} height="228" width="162"/>
        })
        console.log('22222222222222222222222 ', cardsImages)
        return (
          <div>
            <button onClick={() => this.props.getHand({deck_id})}>Get Hand</button>
            <div>{cardsImages}</div>
          </div>
        )
    }
}

export default Hand
