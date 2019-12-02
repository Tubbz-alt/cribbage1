import React, { Component } from 'react';

class Deck extends Component {
  render() {
        const { deck_id } = this.props;
        const code = this.props.card.code
        const image = this.props.card.image

        return (
        <div>
          <button onClick={() => this.props.turnOverCard({deck_id})}>Turn over card</button>
          <div>
            <img src={image} height='228px' width='162px' alt={code}/ >
          </div>
        </div>
        )
    }
}

export default Deck
