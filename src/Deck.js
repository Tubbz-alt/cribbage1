import React, { Component } from 'react';

class Deck extends Component {
  render() {
        const { deck_id } = this.props;
        const code = this.props.card.code
        const image = this.props.card.image

        return (
        <div>
          <button onClick={() => this.props.turnOverCard({deck_id})}>Community card</button>
          <div>
            <img src={image} height='180px' width='128px' alt={code}/ >
          </div>
        </div>
        )
    }
}

export default Deck
