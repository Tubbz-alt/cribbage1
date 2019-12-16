import { getPairs, getFifteenSums } from '../cribbage.js'
// sample cards used in tests
const cardQC = {
  code: 'QC',
  suit: 'CLUBS',
  value: 'QUEEN'
}
const cardQS = {
  code: 'QS',
  suit: 'SPADES',
  value: 'QUEEN'
}
const card8D = {
  code: '8D',
  suit: 'DIAMONDS',
  value: '8'
}
const card8H = {
  code: '8H',
  suit: 'HEARTS',
  value: '8'
}
const card7D = {
  code: '7D',
  suit: 'DIAMONDS',
  value: '7'
}
const card7H = {
  code: '7H',
  suit: 'HEARTS',
  value: '7'
}
const card6S = {
  code: '6S',
  suit: 'SPADES',
  value: '6'
}
const card4H = {
  code: '4H',
  suit: 'HEARTS',
  value: '4'
}
const card3H = {
  code: '3H',
  suit: 'HEARTS',
  value: '3'
}
const cardQH = {
  code: 'QH',
  suit: 'HEARTS',
  value: 'QUEEN'
}
const cardQD = {
  code: 'QD',
  suit: 'DIAMONDS',
  value: 'QUEEN'
}
const cardKC = {
  code: 'KC',
  suit: 'CLUBS',
  value: 'KING'
}
const cardKH = {
  code: 'KH',
  suit: 'HEARTS',
  value: 'KING'
}
const cardAC = {
  code: 'AC',
  suit: 'CLUBS',
  value: 'ACE'
}
const cardAS = {
  code: 'AS',
  suit: 'SPADES',
  value: 'ACE'
}

describe("Function getPairs()", () => {
  test("it should return a single pair", () => {
    const result = [
      { description: 'Pair', result: [cardQC, cardQS], score: 2 }]
    const hand = [cardQC, cardQS, card7H, cardKH, card8D]
    expect(getPairs(hand)).toEqual(result)
  })
  test("it should return a single pair of Aces", () => {
    const result = [
      { description: 'Pair', result: [cardAC, cardAS], score: 2 }]
    const hand = [cardAC, cardQS, cardAS, cardKH, card8D]
    expect(getPairs(hand)).toEqual(result)
  })
  test("it should return two pairs", () => {
    const result = [
      { description: 'Pair', result: [cardQC, cardQS], score: 2 },
      { description: 'Pair', result: [cardKC, cardKH], score: 2 }
    ]
    const hand = [cardQC, cardQS, card7H, cardKC, cardKH]
    expect(getPairs(hand)).toEqual(result)
  })
  test("it should return three of a kind", () => {
    const result = [
      { description: 'Three of a kind', result: [cardQC, cardQS, cardQH], score: 6 }]
    const hand = [cardQC, cardQS, cardQH, cardKH, card8D]
    expect(getPairs(hand)).toEqual(result)
  })
  test("it should return four of a kind", () => {
    const result = [
      { description: 'Four of a kind', result: [cardQC, cardQS, cardQH, cardQD], score: 12 }]
    const hand = [cardQC, cardQS, cardQH, cardKH, cardQD]
    expect(getPairs(hand)).toEqual(result)
  })
})

describe("Function getFifteenSums()", () => {
  test("it should return four results of pairs that sum to 15", () => {
    const result = [
      [card8D, card7D],
      [card8D, card7H],
      [card8H, card7D],
      [card8H, card7H],
    ]
    const hand = [card8D, card8H, card7D, cardKH, card7H]
    expect(getFifteenSums(hand)).toEqual(result)
  })
  test("it should return two results of 3 cards that sum to 15", () => {
    const result = [
      [card4H, cardAC, cardKH],
      [card4H, cardAC, cardQH]
    ]
    const hand = [card4H, cardAC, card7D, cardKH, cardQH]
    expect(getFifteenSums(hand)).toEqual(result)
  })
  test("it should return two results of 4 cards that sum to 15", () => {
    const result = [
      [card3H, cardAC, cardAS, cardQH],
      [card3H, cardAC, cardAS, cardKH]
    ]
    const hand = [card3H, cardAC, cardAS, cardKH, cardQH]
    expect(getFifteenSums(hand)).toEqual(result)
  })
  test("it should return one result of 5 cards that sum to 15", () => {
    const result = [
      [card3H, cardAC, cardAS, card4H, card6S]
    ]
    const hand = [card3H, cardAC, cardAS, card4H, card6S]
    expect(getFifteenSums(hand)).toEqual(result)
  })
})
