import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {showResults: true}
  }
  // strip the cards array down to a simple array of characters
  convertToChars(cards) {
    let charArray = []
    cards.map(function (card) {
      return charArray.push(card.value)
    })
    return charArray
  }

  // quick and dirty way to count occurences of a character in an array
  countOcurrences(arr, c) {
    let count = 0
    for (let i=0; i<arr.length; i++) {
      if (arr[i] === c) {
        count++
      }
    }
    return count
  }

  // gets pairs, triplets and quartets of cards in a hand
  getPairs(hand, fullHand) {
    console.log('Getting results... ', fullHand)
    // creating aset removes duplicates.
    const uniqueSet = new Set(hand)

    // turn set back to array so that we have an
    // array of unique values in the hand
    const uniqueValues = [...uniqueSet]
    let finalResult = []
    // looping through 3 values - a, j and 3
    for (let i=0; i<uniqueValues.length; i++) {
      let tempResult = []
      let occurences = this.countOcurrences(hand, uniqueValues[i])
      if (occurences > 1) {
        // get index of each one
        for (let k=0; k < hand.length; k++) {
          if (uniqueValues[i]===hand[k]) {
            tempResult.push(fullHand[k])
          }
        }
      finalResult.push(tempResult)
      }
  }
  return finalResult
}
  render() {
        let results = []
        const { cards, card } = this.props;
        let showResults = this.state.showResults

        let fullHand = [...cards]
        fullHand.push(card)

        let charArray = this.convertToChars(fullHand)
        results = this.getPairs(charArray, fullHand)

        // temp // TODO:
        if (!results) {
          results = []
        }

        const showResultsCheckbox =  <div>
          <label>Show results</label>
          <input type='checkbox' inline='true' checked={showResults} onClick={() => {this.setState({showResults: !showResults})}}/>
        </div>

        //check that hand has been delt
         if (fullHand.length > 1 ) {
          return results.map(result =>
            <div>
              <div>
                <label>Show results</label>
                <input type='checkbox' inline='true' checked={showResults} onClick={() => {this.setState({showResults: !showResults})}}/>
              </div>
              <div style={{ display: (showResults ? 'block' : 'none') }}>
                <ul>
                   {result.map(card =>
                     <img className='hand' src={card.image} key={card.code} alt={card.code} height="114" width="81"/>
                   )}
                </ul>
             </div>
           </div>
         )
       } else {
         return (
           <div>
           {showResultsCheckbox}
             <div>Nothing to display</div>
           </div>

         )
       }

    }
}

export default Results
