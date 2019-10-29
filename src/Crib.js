import React, { Component } from 'react';

class Crib extends Component {
  render() {
        const { deck_id } = this.props;
        const { getCib } = this.props
        console.log('CRIB: props',this.props)
        const code = this.props.card.code
        const image = this.props.card.image
        console.log('CRIB code', code)
        console.log('CRIB image', image)

        return (
          <div>
            <button onClick={() => this.props.getCrib({deck_id})}>Get Crib</button>
            <p>This will become the card hands: {deck_id}</p>
            <p>This the first card: {code}</p>
            <img src={image} heigh='228px' width='162px'/ >
          </div>
        )
    }
}

export default Crib
