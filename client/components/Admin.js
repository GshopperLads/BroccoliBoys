import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {logout} from '../store'
import {Dashboard} from './index'



class Admin extends Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
      <div className="ui inverted menu">
        <Link to='/admin/dashboard'>
          <div className="active item">Dashboard</div>
        </Link>
        <Link to={'/'}>
          <div className="item">Broccoli</div>
        </Link>
        <Link to={'/'}>
          <div className="item">Broccoli</div>
        </Link>
        <Link to={'/'}>
          <div className="item">Broccoli</div>
        </Link>
        <div>Heelo</div>
        <div>Heelo</div>
        <div>Heelo</div>
        {/* <Dashboard /> */}
      </div>
      <Route exact path="/admin/dashboard" component={Dashboard} />
      </React.Fragment>
    )
  }
}

const mapState = state => ({

})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Admin)
