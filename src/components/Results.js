import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { getPairs, getFifteenSums, getFlushes, getNibs, getRuns } from '.././cribbage.js'

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { showResults: true }
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

  // highlight the cards in the hand
  addHighlight(event, cards) {
    let test
    if (cards.result) {
      test = cards.result
    } else {
      test = cards
    }
    for (var i = 0; i < test.length; i++) {
      const elem = document.getElementById(test[i].code)
      if (elem) {
        elem.style.border = "2px solid blue"
        elem.style['border-radius'] = '8px'
      }
    }
  }
  removeHighlight(event, cards) {
    let test
    if (cards.result) {
      test = cards.result
    } else {
      test = cards
    }
    for (var i = 0; i < test.length; i++) {
      const elem = document.getElementById(test[i].code)
      if (elem) {
        elem.style.border = null;
      }
    }
  }

  // tallyTheScores(pairResult, fullSumsResult, runsResult, nibsResult) {
  tallyTheScores(pairResult, sumsResult, runsResult, flushResult, nibsResult) {
    let score = 0
    for (let i = 0; i < pairResult.length; i++) {
      score = score + pairResult[i].score
    }
    for (let i = 0; i < sumsResult.length; i++) {
      score = score + 2
    }
    for (let i = 0; i < runsResult.length; i++) {
      score = score + runsResult[i].length
    }
    if (flushResult.length > 0) {
      score = score + flushResult.length
    }
    if (nibsResult.length > 0) {
      score = score + 1
    }
    return score
  }

  render() {
    let pairResults = []
    const { cards } = this.props

    let displayPairs, displaySums, displayRuns, displayFlush, displayNibs
    let showResults = this.state.showResults
    let sumsResult, flushResult, runsResult, nibsResult
    let fullHand = [...cards]
    let totalScore = 0

    if (fullHand.length === 5) {
      sumsResult = getFifteenSums(fullHand)
      console.log('******  S U M   R E S U L T S')
      console.log(sumsResult)

      runsResult = getRuns(fullHand)
      console.log('******  R U N S  R E S U L T S')
      console.log('======> runsResult ', runsResult)
      console.log(runsResult)

      pairResults = getPairs(fullHand)
      console.log('****** P A I R   R E S U L T S')
      console.log(pairResults)

      flushResult = getFlushes(fullHand)
      console.log('****** F L U S H   R E S U L T S')
      console.log(flushResult)

      nibsResult = getNibs(cards)
      console.log('******  N I B S   R E S U L T S')
      console.log('======> nibsResult ', nibsResult)
      console.log(nibsResult)

      // add all the results of the sums
      totalScore = this.tallyTheScores(pairResults, sumsResult, runsResult, flushResult, nibsResult)

    }

    const showResultsCheckbox = <div className='show-results'>
      <input type='checkbox' inline='true' checked={showResults} onClick={() => { this.setState({ showResults: !showResults }) }} />
      <div>Show results</div>
    </div>

    // Only show results if the full hand has been dealt
    if (fullHand.length === 5) {
      displayPairs = <div>{pairResults.map(result =>
        <div style={{ display: (showResults ? 'block' : 'none') }}>
          <section className='cribbage-results' onMouseOver={(e) => this.addHighlight(e, result)} onMouseOut={(e) => this.removeHighlight(e, result)}>
            <div className='card-result'>{result.result.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span>{result.description} - Points: {result.score}</span></div>
          </section>

        </div>
      )}</div>

      displaySums = <div>{sumsResult.map(result =>
        <div style={{ display: (showResults ? 'block' : 'none') }}>
          <section className='cribbage-results' onMouseOver={(e) => this.addHighlight(e, result)} onMouseOut={(e) => this.removeHighlight(e, result)}>
            <div className='card-result'>{result.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span>Sum to 15 - Points: 2</span></div>
          </section>
        </div>
      )}</div>

      displayRuns = <div>{runsResult.map(result =>
        <div style={{ display: (showResults ? 'block' : 'none') }}>
          <section className='cribbage-results' onMouseOver={(e) => this.addHighlight(e, result)} onMouseOut={(e) => this.removeHighlight(e, result)}>
            <div className='card-result'>{result.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span>Run - Points: {result.length}</span></div>
          </section>
        </div>
      )}</div>

      if (nibsResult.length > 0) {
        displayNibs = <div style={{ display: (showResults ? 'block' : 'none') }}>
          <section className='cribbage-results' onMouseOver={(e) => this.addHighlight(e, nibsResult)} onMouseOut={(e) => this.removeHighlight(e, nibsResult)}>
            <div className='card-result'>{nibsResult.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span>Nibs - Points: 1</span></div>
          </section>
        </div>
      }
      if (flushResult.length > 0) {
        displayFlush = <div style={{ display: (showResults ? 'block' : 'none') }}>
          <section className='cribbage-results' onMouseOver={(e) => this.addHighlight(e, flushResult)} onMouseOut={(e) => this.removeHighlight(e, flushResult)}>
            <div className='card-result'>{flushResult.map(card =>
              <img className='result-card' src={card.image} key={card.code} alt={card.code} />
            )}
            </div>
            <div className='cribbage-points'><span>Flush - Points: {flushResult.length}</span></div>
          </section>
        </div>
      } else {
        displayFlush = <div />
      }
    }

    if (fullHand.length === 5) {
      return <div>
        <div>{showResultsCheckbox}</div>
        <div style={{ display: (showResults ? 'block' : 'none') }}>
          <h3>Score = {totalScore}</h3>
        </div>
        {displaySums}
        {displayRuns}
        {displayPairs}
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

Results.proptypes = {
  cards: PropTypes.array.isReqired,
  card: PropTypes.object.isReqired
}

export default Results
