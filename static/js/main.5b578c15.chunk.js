(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},17:function(e,t,a){e.exports=a(32)},32:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(16),s=a.n(c),l=a(1),i=a(3),o=a(4),u=a(7),d=a(5),m=a(6),h=a(2),v=a(8),g=a.n(v),f=function(e){var t=e.cards,a=e.buttonText,n=e.cardsLeft,c=[];return c=t.length>0?t.map(function(e,t){return 4!==t?r.a.createElement("img",{className:"card",src:e.image,key:e.code,id:e.code,alt:e.code}):r.a.createElement("img",{className:"c-card",src:e.image,key:e.code,id:e.code,alt:e.code})}):r.a.createElement("div",{className:"cribbage-section"},r.a.createElement("img",{className:"card",src:"./card_back.jpg",alt:"1"}),r.a.createElement("img",{className:"card",src:"./card_back.jpg",alt:"2"}),r.a.createElement("img",{className:"card",src:"./card_back.jpg",alt:"3"}),r.a.createElement("img",{className:"card",src:"./card_back.jpg",alt:"4"}),r.a.createElement("img",{className:"c-card",src:"./card_back.jpg",alt:"5"})),r.a.createElement("div",{className:"cribbage-parent"},r.a.createElement("header",{className:"cribbage-header"},r.a.createElement("button",{className:"cribbage-button",onClick:function(){return e.getHand()}},a),r.a.createElement("button",{className:"cribbage-button",onClick:function(){return e.sortHand()}},"Sort cards")),r.a.createElement("div",null,r.a.createElement("p",{className:"cribbage-text"},"Cards remaining in deck: ",n)),r.a.createElement("section",null,r.a.createElement("div",null,c)))},p=[[0,1,2],[0,1,3],[1,2,3],[0,1,4],[0,2,4],[1,2,4],[0,3,4],[1,3,4],[2,3,4],[0,2,3]],E=[[0,1,2,3],[0,1,2,4],[0,1,3,4],[0,2,3,4],[1,2,3,4]];function b(e){return e.map(function(e){return e.value}).map(function(e){return e=isNaN(e)?"ACE"===e?1:10:parseInt(e,10)})}function k(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,a=[],n=0;n<e.length;n++)for(var r=n+1;r<e.length;r++)e[n]+e[r]===t&&a.push([n,r]);return a}function N(e,t){for(var a=!0,n=0;n<t.length-1;n++){1!==e[t[n+1]].val-e[t[n]].val&&(a=!1)}return a}function C(e,t){for(var a=0,n=0;n<e.length;n++)e[n]===t&&a++;return a}function y(e){var t=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,a=k(b(e),t),n=[],r=0;r<a.length;r++)n.push([e[a[r][0]],e[a[r][1]]]);return n}(e,15),a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,a=b(e),n=t-a[0];a.shift();for(var r=[],c=1;c<a.length+2;c++){for(var s=k(a,n),l=0;l<s.length;l++){var i=[e[c-1]];i.push(e[s[l][0]+c]),i.push(e[s[l][1]+c]),r.push(i)}n=t-a[0],a.shift()}return r}(e,15),n=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,a=[],n=b(e),r=0;r<n.length;r++){var c=n[0]+n[1]+n[2]+n[3]+n[4]-n[r];if(c===t){var s=Object(l.a)(e);s.splice(r,1),a.push(s)}}return a}(e,15),r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:15,a=[],n=b(e);n[0]+n[1]+n[2]+n[3]+n[4]===t&&a.push(e);return a}(e,15);return[].concat(Object(l.a)(t),Object(l.a)(a),Object(l.a)(n),Object(l.a)(r))}function H(e){for(var t=function(e){for(var t=Object(l.a)(e),a=0;a<e.length;a++)switch(t[a].value){case"ACE":t[a].val=1;break;case"JACK":t[a].val=11;break;case"QUEEN":t[a].val=12;break;case"KING":t[a].val=13;break;default:t[a].val=parseInt(t[a].value,10)}return t.sort(function(e,t){return e.val-t.val}),t}(e),a=[],n=!0,r=0;r<4;r++)if(t[r+1].val-t[r].val!==1){n=!1;break}var c=!1;if(!n)for(var s=0;s<E.length;s++)N(t,E[s])&&(a.push([t[E[s][0]],t[E[s][1]],t[E[s][2]],t[E[s][3]]]),c=!0);if(!c&&!n)for(var i=0;i<p.length;i++)N(t,p[i])&&a.push([t[p[i][0]],t[p[i][1]],t[p[i][2]]]);return n?[t]:a}var O=a(28),j=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={showResults:!1},a.patternsOfThree=[[0,1,2],[0,1,3],[1,2,3],[0,1,4],[0,2,4],[1,2,4],[0,3,4],[1,3,4],[2,3,4],[0,2,3]],a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"addHighlight",value:function(e){for(var t=e.result?e.result:e,a=0;a<t.length;a++){var n=document.getElementById(t[a].code);n&&(n.style.border="3px solid blue",n.style["border-radius"]="8px")}}},{key:"removeHighlight",value:function(e){for(var t=e.result?e.result:e,a=0;a<t.length;a++){var n=document.getElementById(t[a].code);n&&(n.style.border=null)}}},{key:"tallyTheScores",value:function(e,t,a,n,r){for(var c=0,s=0;s<e.length;s++)c+=e[s].score;for(var l=0;l<t.length;l++)c+=2;for(var i=0;i<a.length;i++)c+=a[i].length;return n.length>0&&(c+=n.length),r.length>0&&(c+=1),c}},{key:"render",value:function(){var e,t,a,n,c,s,i,o,u,d=this,m=[],h=this.props.cards,v=this.state.showResults,g=Object(l.a)(h),f=0;5===g.length&&(s=y(g),o=H(g),m=function(e){for(var t=function(e){var t=[];return e.map(function(e){return t.push(e.value)}),t}(e),a=new Set(t),n=Object(l.a)(a),r=[],c=0;c<n.length;c++){var s=[];if(C(t,n[c])>1){for(var i=0;i<t.length;i++)n[c]===t[i]&&s.push(e[i]);var o={};o.result=s;var u=s.length;2===u?(o.description="Pair",o.score=2):3===u?(o.description="Three of a kind",o.score=6):4===u&&(o.description="Four of a kind",o.score=12),r.push(o)}}return r}(g),i=function(e){var t=Object(l.a)(e),a=function(e){return e.every(function(t){return t.suit===e[0].suit})},n=a(t);return n?t:(t.pop(),(n=a(t))?t:[])}(g),u=function(e){for(var t=e[4].suit,a=[],n=0;n<e.length-1;n++)"JACK"===e[n].value&&e[n].suit===t&&(a.push(e[n]),a.push(e[4]));return a}(h),f=this.tallyTheScores(m,s,o,i,u));var p=r.a.createElement("div",{className:"show-results"},r.a.createElement("label",{className:"cribbage-checkbox"},r.a.createElement("input",{type:"checkbox",inline:"true",checked:v,onChange:function(){d.setState({showResults:!v})}}),v?"Hide results":"Show results"));return 5===g.length&&(e=r.a.createElement("div",null,m.map(function(e){return r.a.createElement("div",{key:O()},r.a.createElement("section",{className:"cribbage-results",onMouseOver:function(){return d.addHighlight(e)},onMouseOut:function(){return d.removeHighlight(e)}},r.a.createElement("div",{className:"card-result"},e.result.map(function(e){return r.a.createElement("img",{className:"result-card",src:e.image,key:e.code,alt:e.code})})),r.a.createElement("div",{className:"cribbage-points"},r.a.createElement("span",null,e.description," - Points: ",e.score))))})),t=r.a.createElement("div",null,s.map(function(e){return r.a.createElement("div",{key:O()},r.a.createElement("section",{className:"cribbage-results",onMouseOver:function(){return d.addHighlight(e)},onMouseOut:function(){return d.removeHighlight(e)}},r.a.createElement("div",{className:"card-result"},e.map(function(e){return r.a.createElement("img",{className:"result-card",src:e.image,key:e.code,alt:e.code})})),r.a.createElement("div",{className:"cribbage-points"},r.a.createElement("span",null,"Sum to 15 - Points: 2"))))})),a=r.a.createElement("div",null,o.map(function(e){return r.a.createElement("div",{key:O()},r.a.createElement("section",{className:"cribbage-results",onMouseOver:function(){return d.addHighlight(e)},onMouseOut:function(){return d.removeHighlight(e)}},r.a.createElement("div",{className:"card-result"},e.map(function(e){return r.a.createElement("img",{className:"result-card",src:e.image,key:e.code,alt:e.code})})),r.a.createElement("div",{className:"cribbage-points"},r.a.createElement("span",null,"Run - Points: ",e.length))))})),u.length>0&&(c=r.a.createElement("div",null,r.a.createElement("section",{className:"cribbage-results",onMouseOver:function(){return d.addHighlight(u)},onMouseOut:function(){return d.removeHighlight(u)}},r.a.createElement("div",{className:"card-result"},u.map(function(e){return r.a.createElement("img",{className:"result-card",src:e.image,key:e.code,alt:e.code})})),r.a.createElement("div",{className:"cribbage-points"},r.a.createElement("span",null,"Nibs - Points: 1"))))),n=i.length>0?r.a.createElement("div",null,r.a.createElement("section",{className:"cribbage-results",onMouseOver:function(){return d.addHighlight(i)},onMouseOut:function(){return d.removeHighlight(i)}},r.a.createElement("div",{className:"card-result"},i.map(function(e){return r.a.createElement("img",{className:"result-card",src:e.image,key:e.code,alt:e.code})})),r.a.createElement("div",{className:"cribbage-points"},r.a.createElement("span",null,"Flush - Points: ",i.length)))):r.a.createElement("div",null)),5===g.length?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,p),r.a.createElement("div",{style:{display:v?"block":"none"}},r.a.createElement("h3",{className:"cribbage-text"},"Score = ",f),t,a,e,n,c)):r.a.createElement("div",null,p,r.a.createElement("div",null,"Nothing to display"))}}]),t}(n.Component),w=(a(15),function(e){var t=function(t){t.preventDefault(),e.onCustomHandChange(t.target.name,t.target.value)},a=function(e,a){return r.a.createElement("div",{className:"the-cards"},r.a.createElement("select",{className:"custom-select",value:a,name:e,onChange:t},r.a.createElement("option",{value:"ACE"},"Ace"),r.a.createElement("option",{value:"2"},"Two"),r.a.createElement("option",{value:"3"},"Three"),r.a.createElement("option",{value:"4"},"Four"),r.a.createElement("option",{value:"5"},"Five"),r.a.createElement("option",{value:"6"},"Six"),r.a.createElement("option",{value:"7"},"Seven"),r.a.createElement("option",{value:"8"},"Eight"),r.a.createElement("option",{value:"9"},"Nine"),r.a.createElement("option",{value:"10"},"Ten"),r.a.createElement("option",{value:"JACK"},"Jack"),r.a.createElement("option",{value:"QUEEN"},"Queen"),r.a.createElement("option",{value:"KING"},"King")))},n=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"SPADES";return r.a.createElement("div",{className:"the-suits"},r.a.createElement("select",{className:"custom-select",value:a,name:e,onChange:t},r.a.createElement("option",{value:"HEARTS"},"Hearts"),r.a.createElement("option",{value:"DIAMONDS"},"Diamonds"),r.a.createElement("option",{value:"SPADES"},"Spades"),r.a.createElement("option",{value:"CLUBS"},"Clubs")))},c=r.a.createElement("div",{className:"show-results"},r.a.createElement("label",{className:"cribbage-checkbox"}," ",r.a.createElement("input",{type:"checkbox",inline:"true",checked:e.showCustomHand,onChange:e.setShowCustomHand}),"Modify your cards"));return 5===e.cards.length?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,c),r.a.createElement("div",{style:{display:e.showCustomHand?"block":"none"}},r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.setShowCustomHand(!1)}},r.a.createElement("div",{id:"card-options"},r.a.createElement("div",{className:"card-option"},a("card1",e.cards[0].value),n("suit1",e.cards[0].suit)),r.a.createElement("div",{className:"card-option"},a("card2",e.cards[1].value),n("suit2",e.cards[1].suit)),r.a.createElement("div",{className:"card-option"},a("card3",e.cards[2].value),n("suit3",e.cards[2].suit)),r.a.createElement("div",{className:"card-option"},a("card4",e.cards[3].value),n("suit4",e.cards[3].suit)),r.a.createElement("div",{className:"card-option"},a("card5",e.cards[4].value),n("suit5",e.cards[4].suit)))))):null}),S=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).codeMap={ACE:"A",2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:0,JACK:"J",QUEEN:"Q",KING:"K"},a.getHand=a.getHand.bind(Object(h.a)(Object(h.a)(a))),a.sortHand=a.sortHand.bind(Object(h.a)(Object(h.a)(a))),a.setShowCustomHand=a.setShowCustomHand.bind(Object(h.a)(Object(h.a)(a))),a.onCustomHandChange=a.onCustomHandChange.bind(Object(h.a)(Object(h.a)(a))),a.state={deck:[],hand:[],customHand:[],cardsLeft:52,showCustomHand:!1},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentWillUnmount",value:function(){}},{key:"componentDidMount",value:function(){var e=this;fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then(function(e){return e.json()}).then(function(t){e.setState({deck_id:t.deck_id,cardsLeft:t.remaining})})}},{key:"getHand",value:function(){var e,t=this;this.state.cardsLeft<5?(g()("New deck","There are not enough cards left in the deck. Now using new deck","info"),e="https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",fetch(e).then(function(e){return e.json()}).then(function(a){t.setState({deck_id:a.deck_id,cardsLeft:a.remaining}),e="https://deckofcardsapi.com/api/deck/"+a.deck_id+"/draw/?count=5"}).then(function(){fetch(e).then(function(e){return e.json()}).then(function(e){t.setState({hand:e.cards,cardsLeft:e.remaining})})})):(e="https://deckofcardsapi.com/api/deck/"+this.state.deck_id+"/draw/?count=5",fetch(e).then(function(e){return e.json()}).then(function(e){t.setState({hand:e.cards,cardsLeft:e.remaining})}))}},{key:"compareCardValues",value:function(e,t){var a=0;return e.val>t.val?a=1:e.val<t.val&&(a=-1),a}},{key:"sortHand",value:function(){var e=Object(l.a)(this.state.hand);e.sort(this.compareCardValues),this.setState({hand:e})}},{key:"setShowCustomHand",value:function(){var e=this.state.showCustomHand;this.setState({showCustomHand:!e})}},{key:"getCode",value:function(e,t){return"".concat(this.codeMap[e]).concat(t.charAt(0))}},{key:"alreadyExists",value:function(e,t,a){var n;if("card"===a){var r=this.state.hand[e].suit;n=this.getCode(t,r)}if("suit"===a){var c=this.state.hand[e].value;n=this.getCode(c,t)}for(var s=0;s<this.state.hand.length;s++)if(this.state.hand[s].code===n)return!0;return!1}},{key:"changeCard",value:function(e,t){e.value=t;var a=this.getCode(t,e.suit);e.code=a;var n="https://deckofcardsapi.com/static/img/".concat(a,".png");return e.image=n,e}},{key:"changeSuit",value:function(e,t){e.suit=t;var a=this.getCode(e.value,t);e.code=a;var n="https://deckofcardsapi.com/static/img/".concat(a,".png");return e.image=n,e}},{key:"onCustomHandChange",value:function(e,t){var a,n=e.charAt(e.length-1)-1,r=Object(l.a)(this.state.hand),c=r[n],s=e.slice(0,4);if("card"===s){if(this.alreadyExists(n,t,s))return void g()("Oops!","You cannot have two identical cards in a hand.","warning");a=this.changeCard(c,t)}else if("suit"===s){if(this.alreadyExists(n,t,s))return void g()("Oops","You cannot have two identical cards in a hand.","warning");a=this.changeSuit(c,t)}r[n]=a,this.setState({hand:r})}},{key:"render",value:function(){var e,t=this.state.cardsLeft,a=this.state.showCustomHand,n=this.setShowCustomHand,c=this.onCustomHandChange;e=this.state.hand?this.state.hand:[];var s="";return s=52===t?"Let's play":"Get new cards",r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"cribbage-text"},"Cribbage Hand Practice Tool"),r.a.createElement("p",null,"Practice your point counting skills."),r.a.createElement("div",{className:"result-row"},r.a.createElement(r.a.Fragment,null,r.a.createElement(f,{getHand:this.getHand,sortHand:this.sortHand,cardsLeft:t,cards:e,buttonText:s}))),r.a.createElement(w,{cards:e,showCustomHand:a,setShowCustomHand:n,onCustomHandChange:c}),r.a.createElement(j,{cards:e}))}}]),t}(n.Component);s.a.render(r.a.createElement(S,null),document.getElementById("root"))}},[[17,2,1]]]);
//# sourceMappingURL=main.5b578c15.chunk.js.map