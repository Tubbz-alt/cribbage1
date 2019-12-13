
// all 10 combinations that a run of three can have
const patternsOfThree = [
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

// all 4 combinations that a run of 4 can have
const patternsOfFour = [
  [0,1,2,3],
  [0,1,2,4],
  [0,1,3,4],
  [0,2,3,4],
  [1,2,3,4]
]

function convertToIntegers(cards) {
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
  function sortCards(cards) {
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
function twoSum(arr, target) {
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
function convertToChars(cards) {
  let charArray = []
  cards.map(function (card) {
    return charArray.push(card.value)
  })
  return charArray
}

// strip the cards array down to a simple array of suits
function convertToSuits(cards) {
  let suitsArray = []
  cards.map(function (card) {
    return suitsArray.push(card.suit)
  })
  return suitsArray
}

// checks for a run in a given array of cards
function findRun(hand, toCheck, runLength) {
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
  function countOcurrences(arr, c) {
    let count = 0
    for (let i=0; i<arr.length; i++) {
      if (arr[i] === c) {
        count++
      }
    }
    return count
  }
  // gets pairs, triplets and quartets of cards in a hand
  export function getPairs(fullHand) {
    //debugger
    // reduce the array to an array of chars
    let charArray = convertToChars(fullHand)
    // creating aset removes duplicates.
    const uniqueSet = new Set(charArray)
    // turn set back to array so that we have an
    // array of unique values in the hand
    const uniqueValues = [...uniqueSet]
    let finalResult = []
    // looping through 3 values - a, j and 3
    for (let i=0; i<uniqueValues.length; i++) {
      let result = []
      let occurences = countOcurrences(charArray, uniqueValues[i])
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
  export function checkForFifteenPairs(cardHand, target=15) {
    // debugger
    let hand = convertToIntegers(cardHand)
    let result = twoSum(hand,target)
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
  export function checkForFifteenTriplets(cardHand, target=15) {
    let hand = convertToIntegers(cardHand)
    let pairTarget = target - hand[0]
    hand.shift()
    let start = 0;
    // let intermediateResult = []
    let triplets = []
    for (let j=start+1; j< hand.length+2; j++) {
      let result = twoSum(hand,pairTarget)
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
  export function checkForFifteenQuartets(cardHand, target=15) {
    let finalResult = []
    let hand = convertToIntegers(cardHand)
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
  export function checkForFifteenQuintet(cardHand, target=15) {
    let finalResult = []
    let hand = convertToIntegers(cardHand)
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
   export function checkForFlush(cardHand) {
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

   export function // checks if the hand as a Jack that matches the suit of the community card
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

   export function  /**
     * Returns sets of three, four or five cards that are sequential ie; a run
     * @param {string[]} cardHand - Array of cardes
     * @return {Array<Array<Card>>} Array of Cards representing a run
     *
     */
     checkForRuns(cardHand) {
       let sortedCards = sortCards(cardHand)
       let runsResult = []

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
           if (findRun(sortedCards, patternsOfFour[i], 4)) {
             runsResult.push([sortedCards[patternsOfFour[i][0]], sortedCards[patternsOfFour[i][1]], sortedCards[patternsOfFour[i][2]], sortedCards[patternsOfFour[i][3]]])
             runOf4Found = true
           }
         }
       }
       // now look for runs of 3 using the the 9 possible combos of 3 runs if there were no runs of 4
     let runOf3Found = false
     if (!runOf4Found) {
       for (let i=0; i< patternsOfThree.length; i++) {
         if (findRun(sortedCards, patternsOfThree[i], 3)) {
           runsResult.push([sortedCards[patternsOfThree[i][0]], sortedCards[patternsOfThree[i][1]], sortedCards[patternsOfThree[i][2]]])
           runsResult.description='fred'
           runsResult.score = 3
           runOf3Found = true
         }
       }
     }
       return runsResult
     }
