import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {showResults: true}
    this.personName = 'Fred'
    // all 10 combinations that a run of three can have
    this.patternsOfThree = [
      [0, 1, 2],
      [0, 1, 3],
      [1, 2, 3],
      [0, 1, 4],
      [0, 2, 4],
      [1, 2, 4],
      [0, 3, 4],
      [1, 3, 4],
      [2, 3, 4],
      [0, 2, 3]
    ]
  }


// helper function to convert the card.value into an integer
  convertToIntegers(cards) {
    var arrNoSuits = cards.map(card => card.value)
    // change face cards and ace to numbers
    var arrInteger = arrNoSuits.map(function (card) {
      if (isNaN(card)) {
        card = (card === 'ACE') ? 1 :10
      } else {
        card = parseInt(card,10)
      }
      return card
    })
    return arrInteger
  }

  // helper function to sort the cards and add 'val' property
  sortCards(cards) {
    let copyOfCards = [...cards]
    for (let i=0; i < cards.length; i++) {

      switch(copyOfCards[i].value) {
        case 'ACE':
          copyOfCards[i].val = 1;
          break;
        case 'JACK':
          copyOfCards[i].val = 11;
          break;
        case 'QUEEN':
          copyOfCards[i].val = 12;
          break;
        case 'KING':
          copyOfCards[i].val = 13
          break;
        default:
          copyOfCards[i].val = parseInt(copyOfCards[i].value,10);
        }
      }
    copyOfCards.sort((a,b)=> a.val-b.val)
    return copyOfCards
  }

  /**
 * Returns array of two numbers that sum to the target value
 * @param {number[]} arr - Array of integers
 * @param {number} target - Target value that the pairs should sum to
 * @return {Array<Array<number>>} Array of pairs of numbers where each number represents the poistion in the hand
 * @example [[1,2], [3,5], [4,5]]
 *
 */
