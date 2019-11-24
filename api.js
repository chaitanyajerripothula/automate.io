const {config:{baseURL,api_key}}  = require('./config');

const apiurls = {
    'getRandomWords':`${baseURL}/words/randomWord?api_key=${api_key}`,
    'getDefinitions':`${baseURL}/word/{word}/definitions?api_key=${api_key}`,
    'getExamples':`${baseURL}/word/{word}/examples?api_key=${api_key}`,
    'getRelatedWords':`${baseURL}/word/{word}/relatedWords?api_key=${api_key}`
}

module.exports = apiurls;