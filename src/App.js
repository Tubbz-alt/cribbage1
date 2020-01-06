import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
//import { withRouter } from 'react-router-dom'
// import Deck from './components/Deck'
// import { BrowserRouter, Route } from 'react-router-dom'
import Hand from './components/Hand'
import Results from './components/Results'
import CustomHand from './forms/CustomHand'

class App extends Component {
  constructor(props) {
    super(props);
    //    this.turnOverCard = this.turnOverCard.bind(this)
    this.getHand = this.getHand.bind(this)
    this.setShowCustomHand = this.setShowCustomHand.bind(this)
    this.onCustomHandChange = this.onCustomHandChange.bind(this)
    // this.state = {}
    this.state = {
      'deck': [],
      'hand': [],
      'customHand': [],
      'cardsLeft': 52,
      'showCustomHand': false
    }
  }

  componentWillUnmount() {
    console.log('XXXXXXXXXXXXX App is unmounting')
  }

  componentDidMount() {
    console.log('XXXXXXXXXXXXX App is mounting: ', this.state)
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    fetch(url)
      .then(response =>
        response.json()
      )
      .then(result => {
        // console.log('STATE1111', this.state)
        // console.log('BBBBBBB deck_id ', result.deck_id)
        // handle error here TODO
        // result.success hould be true
        this.setState({
          deck_id: result.deck_id,
          cardsLeft: result.remaining
        })
      })
  }

  codeMap = {
    ACE: 'A',
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 0,
    JACK: 'J',
    QUEEN: 'Q',
    KING: 'K'
  }

  // turnOverCard() {
  //   // console.log('I am getting first card from the deck: ', deck_id)
  //   const url = 'https://deckofcardsapi.com/api/deck/' + this.state.deck_id + '/draw/?count=1'
  //   fetch(url)
  //     .then(response =>
  //       response.json()
  //     )
  //     .then(result => {
  //       // console.log('GET Crib state', this.state)
  //       // console.log('GT Crib result ', result)
  //       //console.log('CCCCCCC ', this)
  //       // console.log('GET Crib cards', result.cards[0])
  //       this.setState({
  //         communityCard: result.cards[0],
  //         cardsLeft: result.remaining
  //         //communityCard: {value: '5', code: '5h', image: 'https://deckofcardsapi.com/static/img/5H.png'}
  //       })
  //     });
  // }

  // // fake results of a pair
  getHandTemp() {
    const results = [
      { value: '4', code: '4c', image: 'https://deckofcardsapi.com/static/img/4C.png', suit: 'CLUBS' },
      { value: '2', code: '2c', image: 'https://deckofcardsapi.com/static/img/2C.png', suit: 'CLUBS' },
      { value: '5', code: '5c', image: 'https://deckofcardsapi.com/static/img/5C.png', suit: 'CLUBS' },
      { value: '3', code: '3c', image: 'https://deckofcardsapi.com/static/img/3C.png', suit: 'CLUBS' },
      { value: '7', code: '7c', image: 'https://deckofcardsapi.com/static/img/7C.png', suit: 'CLUBS' },
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
    const url = 'https://deckofcardsapi.com/api/deck/' + this.state.deck_id + '/draw/?count=5'
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

  setShowCustomHand(value) {
    this.setState({
      showCustomHand: value
    })
  }

  showCustomHandForm() {
    console.log('Showing custom hand form. ', this.props)
  }

  changeCard(card, value) {
    console.log('changeCard - value: ', value)
    console.log('code map stuff: ', this.codeMap[value])
    card.value = value


    // change first letter of code to firts letter of suit
    let cardChar = this.codeMap[value]
    // console.log('suitChar: ', suitChar)
    let newCode = cardChar + card.code.charAt(1)
    // //newCode[1] = suitChar
    card.code = newCode
    let newImage = `https://deckofcardsapi.com/static/img/${newCode}.png`
    card.image = newImage
    //
    // console.log('New card: ', card)
    return card
  }

  changeSuit(card, value) {
    console.log('changeSuit - value: ', value)
    card.suit = value

    // change last letter of code to firts letter of suit
    let suitChar = value.charAt(0)
    console.log('suitChar: ', suitChar)
    let newCode = card.code.charAt(0) + suitChar
    //newCode[1] = suitChar
    card.code = newCode
    let newImage = `https://deckofcardsapi.com/static/img/${newCode}.png`
    card.image = newImage

    console.log('New card: ', card)
    return card
  }

  onCustomHandChange(name, value) {
    let position = name.charAt(name.length - 1) - 1
    // if name begins with 'suit'...
    console.log('Custom hand has changed. The name is: ', name)
    console.log('Custom hand has changed. The value is: ', value)
    console.log('Custom hand has changed. The position is: ', position)
    let hand = this.state.hand
    let card = { ...hand[position] }
    let newCard
    if (name.slice(0, 4) === 'card') {
      console.log('Dealing with the card change')
      newCard = this.changeCard(card, value)
    } else if (name.slice(0, 4) === 'suit') {
      console.log('Dealing with a suit change')
      newCard = this.changeSuit(card, value)
    }
    hand[position] = newCard
    this.setState({ hand })
  }

  render() {

    const cardsLeft = this.state.cardsLeft
    const showCustomHand = this.state.showCustomHand
    const setShowCustomHand = this.setShowCustomHand
    const onCustomHandChange = this.onCustomHandChange

    console.log('==================> the state ', showCustomHand)

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
          <React.Fragment>
            <Hand getHand={this.getHand} showCustomHand={this.showCustomHandForm} setShowCustomHand={setShowCustomHand} cardsLeft={cardsLeft} cards={cards} buttonText={buttonText} />
          </React.Fragment>
        </div>
        <div id='customHand'>
          <CustomHand cards={cards} showCustomHand={showCustomHand} setShowCustomHand={setShowCustomHand} onCustomHandChange={onCustomHandChange} />
        </div>
        <Results cards={cards} />
      </div>
    );
  }
}
// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
// const AppWithRouter = withRouter(App);

export default App;
