import config from '../config'
import TokenService from './token-service'

const LangApiService = {

    getLanguageAndWordsProgress(){
        return fetch(`${config.REACT_APP_API_BASE}/language`, {
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
      return fetch(`${config.REACT_APP_API_BASE}/language/head`, {
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
    handleSubmitGuess(guess){
      console.log('submitting guess: '+guess)
      return fetch(`${config.REACT_APP_API_BASE}/language/guess`, {
        method: 'POST',
        headers: { 'authorization':`bearer ${TokenService.getAuthToken()}`,
                  'content-type': 'application/json' },
        body: JSON.stringify({ guess })
      })
      .then(res => {
        if(!res.ok){
          return res.json().then(e => {
            Promise.reject(e)
          })
        } else {
          return res.json()
        }
      })
    }
}

export default LangApiService