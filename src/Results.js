import React, { Component } from 'react';
import {getPairs, checkForFifteenPairs, checkForFifteenTriplets, checkForFifteenQuartets, checkForFifteenQuintet, checkForFlush, checkForNibs, checkForRuns} from './cribbage.js'

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {showResults: true}
    // this.personName = 'Fred'
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
          pairResults = getPairs(fullHand)
          console.log('======> fullHand: ', fullHand)
          console.log('****** P A I R  T E S T I N G')
          console.log(pairResults)

          // T H I S   I S  T H E   P R O B L E M
          //let sumResultPairs = []
          let sumResultPairs = checkForFifteenPairs(fullHand)
          console.log('****** S U M   T E S T I N G - P A I R S ')
          console.log(sumResultPairs)

          let sumResultTriplets = checkForFifteenTriplets(fullHand)
          console.log('****** S U M   T E S T I N G - T R I P L E T S  ')
          console.log(sumResultTriplets)

          // let sumResultQuartets = []
          let sumResultQuartets = checkForFifteenQuartets(fullHand)
          console.log('****** S U M   T E S T I N G - Q U A R T E T S  ')
          console.log(sumResultQuartets)

          //let sumResultQuintet = []
          let sumResultQuintet = checkForFifteenQuintet(fullHand)
          console.log('****** S U M   T E S T I N G - Q U I N T E T  ')
          console.log(sumResultQuintet)

          //let sumResultQuintet = []
          flushResult = checkForFlush(fullHand)
          console.log('****** F L U S H   T E S T I N G   ')
          console.log(flushResult)

          runsResult = checkForRuns(fullHand)
          console.log('******  R U N S    T E S T I N G   ')
          console.log('======> runsResult ', runsResult)
          console.log(runsResult)

          nibsResult = checkForNibs(cards, card)
          console.log('======> cards: ', cards)
          console.log('======> card: ', card)
          console.log('======> nibsResult ', nibsResult)
          console.log('******  N I B S   T E S T I N G   ')
          console.log(nibsResult)

          // add all the results of the sums
          fullSumsResult = [...sumResultPairs,  ...sumResultTriplets, ...sumResultQuartets, ...sumResultQuintet]
          totalScore = this.tallyTheScores(pairResults, fullSumsResult, runsResult, nibsResult)

        }

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
