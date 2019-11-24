const ApiService = require('./../services//api.service.js');
const readline = require('readline');
const {permutations} = require('./../utils/index');
let _word;
let _synonym=[];

const _ ={

    processInput :async (dict,command,word="",debug=true) =>{
        switch(command){
            case 'defn': {
                try{
                    let definitions = await ApiService().getDefinitions(word)
                    definitions = Object.values(definitions).map(e=>e.text);
                     if(debug) console.log(definitions);
                    return definitions;
                }catch(err){
                    console.log("No Definitions Found For Your Word!!!");
                }
            }
            break;
            case 'syn':{
                try{
                    let res = await ApiService().getRelatedWords(word);
                    res = res.filter(e=>e.relationshipType === 'synonym').map(e=>{if(debug)console.log(e.words); return e.words})
                    return res;
                }catch(err){console.log("No Synonyms Found For Your Word!!!")};
                
                break;
            }
            case 'ant': {
                try{
                    let res = await ApiService().getRelatedWords(word);
                    res = res.filter(e=>e.relationshipType === 'antonym').map(e=>{if(debug)console.log(e.words); return e.words})
                    return res;
                }catch(err){console.log("No Antonyms Found For Your Word!!!")};
                break;
            }
            case 'ex': ApiService().getExamples(word).then(res=>console.table(res.examples)).catch(err=>{console.log("No Examples Found For Your Word!!!")}); break;
            case '':{
                ApiService().getRandomWords().then(({word})=>{
                    ApiService().getDefinitions(word).then(res=>console.log(res)).catch(err=>{console.log("No Definitions Found For Your Word!!!")});
                    ApiService().getRelatedWords(word).then(res=>console.log(res)).catch(err=>{console.log("No Synonyms/Antonyms Found For Your Word!!!")});
                    ApiService().getExamples(word).then(res=>console.log(res.examples)).catch(err=>{console.log("No Examples Found For Your Word!!!")});
                }).catch(err=>{console.log("No RandomWords Found For Your Word!!!")});
                
                break;
            }
               
            case 'play':{
                if(word === "1") {console.log("You Opted For Try Again");return;}
                if(word === "2") {console.log("You Opted For Hint");
                    
                    let flag = true;
                    while(flag){
                        const hint = Math.floor((Math.random()*100)%4);
                        switch(hint){
                            case 0: {
                                const words = permutations(_word.word).slice(1);
                                if(words.length == 0 ) break;
                                console.log("Here is a Jumbled Word!!!");
                                flag =false;
                                console.log(words[Math.floor((Math.random()*1000000)%words.length)]);break
                            };
                            case 1:{
                                const defs = await _.processInput("",'defn',_word.word,false);
                                if(defs.length == 0 ) break;
                                flag =false;
                                console.log("Here is a Usage for the Word!!!");
                                console.log(defs[Math.floor((Math.random()*1000000)%defs.length)]);break
                            };
                            case 2:{
                                let ant = await _.processInput("",'ant',_word.word,false);
                                ant = ant[0];
                                if(ant.length == 0 ) break;
                                flag =false;
                                console.log("Here is a Antonym Word!!!");
                                console.log(ant[Math.floor((Math.random()*1000000)%ant.length)]);break
                            }
                            case 3:{
                                {
                                    let syn = await _.processInput("",'syn',_word.word,false);
                                    syn =syn[0];
                                    if(syn.length == 0 ) break;
                                    flag =false;
                                    console.log("Here is a Synonym Word!!!");
                                    console.log(syn[Math.floor((Math.random()*1000000)%syn.length)]);break
                                }
                            }
                            default:break;
                        }
                    }
                    
                    return;
                }
                if(word === "3") {
                    console.log("You Opted For Quit");
                    console.log("The Word Is:::",_word.word);
                    _.processInput("./dict",_word.word,"");
                    return;
                }
                else if(dict === './dict'){
                    _word = await ApiService().getRandomWords();
                    _synonym = await _.processInput("./dict","syn",_word.word);
                    console.log("can you guess the word!!!",_synonym[0]);
                    }else{
                        if(word === _word.word || _synonym[0].filter(e=>e === word).length>0) console.log("You Guessed Right!!!");
                        else{
                            console.log("You Guessed Wrong!!!");
                            console.log("Please Select One Of Below Options");
                            console.log("Try  Again !! Press 1");
                            console.log("Get  Hint  !! Press 2");
                            console.log("Quit Game  !! Press 3");

                        }
                    }
                break;
            }
                
            default: {
                ApiService().getDefinitions(command).then(res=>console.log(res));
                ApiService().getRelatedWords(command).then(res=>console.log(res));
                ApiService().getExamples(command).then(res=>console.log(res.examples));
                break;
            }
            
        }
    }
}

module.exports = _;