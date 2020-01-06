import React from 'react';
// import ReactDOM from 'react-dom';
// import { withRouter } from 'react-router-dom'
import '.././index.css';

// Component Hand
const CustomHand = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setShowCustomHand(false)
  }

  const handleChange = (event) => {
    event.preventDefault();
    props.onCustomHandChange(event.target.name, event.target.value)
  }

  const showCardOptions = (name, value) => {
    return (
      <div className='the-cards' onChange={handleChange}>
        <select className='custom-select' value={value} name={name}>
          <option value='ACE'>Ace</option>
          <option value='2'>Two</option>
          <option value='3'>Three</option>
          <option value='4'>Four</option>
          <option value='5'>Five</option>
          <option value='6'>Six</option>
          <option value='7'>Seven</option>
          <option value='8'>Eight</option>
          <option value='9'>Nine</option>
          <option value='10'>Ten</option>
          <option value='JACK'>Jack</option>
          <option value='QUEEN'>Queen</option>
          <option value='KING'>King</option>
        </select>
      </div>
    )
  }
  const showSuitOptions = (name, suit = 'SPADES') => {
    return (
      <div className='the-suits' onChange={handleChange} >
        <select className='custom-select' value={suit} name={name}>
          <option value='HEARTS'>Hearts</option>
          <option value='DIAMONDS'>Diamonds</option>
          <option value='SPADES'>Spades</option>
          <option value='CLUBS'>Clubs</option>
        </select>
      </div>
    )
  }

  const showCustomHand = props.showCustomHand
  let length
  if (props.cards) {
    length = props.cards.length
  }

  if (showCustomHand && props.cards.length > 3) {
    return (
      <form onSubmit={handleSubmit}>
        <div id='cardOptions'>
          <div className='card-option'>
            {showCardOptions('card1', props.cards[0].value)}
            {showSuitOptions('suit1', props.cards[0].suit)}
          </div>
          <div className='card-option'>
            {showCardOptions('card2', props.cards[1].value)}
            {showSuitOptions('suit2', props.cards[1].suit)}
          </div>
          <div className='card-option'>
            {showCardOptions('card3', props.cards[2].value)}
            {showSuitOptions('suit3', props.cards[2].suit)}
          </div>
          <div className='card-option'>
            {showCardOptions('card4', props.cards[3].value)}
            {showSuitOptions('suit4', props.cards[3].suit)}
          </div>
          <div className='c-card-option'>
            {showCardOptions('card5', props.cards[4].value)}
            {showSuitOptions('suit5', props.cards[4].suit)}
          </div>
        </div>
        <button className='cribbage-button' type="submit" value='Hello'>Hide</button>
      </form>
    )
  } else {
    return (null)
  }
}


export default CustomHand;
