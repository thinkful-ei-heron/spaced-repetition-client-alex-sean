import React, { Component } from 'react'
import LangApiService from '../../services/lang-api-service'
import './Dashboard.css'

class DashboardRoute extends Component {

  constructor(props){
  super(props);
    this.state = {
    dbResponse : null
  }
 };
  
  componentDidMount(){
    LangApiService.getLanguageAndWordsProgress(1)
        .then(res => {
          if(res === undefined) {
            this.props.history.push('/login')
          } else this.setState({dbResponse:res})
        })
          
  }
  
  getLanguage=()=>{
    return (this.state.dbResponse == null? null : this.state.dbResponse.language.name)
  }

  getTotalCorrect=()=>{
    return (this.state.dbResponse == null? null : this.state.dbResponse.language.total_score)
  }

  getWordsToPractice=()=>{

    function wordMap(array){
      return (
        array.words.map((words, index) =>{
          return(
            <li key={index}>
              <h4>{words.original}</h4>
               <p>correct answer count: {words.correct_count}</p>
                <p>incorrect answer count: {words.incorrect_count}</p>
              
            </li>
          )
        })
      )
    }

    return (this.state.dbResponse == null? null : wordMap(this.state.dbResponse))
  }

  render() {

    //console.log(this.state.dbResponse.language)

    return (
      <section className = 'dashboard'>
        <h2>Your current language is: {this.getLanguage()}</h2>
        <div className='practice'>
          <h3>Words to practice</h3>
          <ul>{this.getWordsToPractice()} </ul>
          <p id='correctAnswers'>Total correct answers: {this.getTotalCorrect()}</p>
          <a href='/learn'>Start practicing</a>
        </div>
        {/* <button type='button'>Start Practicing!</button> */}
      </section>
    );
  }
}

export default DashboardRoute
