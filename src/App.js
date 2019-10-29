import React, { Component } from 'react';
import CardHand from './CardHand';

class App extends Component {
  constructor(props) {
      super(props);
      this.getCards = this.getCards.bind(this);
    }

    state = {
    'deck': []
    // 'hand': {}
}
    componentDidMount() {
        // const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*&limit=1";
        console.log("Look at me. I mounted!!")


        // temporarily removed this to save bandwidth and resue the same deck
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        fetch(url)
            .then(response =>
              response.json()
            )
            .then(result => {
                console.log('STATE1111', this.state)
                console.log('BBBBBBB ', result)
                this.setState({
                    deck: result
                })
            })
    }

    getCards(DeckId) {
      console.log('I am getting cards for the deck: ', DeckId.deck_id)
      const url = 'https://deckofcardsapi.com/api/deck/' + DeckId.deck_id + '/draw/?count=1'
      fetch(url)
          .then(response =>
              response.json()
          )
          .then(result => {
            console.log('STATE2222', this.state)
            console.log('FFFFFFFFF ', result)
            //console.log('CCCCCCC ', this)
            console.log('DDDDDDD ', result.cards[0])
            this.setState({
              hand: result.cards
            })
          });
    }

    render() {
        const {deck_id} = this.state.deck;
        const {deck} = this.state.deck

        // const {card} = this.state.hand
        let card
        if (this.state.hand) {
          card = this.state.hand[0]
        } else {
          card = {}
        }
        return (
            <div className="container">
                <h1>Cribbage Hand Tester</h1>
                <p>Guess how many points this hand is worth.</p>
                <CardHand deck_id={deck_id} getCards={this.getCards} card={card}/>
            </div>
        );
    }
}

export default App;
