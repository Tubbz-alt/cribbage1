(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(23)},21:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(11),s=n.n(o),r=n(2),i=n(3),d=n(5),l=n(4),u=n(6),h=n(1),p=function(e){function t(){return Object(r.a)(this,t),Object(d.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.deck_id;this.props.getCards;console.log("Monday1a",this.props);var n=this.props.card.code,a=this.props.card.image;return console.log("Monday1b",n),console.log("Monday1c",a),c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){return e.props.getCards({deck_id:t})}},"Get Cards"),c.a.createElement("p",null,"This will become the card hands: ",t),c.a.createElement("p",null,"This the first card: ",n),c.a.createElement("img",{src:a}))}}]),t}(a.Component),k=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(d.a)(this,Object(l.a)(t).call(this,e))).state={deck:[]},n.getCards=n.getCards.bind(Object(h.a)(Object(h.a)(n))),n}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("Look at me. I mounted!!");fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(function(e){return e.json()}).then(function(t){console.log("STATE1111",e.state),console.log("BBBBBBB ",t),e.setState({deck:t})})}},{key:"getCards",value:function(e){var t=this;console.log("I am getting cards for the deck: ",e.deck_id);var n="https://deckofcardsapi.com/api/deck/"+e.deck_id+"/draw/?count=1";fetch(n).then(function(e){return e.json()}).then(function(e){console.log("STATE2222",t.state),console.log("FFFFFFFFF ",e),console.log("DDDDDDD ",e.cards[0]),t.setState({hand:e.cards})})}},{key:"render",value:function(){var e,t=this.state.deck.deck_id;this.state.deck.deck;return e=this.state.hand?this.state.hand[0]:{},c.a.createElement("div",{className:"container"},c.a.createElement("h1",null,"Cribbage Hand Tester"),c.a.createElement("p",null,"Guess how many points this hand is worth."),c.a.createElement(p,{deck_id:t,getCards:this.getCards,card:e}))}}]),t}(a.Component);n(21);s.a.render(c.a.createElement(k,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.d3b7da78.chunk.js.map