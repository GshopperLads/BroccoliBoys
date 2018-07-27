import React, { Component } from 'react'
import { connect } from 'react-redux'

class HomePage extends Component {

  render() {
    return (
      <React.Fragment>
          <img src="https://img00.deviantart.net/af5e/i/2014/107/b/c/bonus_broccoli_logo_by_mirics-d7eudkv.png" class="center" />
        <div className="item">

          <div className="ui transparent icon input" class="center">
            <input type="text" placeholder="Search..." />
            <i className="search link icon"></i>
          </div>

        </div>
        <img src="https://image.shutterstock.com/image-vector/illustration-cool-muscle-broccoli-wearing-260nw-1121200394.jpg" class="center" />
      </React.Fragment>
    )
  }
}

export default HomePage

