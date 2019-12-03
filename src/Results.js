import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {showResults: true}
  }
  // remove the suits as they are not required for caluculatin sums
  convertToIntegers(arr) {
    var arrNoSuits = arr.map(card => card.value)
    // console.log('111111111 ', arrNoSuits)
    // change face cards and ace to numbers
    var arrInteger = arrNoSuits.map(function (card) {
      if (isNaN(card)) {
        card = (card === 'ACE') ? 1 :10
      } else {
        card = parseInt(card,10)
      }
      return card
    })
    console.log('222222222 ', arrInteger)
    return arrInteger
  }

  /**
 * Returns sets of two numbers that sum to the target value
 * @param {number[]} arr - Array of integers
 * @param {number} target - Target value that the pairs should sum to
 * @return {Array<Array<number>>} Array of pairs of numbers
 * @example
 * []
 *
 */
twoSum(arr, target) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
			if (arr[i] + arr[j] === target) {
				// console.log(i,j)
        result.push([i, j]);
			}
		}
	}
	return result;
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
  console.log('ZZZZZZZZ ', finalResult)
  return finalResult
}
/**
 * Returns sets of two cards that sum to the target value
 * @param {string[]} cardHand - Array of cards
 * @param {number} target - Target value that the 2 cards should sum to
 * @return {Array<Array<Cards>>} Array of cards representing cards that sum to the target value
 * @example
 * [['9h', '6d'], ['7s', '8h']
 *
 */
checkForFifteenPairs(cardHand, target=15) {
  console.log('AAAAAAAAA ', cardHand)
  let hand = this.convertToIntegers(cardHand)
  console.log('BBBBBBBBBBhand ', hand)
  console.log('BBBBBBBBBBfullHand ', cardHand)
  let result = this.twoSum(hand,target)
  console.log('CCCCCCCCCC ', result)
  let pairs = []
  for (var i=0; i < result.length; i++) {
    pairs.push([cardHand[result[i][0]], cardHand[result[i][1]]])
  }
  return pairs
}
/**
 * Returns sets of three cards that sum to the target value
 * @param {string[]} cardHand - Array of cards
 * @param {number} target - Target value that the 3 cards should sum to
 * @return {Array<Array<string>>} Array of triplets representing cards that sum to the target value
 * @example
 * [['9h', '4d', '2d'], ['7s', '7h', 'as']
 *
 */
checkForFifteenTriplets(cardHand, target=15) {
  let hand = this.convertToIntegers(cardHand)
  console.log('111111111 ', cardHand)
  console.log('222222222 ', hand)
  let pairTarget = target - hand[0]
  hand.shift()
  let start = 0;
  // let intermediateResult = []
  let triplets = []
  for (let j=start+1; j< hand.length; j++) {
    // console.log('Checking with: ', hand, 'with target: ',target)
    let result = this.twoSum(hand,pairTarget)
    for (var p=0; p <result.length; p++) {
      let temp = [cardHand[j-1]]
      temp.push(cardHand[result[p][0] +j])
      temp.push(cardHand[result[p][1] +j])
      triplets.push(temp)
    }
    pairTarget = target - hand[0]
    hand.shift()
  }
  return triplets
}

/**
 * Returns sets of four cards that sum to the target value
 * @param {string[]} cardHand - Array of cards
 * @param {number} target - Target value that the 4 cards should sum to
 * @return {Array<Array<string>>} Array of quartets representing cards that sum to the target value
 * @example
 * [['qh', '3d', 'ad', 'as'], ['4s', '3h', '5s', '3h']
 *
 */
checkForFifteenQuartets(cardHand, target=15) {
  let finalResult = []
  let hand = this.convertToIntegers(cardHand)
  console.log('3333333333 ', cardHand)
  console.log('4444444444 ', hand)
  for (let i=0; i < hand.length; i++) {
    let sum=hand[0]+hand[1]+hand[2]+hand[3]+hand[4]-hand[i]
    console.log('=======> comparing ' + sum + ' to ' + target)
    if (sum === target) {
      let result = [...cardHand]
      console.log('Quartet sum = 15 ', result)
      console.log('i ', i)
      result.splice(i,1)
      console.log('Quartet sum = 15 ', result)
      finalResult.push(result)
    }
  }
  console.log('555555555 returning ',finalResult)
  return finalResult
}

/**
 * Returns sets of five cards that sum to the target value
 * @param {string[]} cardHand - Array of cardes
 * @param {number} target - Target value that the 5 cards should sum to
 * @return {Array<Array<string>>} Array of quintets representing cards that sum to the target value
 * @example
 * [['qh', '3d', 'ad', 'as'], ['4s', '3h', '5s', '3h']
 *
 */
checkForFifteenQuintet(cardHand, target=15) {
  let finalResult = []
  let hand = this.convertToIntegers(cardHand)
  let sum=hand[0]+hand[1]+hand[2]+hand[3]+hand[4]
  if (sum === target) {
    finalResult.push(cardHand)
  }
  return finalResult
}

render() {
        let pairResults = []
        const { cards, card } = this.props;
        let showResults = this.state.showResults

        let fullHand = [...cards]
        fullHand.push(card)

        let charArray = this.convertToChars(fullHand)
        pairResults = this.getPairs(charArray, fullHand)

        let sumResultPairs = this.checkForFifteenPairs(fullHand)
        console.log('****** S U M   T E S T I N G - P A I R S ')
        console.log(sumResultPairs)

        let sumResultTriplets = this.checkForFifteenTriplets(fullHand)
        console.log('****** S U M   T E S T I N G - T R I P L E T S  ')
        console.log(sumResultTriplets)

        let sumResultQuartets = this.checkForFifteenQuartets(fullHand)
        console.log('****** S U M   T E S T I N G - Q U A R T E T S  ')
        console.log(sumResultQuartets)

        let sumResultQuintet = this.checkForFifteenQuintet(fullHand)
        console.log('****** S U M   T E S T I N G - Q U I N T E T  ')
        console.log(sumResultQuintet)

        // add all the results of the sums
        let fullSumsResult = [...sumResultPairs,  ...sumResultTriplets, ...sumResultQuartets, sumResultQuintet]
        console.log('TTTTTTTTTTTTTTT ', fullSumsResult)

        // temp // TODO:
        if (!pairResults) {
          pairResults = []
        }

        const showResultsCheckbox =  <div>
          <label>Show results</label>
          <input type='checkbox' inline='true' checked={showResults} onClick={() => {this.setState({showResults: !showResults})}}/>
        </div>

        //check that hand has been delt
         if (fullHand.length > 1 ) {
          return <div><div>{showResultsCheckbox}</div>
          {pairResults.map(result =>
            <div>
              <div style={{ display: (showResults ? 'block' : 'none') }}>
                <ul>
                   {result.map(card =>
                     <img className='hand' src={card.image} key={card.code} alt={card.code} height="90" width="64"/>
                   )}Pair - Points: {result.length}
                </ul>
              </div>
              </div>
           )}
           {fullSumsResult.map(result =>
             <div>
               <div style={{ display: (showResults ? 'block' : 'none') }}>
                 <ul>
                    {result.map(card =>
                      <img className='hand' src={card.image} key={card.code} alt={card.code} height="114" width="81"/>
                    )}Sum to 15 - Points: {result.length}
                 </ul>
               </div>
               </div>
            )}
           </div>
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
