import React, { Component } from 'react'
import LangApiService from '../../services/lang-api-service'
// import {Textarea, Input, Button, Label, Required} from '../../components/Form/Form'


class LearningRoute extends Component {

  constructor(props){
    super(props);
      this.state = {
      nextWord: null,
      totalScore: null,
      wordCorrectCount: null,
      wordIncorrectCount: null
    }
   };

  componentDidMount() {
    LangApiService.getCurrentWord()
      .then(res => {
        this.setState({
          nextWord: res.nextWord,
          totalScore: res.totalScore,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount
        })
      })
  }


  render() {
    return (
      <div className='learning-section'>
        <h2>Translate the word:</h2>
        <span>{!this.state.nextWord ? '' : this.state.nextWord}</span>
        <p>Your total score is: {!this.state.totalScore ? 0 : this.state.totalScore}</p>
        <form>
          <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
          <input type='text' required='required' id='learn-guess-input'></input>
          <button type='submit'>Submit your answer</button>
        </form>
        <p>You have answered this word correctly 
          {!this.state.wordCorrectCount ? ' '+0+' ' : ' '+this.state.wordCorrectCount+' '}
          times.
        </p>
        <p>You have answered this word incorrectly 
          {!this.state.wordIncorrectCount ? ' '+0+' ' : ' '+this.state.wordIncorrectCount+' '}
          times.
        </p>
      </div>

    );
  }
}

export default LearningRoute
