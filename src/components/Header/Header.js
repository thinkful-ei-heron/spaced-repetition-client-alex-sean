import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className='logged-in-header'>
        <span id='header-user-name'>
          {this.context.user.name}
        </span>
        <nav className='header-nav'>
          <Link
            className='header-nav-link'
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className='header-nav'>
        <Link 
        className='header-nav-link'
        to='/login'>Login</Link>
        {' '}
        <Link 
        className='header-nav-link'
        to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className='nav-header'>
        <h1 id='app-title'>
          <Link id='header-link' to='/'>
            Spaced repetition
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
