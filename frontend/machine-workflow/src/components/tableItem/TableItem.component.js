import React, { Component } from 'react';

import './TableItem.style.css';

class TableItem extends Component {

  constructor() {
    super()

    this.state = {
      showInfo: false
    }
  }

  changeShowInfoClick = () => {
    this.setState({ showInfo: !this.state.showInfo })
  }

  render() {
    const { object, children } = this.props
    const { name, status } = object

    return (
      <>
        <div className={`tableItem ${status == 'warn' && 'warn'} ${status == 'alert' && 'alert'}`} onClick={this.changeShowInfoClick}>
          <span>{name}</span>
        </div>
        <div className={`tableItem__info ${this.state.showInfo ? 'show' : ''}`}>
          {children}
        </div>
      </>
    )
  }
}

export { TableItem }