twoSum(arr, target) {
  var result = [];
	for (var i = 0; i < arr.length; i++) {
		for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
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

// strip the cards array down to a simple array of suits
convertToSuits(cards) {
  let suitsArray = []
  cards.map(function (card) {
    return suitsArray.push(card.suit)
  })
  return suitsArray
}

// checks for a run in a given array of cards
findRun(hand, toCheck, runLength) {
  let runFound = true
  for (let k=0; k < runLength-1; k++) {
    let result = hand[toCheck[k+1]].val-hand[toCheck[k]].val
    if (result === 1 ) {
      continue
    } else {
      runFound = false
    }
  }
  return runFound
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
  getPairs(fullHand) {
    //debugger
    // reduce the array to an array of chars
    let charArray = this.convertToChars(fullHand)
    // creating aset removes duplicates.
    const uniqueSet = new Set(charArray)
    // turn set back to array so that we have an
    // array of unique values in the hand
    const uniqueValues = [...uniqueSet]
    let finalResult = []
    // looping through 3 values - a, j and 3
    for (let i=0; i<uniqueValues.length; i++) {
      let result = []
      let occurences = this.countOcurrences(charArray, uniqueValues[i])
      if (occurences > 1) {
        // get index of each one
        for (let k=0; k < charArray.length; k++) {
          if (uniqueValues[i]===charArray[k]) {
            result.push(fullHand[k])
          }
        }
        let resultObj = {}
        resultObj.result = result
        let resultLength = result.length
        if (resultLength === 2 ) {
          resultObj.description = 'Pair'
          resultObj.score = 2
        }
        else if (resultLength === 3 ) {
          resultObj.description = 'Three of a kind'
          resultObj.score = 6
        } else if (resultLength === 4 ) {
          resultObj.description = 'Four of a kind'
          resultObj.score = 12
        }
        finalResult.push(resultObj)
      }
    }
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
  // debugger
  let hand = this.convertToIntegers(cardHand)
  let result = this.twoSum(hand,target)
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
  let pairTarget = target - hand[0]
  hand.shift()
  let start = 0;
  // let intermediateResult = []
  let triplets = []
  for (let j=start+1; j< hand.length+2; j++) {
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
  for (let i=0; i < hand.length; i++) {
    let sum=hand[0]+hand[1]+hand[2]+hand[3]+hand[4]-hand[i]
    if (sum === target) {
      let result = [...cardHand]
      result.splice(i,1)
      finalResult.push(result)
    }
  }
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

/**
 * Returns sets of four or five cards that are the same suit
 * @param {string[]} cardHand - Array of cardes
 * @return {Array<Array<Card>>} Array of Cards representing a flush
 *
 */
 checkForFlush(cardHand) {
   const copyOfHand = [...cardHand]
   // check for five card flush (all suits are equal)
   const checkAllEqual = arr => arr.every( card => card.suit === arr[0].suit )

   let allEqual = checkAllEqual(copyOfHand)
   if (allEqual) {
     return copyOfHand
   } else { // check for flush in forst four cards
     copyOfHand.pop()
     allEqual = checkAllEqual(copyOfHand)
     if (allEqual) {
       return copyOfHand
     }
   }
   return []
 }

 // checks if the hand as a Jack that matches the suit of the community card
 checkForNibs(cards, card) {
   let communitySuit = card.suit
   let result = []
   for (let i=0; i < cards.length; i++ ) {
     if (cards[i].value === 'JACK' && cards[i].suit === communitySuit) {
       result.push(card)
     }
   }
   return result
 }

 /**
  * Returns sets of three, four or five cards that are sequential ie; a run
  * @param {string[]} cardHand - Array of cardes
  * @return {Array<Array<Card>>} Array of Cards representing a run
  *
  */
  checkForRuns(cardHand) {
    let sortedCards = this.sortCards(cardHand)
    let runsResult = []
    // all 4 combinations that a run of 4 can have
    const patternsOfFour = [
      [0,1,2,3],
      [0,1,2,4],
      [0,1,3,4],
      [0,2,3,4],
      [1,2,3,4]
    ]
    // // all 10 combinations that a run of three can have
    // const patternsOfThree = [
    //   [0, 1, 2],
    //   [0, 1, 3],
    //   [1, 2, 3],
    //   [0, 1, 4],
    //   [0, 2, 4],
    //   [1, 2, 4],
    //   [0, 3, 4],
    //   [1, 3, 4],
    //   [2, 3, 4],
    //   [0, 2, 3]
    // ]

    console.log(this.personName)

    let runOf5Found = true

    // start by looking for runs of 5
    for (let i=0; i < 4; i++) {
      if (sortedCards[i+1].val-sortedCards[i].val !== 1 ) {
        runOf5Found = false
        break
      }
    }

    // now look for runs of 4 using the 5 possible combos of 4 runs if there were no runs of 5
    let runOf4Found = false
    if (!runOf5Found) {
      for (let i=0; i< patternsOfFour.length; i++) {
        if (this.findRun(sortedCards, patternsOfFour[i], 4)) {
          runsResult.push([sortedCards[patternsOfFour[i][0]], sortedCards[patternsOfFour[i][1]], sortedCards[patternsOfFour[i][2]], sortedCards[patternsOfFour[i][3]]])
          runOf4Found = true
        }
      }
    }
    // now look for runs of 3 using the the 9 possible combos of 3 runs if there were no runs of 4
  let runOf3Found = false
  if (!runOf4Found) {
    for (let i=0; i< this.patternsOfThree.length; i++) {
      if (this.findRun(sortedCards, this.patternsOfThree[i], 3)) {
        runsResult.push([sortedCards[this.patternsOfThree[i][0]], sortedCards[this.patternsOfThree[i][1]], sortedCards[this.patternsOfThree[i][2]]])
        runsResult.description='fred'
        runsResult.score = 3
        runOf3Found = true
      }
    }
  }
    return runsResult
  }


 tallyTheScores(pairResult, fullSumsResult, runsResult, nibsResult) {
   let score = 0
   for (let i=0; i < pairResult.length; i++) {
     score = score + pairResult[i].score
   }
   for (let i=0; i < fullSumsResult.length; i++) {
     score = score + 2
   }
   for (let i=0; i < runsResult.length; i++) {
     score = score + runsResult[i].length
   }
   if (nibsResult.length>0) {
     score = score + 1
   }
   return score
 }

render() {
        let pairResults = []
        const {cards, card}  = this.props

        let displayPairs, displaySums, displayRuns, displayFlush, displayNibs
        let showResults = this.state.showResults
        let fullSumsResult, flushResult, runsResult, nibsResult
        let fullHand = [...cards]
        fullHand.push(card)
        let totalScore = 0

        if (fullHand.length === 5 ) {
          pairResults = this.getPairs(fullHand)
          console.log('======> fullHand: ', fullHand)
          console.log('****** P A I R  T E S T I N G')
          console.log(pairResults)

          // T H I S   I S  T H E   P R O B L E M
          //let sumResultPairs = []
          let sumResultPairs = this.checkForFifteenPairs(fullHand)
          console.log('======> fullHand: ', fullHand)
          console.log('****** S U M   T E S T I N G - P A I R S ')
          console.log(sumResultPairs)

          let sumResultTriplets = this.checkForFifteenTriplets(fullHand)
          console.log('======> fullHand: ', fullHand)
          console.log('****** S U M   T E S T I N G - T R I P L E T S  ')
          console.log(sumResultTriplets)

          // let sumResultQuartets = []
          let sumResultQuartets = this.checkForFifteenQuartets(fullHand)
          console.log('======> fullHand: ', fullHand)
          console.log('****** S U M   T E S T I N G - Q U A R T E T S  ')
          console.log(sumResultQuartets)

          //let sumResultQuintet = []
          let sumResultQuintet = this.checkForFifteenQuintet(fullHand)
          console.log('======> fullHand: ', fullHand)
          console.log('****** S U M   T E S T I N G - Q U I N T E T  ')
          console.log(sumResultQuintet)

          //let sumResultQuintet = []
          flushResult = this.checkForFlush(fullHand)
          console.log('======> fullHand: ', fullHand)
          console.log('****** F L U S H   T E S T I N G   ')
          console.log(flushResult)

          runsResult = this.checkForRuns(fullHand)
          console.log('======> fullHand: ', fullHand)
          console.log('******  R U N S    T E S T I N G   ')
          console.log('======> runsResult ', runsResult)
          console.log(runsResult)

          nibsResult = this.checkForNibs(cards, card)
          console.log('======> cards: ', cards)
          console.log('======> card: ', card)
          console.log('======> nibsResult ', nibsResult)
          console.log('******  N I B S   T E S T I N G   ')
          console.log(nibsResult)



          // add all the results of the sums
          fullSumsResult = [...sumResultPairs,  ...sumResultTriplets, ...sumResultQuartets, ...sumResultQuintet]
          totalScore = this.tallyTheScores(pairResults, fullSumsResult, runsResult, nibsResult)

        }
        // // temp // TODO:
        // if (!pairResults) {
        //   pairResults = []
        // }

        const showResultsCheckbox =  <div className='show-results'>
          <input type='checkbox' inline='true' checked={showResults} onClick={() => {this.setState({showResults: !showResults})}}/>
          <div>Show results</div>
        </div>

        if (fullHand.length === 5) {
          displayPairs = <div>{pairResults.map(result =>
          <div  style={{ display: (showResults ? 'block' : 'none') }}>
                <ul>
                <div className='result-row'>
                 <div className='result-image'>{result.result.map(card =>
                   <img className='result-card' src={card.image} key={card.code} alt={card.code}/>
                    )}
                  </div>
                 <div className='result-text'>{result.description} - Points: {result.score}</div>
                 </div>
                 </ul>
          </div>
        )}</div>

        displaySums = <div>{fullSumsResult.map(result =>
          <div style={{ display: (showResults ? 'block' : 'none') }}>
              <ul>
                 <div className='result-row'>
                   <div className='result-image'>{result.map(card =>
                     <img className='result-card' src={card.image} key={card.code} alt={card.code}/>
                     )}
                    </div>
                   <div className='result-text'>Sum to 15 - Points: 2</div>
                 </div>
              </ul>
            </div>
         )}</div>

         displayRuns = <div>{runsResult.map(result =>
           <div style={{ display: (showResults ? 'block' : 'none') }}>
               <ul>
                  <div className='result-row'>
                    <div className='result-image'>{result.map(card =>
                      <img className='result-card' src={card.image} key={card.code} alt={card.code}/>
                      )}
                    </div>
                    <div className='result-text'>Run - Points: {result.length}</div>
                  </div>
               </ul>
             </div>
          )}</div>

          displayNibs = <div>{nibsResult.map(result =>
            <div style={{ display: (showResults ? 'block' : 'none') }}>
                <ul>
                   <div className='result-row'>
                     <div className='result-image'>
                       <img className='result-card' src={result.image} key={result.code} alt={result.code}/>
                     </div>
                     <div className='result-text'>Nibs - Points: 1</div>
                   </div>
                </ul>
              </div>
           )}</div>
         if (flushResult.length > 0) {
             displayFlush = <div style={{ display: (showResults ? 'block' : 'none') }}>
               <ul>
                  <div className='result-row'>
                    <div className='result-image'>{flushResult.map(card =>
                      <img className='result-card' src={card.image} key={card.code} alt={card.code}/>
                      )}
                    </div>
                    <div className='result-text'>Flush - Points: 5</div>
                  </div>
               </ul>
             </div>
           } else {
             displayFlush = <div/>
           }
         }


         if (fullHand.length === 5 ) {
          return <div>
          <div>{showResultsCheckbox}</div>
            <div style={{ display: (showResults ? 'block' : 'none') }}>
              <h3>Result: Score = {totalScore}</h3>
            </div>
            {displayPairs}
            {displaySums}
            {displayRuns}
            {displayFlush}
            {displayNibs}
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
