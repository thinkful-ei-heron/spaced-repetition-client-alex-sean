import config from '../config'
import TokenService from './token-service'

const LangApiService = {


    getLanguageAndWordsProgress(){
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
                } else return res.json()
              }
                
              )
    },
    getCurrentWord(){
      return fetch(`${config.API_ENDPOINT}/language/head`, {
        headers: {
          'authorization':`bearer ${TokenService.getAuthToken()}`
        }
      })
        .then(res => {
          if(!res.ok){
            return res.json().then(e => {
              Promise.reject(e)
            })
          } else {
            return res.json()}
        })
    },
    getWordsToLearn(){

    },
    getResponses(){

    },
    getTotalScore(){

    }

}

export default LangApiService