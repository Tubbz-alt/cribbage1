import React, { Component } from 'react';

class Results extends Component {
  render() {
        const { cards, card } = this.props;
        console.log('RESULTS11111: cards', cards)
        console.log('RESULTS11111: props', card)
        console.log('RESULTS11111: props',this.props)
        // preliminary test Code to show full hand
        let test = [...cards]
        test.push(card)
        console.log('RESULTS22222: ', test)

        let results = [[test[0], test[1]],[test[2],test[3], test[4]]]
        console.log('RESULTS22222: ', results)

        const resultsImages = cards.map(card => {
          return <img className='hand' src={card.image} key={card.code} height="114" width="81"/>
        })


        return (
        <div>
          <button>Show Results</button>
          <div>
          <div>{resultsImages}</div>
          </div>
        </div>
        )
    }
}

export default Results
