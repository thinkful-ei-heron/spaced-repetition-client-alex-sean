import config from '../config'
import TokenService from './token-service'

const LangApiService = {


    getLanguageAndWordsProgress(id){
        return fetch(`${config.API_ENDPOINT}/language`, {
            headers: {
                'authorization':`bearer ${TokenService.getAuthToken()}`,
              },
            })
              .then(res => {
                if(!res.ok){
                  return res.json().then(e => {
                    Promise.reject(e)        
                 })
                } else res.json()
              }
                
              )
    },
    getWordsToLearn(){

    },
    getResponses(){

    },
    getTotalScore(){

    }

}

export default LangApiService