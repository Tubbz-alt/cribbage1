import React, { Component } from 'react';

class Deck extends Component {
  render() {
        const { deck_id } = this.props;
        const { turnOverCard } = this.props
        console.log('zzzzzzzzCRIB: props',this.props)
        const code = this.props.card.code
        const image = this.props.card.image
        console.log('zzzzzDECK code', code)
        console.log('zzzzzDECK image', image)

        return (
        <div>
          <button onClick={() => this.props.turnOverCard({deck_id})}>Turn over card</button>
          <div>
            <img src={image} heigh='228px' width='162px'/ >
          </div>
        </div>
        )
    }
}

export default Deck
