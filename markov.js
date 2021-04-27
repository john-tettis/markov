/** Textual markov chain generator */
let fs = require('fs');

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
    console.log(this.words)
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain={};
    let words = this.words
    for(let i in  words) {
      let current =`${words[i]} ${words[Number(i)+1]}`;
      let next = words[Number(i)+2];
      if(!next){break}
      if(current in chain){
          chain[current].push(next)
      }
      else{
        chain[current] = [next]
      }
    }
    this.chain = chain
 
  }
  randomWord(words) {
    if(!words){return undefined}
    let word = words[Math.floor(Math.random() * words.length>>0)]
    return word
  }
  randomKey(){
    let keys = Object.keys(this.chain)
    console.log(keys)
    return keys[Math.floor(keys.length*Math.random())]
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let word = this.randomKey()
    
    let sentence =word.split(' ')
    while(sentence.length<numWords){
      let potential = this.chain[word]
      let firstword = this.randomWord(potential)
      if(!firstword){break}
      word = `${sentence[sentence.length-1]} ${firstword}`
      console.log('word:',word)
      sentence.push(firstword)
      
    }
    let complete = sentence.join(' ')
    let i = Number(complete.lastIndexOf('.'))+1
    let q =Number(complete.lastIndexOf('?'))+1
    let e = Number(complete.lastIndexOf('!'))+1
    let b = i>q ? i: q>e ? q: e;
    complete = complete.split(b)
    return complete
    
  }
}
// s

module.exports ={
  MarkovMachine:MarkovMachine
}

