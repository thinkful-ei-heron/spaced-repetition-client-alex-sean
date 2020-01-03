import React, { Component } from 'react'
import LangApiService from '../../services/lang-api-service'
import './LearningRoute.css'


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
      submittedAnswer: guess,
      
    }))
  }

  refreshSubmitted = () => {
    this.setState({
      submittedAnswer: null
    })
  }

  handleNewWord = () => {
    let newWord = this.state.answerResponse.nextWord
    let newCorrect = this.state.answerResponse.wordCorrectCount
    let newIncorrect =this.state.answerResponse.wordIncorrectCount
    this.setState({
      nextWord: newWord,
      wordCorrectCount: newCorrect,
      wordIncorrectCount: newIncorrect,
      submitted: false,
      submittedAnswer: null
    })
  }


  render() {
    return (
      <div className='learning-section'>
        {this.state.submitted && !this.state.answerResponse.isCorrect ?
          <>
            <h2 aria-live='polite' id='incorrect-title'>Good try, but not quite right :(</h2>
            <p aria-live='polite' className='DisplayFeedback'>The correct translation for {this.state.nextWord} was {this.state.answerResponse.answer} and you chose {this.state.submittedAnswer}!</p>
            <button aria-live='polite' className='next-button' onClick={this.handleNewWord}>Try another word!</button>
          </>
          : <></>
      }
      {this.state.submitted && this.state.answerResponse.isCorrect ?
          <>
            <h2 aria-live='polite'>You were correct! :D</h2>
            <p aria-live='polite' className='DisplayFeedback'>The correct translation for {this.state.nextWord} was {this.state.answerResponse.answer} and you chose {this.state.submittedAnswer}!</p>
            <button aria-live='polite' className='next-button' onClick={this.handleNewWord}>Try another word!</button>
          </>
          : <></>
      }
        
       
        {
          !this.state.submitted ?
          <>
            <h2 className='learning-title'>Translate the word:</h2>
            <span lang='de' id='translate-word'>{!this.state.nextWord ? '' : this.state.nextWord}</span>
            <form 
              id='guess-form'
              onSubmit={e => {
              e.preventDefault()
              this.handleSubmit()}}>
              <label id='guess-label' htmlFor='learn-guess-input'>What's the translation for this word?</label>
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
        <p className='DisplayScore'>Your total score is: {!this.state.totalScore ? 0 : this.state.totalScore}</p>
        {!this.state.submitted ? 
        <div>
          <p id='correct-count'>You have answered this word correctly 
            {!this.state.wordCorrectCount ? ' '+0+' ' : ' '+this.state.wordCorrectCount+' '}
            times.
          </p>
          <p id='incorrect-count'>You have answered this word incorrectly 
            {!this.state.wordIncorrectCount ? ' '+0+' ' : ' '+this.state.wordIncorrectCount+' '}
            times.
          </p>
        </div> : <></>
      }
      </div>

    );
  }
}

export default LearningRoute
