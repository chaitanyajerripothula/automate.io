const config =require('./../../config');
const axios = require('axios');
const apiurls = require('./../../api');
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ApiService = () =>{
    const api = axios.create();
    api.defaults.headers.post['Content-Type'] = 'application/json';

    const getRandomWords = async () =>{
        const {data} = await axios.get(apiurls["getRandomWords"]).catch(err=>{ throw  Error(err)    }); //return {data:"error fetching"}});
        return data;
    } 

    const getDefinitions = async(word) =>{
        const {data} =  await axios.get(apiurls["getDefinitions"].replace("{word}",word)).catch(err=>{ throw  Error(err)    });
        return data;

    } 

    const getExamples = async(word) =>{
        const {data} =  await axios.get(apiurls["getExamples"].replace("{word}",word)).catch(err=>{ throw  Error(err)    });;
        return data;

    } 

    const getRelatedWords = async(word) =>{
        const {data} =  await axios.get(apiurls["getRelatedWords"].replace("{word}",word)).catch(err=>{ throw  Error(err)    });
        return data;

    } 
   return {getRandomWords,getDefinitions,getExamples,getRelatedWords}; 


}

// ApiService().getRandomWords().then(res=>console.table(res));
// 
// ApiService().getRelatedWords('white').then(res=>console.table(res));
module.exports =ApiService;