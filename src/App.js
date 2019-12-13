import React, { Component } from 'react';
import Deck from './Deck'
import Hand from './Hand'
import Results from './Results'
// import {getScore} from './cribbage.js'

class App extends Component {
  constructor(props) {
      super(props);
      this.turnOverCard = this.turnOverCard.bind(this)
      this.getHand = this.getHand.bind(this)
      this.state = {
        'deck': [],
        'cardsLeft': 52
        //'showResults': false
      }
    }
    componentDidMount() {

      // let test = getScore()
      // console.log('-------------------> test ', test)
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
                    deck: result,
                    cardsLeft: result.remaining
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
              communityCard: result.cards[0],
              cardsLeft: result.remaining
              //communityCard: {value: '5', code: '5h', image: 'https://deckofcardsapi.com/static/img/5H.png'}
            })
          });
    }

    // // fake results of a pair
    getHandTemp(DeckId) {
      const results = [
        {value: '4', code: '4d', image: 'https://deckofcardsapi.com/static/img/4D.png', suit: 'DIAMONDS'},
        {value: '2', code: '2c', image: 'https://deckofcardsapi.com/static/img/2C.png', suit: 'CLUBS'},
        {value: '2', code: '2h', image: 'https://deckofcardsapi.com/static/img/2H.png', suit: 'HEARTS'},
        {value: '3', code: '3h', image: 'https://deckofcardsapi.com/static/img/3H.png', suit: 'HEARTS'},
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
    getHand(DeckId) {
      // console.log('I am getting users hand from the deck: ', DeckId.deck_id)
      const url = 'https://deckofcardsapi.com/api/deck/' + DeckId.deck_id + '/draw/?count=4'
      fetch(url)
          .then(response =>
              response.json()
          )
          .then(result => {
            this.setState({
               hand: result.cards,
               cardsLeft: result.remaining
            })
          });
    }

    render() {
        const {deck_id} = this.state.deck;
        const cardsLeft = this.state.cardsLeft
        let card
        if (this.state.communityCard) {
          card = this.state.communityCard
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
                <div className='result-row'>
                  <div className='full-hand-cards'>
                    <Hand deck_id={deck_id} getHand={this.getHand} cardsLeft={cardsLeft} cards={cards}/>
                  </div>
                  <div className='full-hand-community-card'>
                    <Deck deck_id={deck_id} turnOverCard={this.turnOverCard} card={card}/>
                  </div>
                </div>
                <Results cards={cards} card={card}/>
            </div>
        );
    }
}

export default App;
