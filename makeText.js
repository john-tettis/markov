let {MarkovMachine} = require('./markov')
let fs = require('fs')
let axios = require('axios')


let arguments = process.argv;
arguments.shift()
arguments.shift()

if(arguments[0]=='file'){
    let path = arguments[1]
    fs.readFile(path,'utf8',(err,data) =>{
        if(err){
            throw err
        }
        else{
            console.log(data)
            let markov = new MarkovMachine(data)

            console.log('Generated text from source:',path)
            console.log('----------------------------------------')
            console.log(markov.makeText())
        }
    })

}
else if(arguments[0]=='url'){
    let path = arguments[1]
    axios.get(path).then((response)=>{
        let markov = new MarkovMachine(response.data)
        console.log('Generated text from source:',path)
        console.log('----------------------------------------')
        console.log(markov.makeText())
    })

}
else{
    console.log('invalid read type:', arguments[0])
}
