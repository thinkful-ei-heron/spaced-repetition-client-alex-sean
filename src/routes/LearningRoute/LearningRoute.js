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
      wordIncorrectCount: null,
      guess: '',
      answerResponse: null,
      submitted: false,
      submittedAnswer: null
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

  handleInput = (e) => {
    this.setState({
      guess: e.target.value
    })
  }

  handleSubmit = () => {
    let guess = this.state.guess.toLocaleLowerCase()
    LangApiService.handleSubmitGuess(guess)
    .then(res => this.setState({
      answerResponse: res,
      submitted: true,
      guess: '',
      totalScore: res.totalScore,
      submittedAnswer: guess
    }))
  }


  render() {
    return (
      <div className='learning-section'>
        {this.state.answerResponse && !this.state.answerResponse.isCorrect ?
          <>
            <h2>Good try, but not quite right :(</h2>
            <p id='DisplayFeedback'>The correct translation for {this.state.nextWord} is {this.state.answerResponse.answer} and you chose {this.state.submittedAnswer}!</p>
            <button>Try another word!</button>
          </>
          : <></>
      }
        <h2>Translate the word:</h2>
        <span>{!this.state.nextWord ? '' : this.state.nextWord}</span>
        <p id='DisplayScore'>Your total score is: {!this.state.totalScore ? 0 : this.state.totalScore}</p>
        {
          !this.state.submitted ?
          <>
            <form onSubmit={e => {
              e.preventDefault()
              this.handleSubmit()}}>
              <label htmlFor='learn-guess-input'>What's the translation for this word?</label>
              <input type='text' 
                      required='required' 
                      id='learn-guess-input' 
                      value={this.state.guess}
                      onChange={this.handleInput}/>
              <button type='submit'>Submit your answer</button>
            </form>
          </> :
          <></>
        }
        
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
