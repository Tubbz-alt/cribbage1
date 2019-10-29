import React, { Component } from 'react';
import Crib from './Crib'
import Hand from './Hand'

class App extends Component {
  constructor(props) {
      super(props);
      this.getCrib = this.getCrib.bind(this)
      this.getHand = this.getHand.bind(this)
    }

    state = {
    'deck': []
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

    getCrib(DeckId) {
      console.log('I am getting crib card from the deck: ', DeckId.deck_id)
      const url = 'https://deckofcardsapi.com/api/deck/' + DeckId.deck_id + '/draw/?count=1'
      fetch(url)
          .then(response =>
              response.json()
          )
          .then(result => {
            console.log('GET CRIB state', this.state)
            console.log('GT CRIB result ', result)
            //console.log('CCCCCCC ', this)
            console.log('GET CRIB cards', result.cards[0])
            this.setState({
              crib: result.cards
            })
          });
    }

    getHand(DeckId) {
      console.log('I am getting users hand from the deck: ', DeckId.deck_id)
      const url = 'https://deckofcardsapi.com/api/deck/' + DeckId.deck_id + '/draw/?count=4'
      fetch(url)
          .then(response =>
              response.json()
          )
          .then(result => {
            console.log('GET HAND state', this.state)
            console.log('GET HAND result ', result)
            console.log('CCCCCCC ')
            console.log('GET HAND cards1', result)
            console.log('GET HAND cards2', result.cards)
            this.setState({
               hand: result.cards
            })
          });
    }

    render() {
        console.log('RENDER: state', this.state)
        const {deck_id} = this.state.deck;
        const {deck} = this.state.deck

        // const {card} = this.state.hand
        let card
        if (this.state.crib) {
          card = this.state.crib[0]
        } else {
          card = {}
        }

        let cards
        if (this.state.hand) {
          console.log('APP checking state.cards1 ')
          console.log('APP checking state ', this.state)
          console.log('APP checking state.hand ', this.state.hand)
          cards = this.state.hand
        } else {
          console.log('APP checking stae.cards2 ')
          cards = []
        }
        return (
            <div className="container">
                <h1>Cribbage Hand Tester</h1>
                <p>Guess how many points this hand is worth.</p>
                <Crib deck_id={deck_id} getCrib={this.getCrib} card={card}/>
                <Hand deck_id={deck_id} getHand={this.getHand} cards={cards}/>
            </div>
        );
    }
}

export default App;
