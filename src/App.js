import React, { Component } from 'react'
import swal from 'sweetalert'
import Hand from './components/Hand'
import Results from './components/Results'
import CustomHand from './forms/CustomHand'

class App extends Component {
  constructor(props) {
    super(props)
    //    this.turnOverCard = this.turnOverCard.bind(this)
    this.getHand = this.getHand.bind(this)
    this.sortHand = this.sortHand.bind(this)
    this.setShowCustomHand = this.setShowCustomHand.bind(this)
    this.onCustomHandChange = this.onCustomHandChange.bind(this)
    // this.state = {}
    this.state = {
      'deck': [],
      'hand': [],
      'customHand': [],
      'cardsLeft': 52,
      //      'showResults': false,
      'showCustomHand': false
    }
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    fetch(url)
      .then(response =>
        response.json()
      )
      .then(result => {
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

  valueMap = {
    ACE: 'A',
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13
  }

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
    // make sure there are enough cards left in the deck
    let url
    if (this.state.cardsLeft < 5) {
      swal('New deck', 'There are not enough cards left in the deck. Now using new deck', 'info')
      url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      fetch(url)
        .then(response =>
          response.json()
        )
        .then(result => {
          this.setState({
            deck_id: result.deck_id,
            cardsLeft: result.remaining
          })
          url = 'https://deckofcardsapi.com/api/deck/' + result.deck_id + '/draw/?count=5'
        })
        .then(() => {
          fetch(url)
            .then(response =>
              response.json()
            )
            .then(result => {
              this.setState({
                hand: result.cards,
                cardsLeft: result.remaining
              })
            })
        })
    } else {
      url = 'https://deckofcardsapi.com/api/deck/' + this.state.deck_id + '/draw/?count=5'
      fetch(url)
        .then(response =>
          response.json()
        )
        .then(result => {
          this.setState({
            hand: result.cards,
            cardsLeft: result.remaining
          })
        })
    }
  }

  compareCardValues(cardA, cardB) {
    let comparison = 0
    if (cardA.val > cardB.val) {
      comparison = 1
    } else if (cardA.val < cardB.val) {
      comparison = -1
    }
    return comparison
  }

  sortHand() {
    let sortedHand = [...this.state.hand]
    sortedHand.sort(this.compareCardValues)
    this.setState({
      hand: sortedHand
    })
  }

  setShowCustomHand() {
    let showCustomHand = this.state.showCustomHand
    this.setState({ showCustomHand: !showCustomHand })
  }

  getCode(value, suit) {
    return `${this.codeMap[value]}${suit.charAt(0)}`
  }

  alreadyExists1(position, value) {
    // console.log('alreadyExists - position: ', position)
    // console.log('alreadyExists - value: ', value)
    // console.log('code map stuff: ', this.codeMap[value])

    //let's get the suit
    const suit = this.state.hand[position].suit
    let code = this.getCode(value, suit)

    for (let i = 0; i < this.state.hand.length; i++) {
      //      console.log('Comparing... ', this.state.hand[i].code, ' to ', code)
      if (this.state.hand[i].code === code) {
        return true
      }
    }
    return false
  }

  alreadyExists2(position, suit) {
    // console.log('alreadyExists - position: ', position)
    // console.log('alreadyExists - value: ', suit)

    // let's get the code
    const code = `${this.state.hand[position].code.charAt(0)}${suit.charAt(0)}`
    //  console.log('new code : ', code)

    for (let i = 0; i < this.state.hand.length; i++) {
      //    console.log('Comparing... ', this.state.hand[i].code, ' to ', code)
      if (this.state.hand[i].code === code) {
        return true
      }
    }
    return false
  }

  changeCard(card, value) {
    //console.log('changeCard - value: ', value)
    // console.log('code map stuff: ', this.codeMap[value])
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
    //  console.log('changeSuit - value: ', value)
    card.suit = value

    // change last letter of code to firts letter of suit
    let suitChar = value.charAt(0)
    //  console.log('suitChar: ', suitChar)
    let newCode = card.code.charAt(0) + suitChar
    //newCode[1] = suitChar
    card.code = newCode
    let newImage = `https://deckofcardsapi.com/static/img/${newCode}.png`
    card.image = newImage

    //  console.log('New card: ', card)
    return card
  }

  onCustomHandChange(name, value) {
    let position = name.charAt(name.length - 1) - 1
    // if name begins with 'suit'...
    // console.log('Custom hand has changed. The name is: ', name)
    // console.log('Custom hand has changed. The value is: ', value)
    // console.log('Custom hand has changed. The position is: ', position)

    // determine if this already exists in the hand
    // console.log('Already exists result: ', this.alreadyExists(position, value))

    let hand = this.state.hand
    let card = { ...hand[position] }
    let newCard
    if (name.slice(0, 4) === 'card') {
      //      console.log('Dealing with the card change')
      if (!this.alreadyExists1(position, value)) {
        //        console.log('Making the change...')
        newCard = this.changeCard(card, value)
        hand[position] = newCard
        this.setState({ hand })
      } else {
        swal('Oops!', 'You cannot have two identical cards in a hand.', 'warning')
        //        console.log('NOT making the change...')
      }
      //newCard = this.changeCard(card, value)
    } else if (name.slice(0, 4) === 'suit') {
      //      console.log('Dealing with a suit change')
      if (!this.alreadyExists2(position, value)) {
        newCard = this.changeSuit(card, value)
        hand[position] = newCard
        this.setState({ hand })
      } else {
        swal('Oops', 'You cannot have two identical cards in a hand.', 'warning')
        //        console.log('NOT making the change...')
      }
      //newCard = this.changeSuit(card, value)
    }
  }

  render() {

    const cardsLeft = this.state.cardsLeft
    const showCustomHand = this.state.showCustomHand
    const setShowCustomHand = this.setShowCustomHand
    const onCustomHandChange = this.onCustomHandChange

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
      <div className='container'>
        <h1 className='cribbage-text'>Cribbage Hand Practice Tool</h1>
        <p>Practice your point counting skills.</p>

        <div className='result-row'>
          <React.Fragment>
            <Hand getHand={this.getHand} sortHand={this.sortHand} cardsLeft={cardsLeft} cards={cards} buttonText={buttonText} />
          </React.Fragment>
        </div>
        <CustomHand cards={cards} showCustomHand={showCustomHand} setShowCustomHand={setShowCustomHand} onCustomHandChange={onCustomHandChange} />
        <Results cards={cards} />
      </div>
    )
  }
}
export default App
