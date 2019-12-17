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
      'deck': [],
      'hand': [],
      'communityCard': '',
      'cardsLeft': 52
      //'showResults': false,
    }
  }
  componentDidMount() {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    fetch(url)
      .then(response =>
        response.json()
      )
      .then(result => {
        console.log('STATE1111', this.state)
        console.log('BBBBBBB deck_id ', result.deck_id)
        // handle error here TODO
        // result.success hould be true
        this.setState({
          deck_id: result.deck_id,
          cardsLeft: result.remaining
        })
      })
  }

  turnOverCard() {
    // console.log('I am getting first card from the deck: ', deck_id)
    const url = 'https://deckofcardsapi.com/api/deck/' + this.state.deck_id + '/draw/?count=1'
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
  getHandTemp() {
    const results = [
      { value: '4', code: '4c', image: 'https://deckofcardsapi.com/static/img/4C.png', suit: 'CLUBS' },
      { value: '2', code: '2c', image: 'https://deckofcardsapi.com/static/img/2C.png', suit: 'CLUBS' },
      { value: '5', code: '5c', image: 'https://deckofcardsapi.com/static/img/5C.png', suit: 'CLUBS' },
      { value: '3', code: '3c', image: 'https://deckofcardsapi.com/static/img/3C.png', suit: 'CLUBS' },
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
  getHand() {
    const url = 'https://deckofcardsapi.com/api/deck/' + this.state.deck_id + '/draw/?count=4'
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
    // const deck_id = this.state.deck_id;
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

    let buttonText = ''
    if (cardsLeft === 52) {
      buttonText = 'Reveal Cards'
    } else {
      buttonText = 'Get new cards'
    }
    return (
      <div className="container">
        <h1>Cribbage Hand Tester</h1>
        <p>Guess how many points this hand is worth.</p>
        <div className='result-row'>
          <div className='full-hand-cards'>
            <Hand getHand={this.getHand} cardsLeft={cardsLeft} cards={cards} buttonText={buttonText} />
          </div>
          <div className='full-hand-community-card'>
            <Deck turnOverCard={this.turnOverCard} card={card} />
          </div>
        </div>
        <Results cards={cards} card={card} />
      </div>
    );
  }
}

export default App;
