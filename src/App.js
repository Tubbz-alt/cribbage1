import React, { Component } from 'react';
import Deck from './Deck'
import Hand from './Hand'
import Results from './Results'

class App extends Component {
  constructor(props) {
      super(props);
      this.turnOverCard = this.turnOverCard.bind(this)
      this.getHand = this.getHand.bind(this)
      this.state = {
        'deck': []
        //'showResults': false
      }
    }
    componentDidMount() {
        // const url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*&limit=1";
        // console.log("Look at me. I mounted!!")


        // temporarily removed this to save bandwidth and resue the same deck
        const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
        fetch(url)
            .then(response =>
              response.json()
            )
            .then(result => {
                // console.log('STATE1111', this.state)
                // console.log('BBBBBBB ', result)
                this.setState({
                    deck: result
                })
            })
    }

    turnOverCard(DeckId) {
      // console.log('I am getting first card from the deck: ', DeckId.deck_id)
      const url = 'https://deckofcardsapi.com/api/deck/' + DeckId.deck_id + '/draw/?count=1'
      fetch(url)
          .then(response =>
              response.json()
          )
          .then(result => {
            // console.log('GET Crib state', this.state)
            // console.log('GT Crib result ', result)
            //console.log('CCCCCCC ', this)
            // console.log('GET Crib cards', result.cards[0])
            this.setState({
              crib: result.cards
              //crib: {value: '5', code: '5h', image: 'https://deckofcardsapi.com/static/img/5H.png'}
            })
          });
    }

    // // fake results of a pair
    getHand(DeckId) {
      const results = [
        {value: '5', code: '5h', image: 'https://deckofcardsapi.com/static/img/5H.png', suit: 'hearts'},
        {value: '6', code: '2d', image: 'https://deckofcardsapi.com/static/img/6D.png', suit: 'diamonds'},
        {value: '7', code: '9c', image: 'https://deckofcardsapi.com/static/img/7C.png', suit: 'clubs'},
        {value: '2', code: '2h', image: 'https://deckofcardsapi.com/static/img/2H.png', suit: 'hearts'},
      ]
      this.setState({
         hand: results
      })
    }

/*
 * [cards]
 * card.code        eg. JS, AD, 9H
 * card.image       eg.
 * card.cardsImages
 * card. suits      eg. SPADES, DIAMONDS, HEARTS
 * card.value       eg. JACK, ACE, 9
 * card.code        eg.
 *
 *
 *
 */
    getHandTemp(DeckId) {
      // console.log('I am getting users hand from the deck: ', DeckId.deck_id)
      const url = 'https://deckofcardsapi.com/api/deck/' + DeckId.deck_id + '/draw/?count=4'
      fetch(url)
          .then(response =>
              response.json()
          )
          .then(result => {
            // console.log('GET HAND state', this.state)
            // console.log('GET HAND result ', result)
            // console.log('CCCCCCC ')
            // console.log('GET HAND cards1', result)
            console.log('GET HAND cards2', result.cards)
            this.setState({
               hand: result.cards
            })
          });
    }

    render() {
        const {deck_id} = this.state.deck;

        let card
        if (this.state.crib) {
          card = this.state.crib[0]
        } else {
          card = {}
        }

        let cards
        if (this.state.hand) {
          cards = this.state.hand
        } else {
          cards = []
        }

        return (
            <div className="container">
                <h1>Cribbage Hand Tester</h1>
                <p>Guess how many points this hand is worth.</p>
                <Hand deck_id={deck_id} getHand={this.getHand} cards={cards}/>
                <Deck deck_id={deck_id} turnOverCard={this.turnOverCard} card={card}/>
                <Results cards={cards} card={card}/>
            </div>
        );
    }
}

export default App;
