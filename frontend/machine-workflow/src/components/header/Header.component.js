import React, { Component } from 'react';

import './Header.style.css'

class Header extends Component {

  onLogoClick = () => {
    window.location.replace('/')
  }

  render() {
    return (
      <div className='header'>
        <div className='header__logo' onClick={this.onLogoClick}>
          Machine Workflow
        </div>
      </div>
    )
  }
}

export { Header }
