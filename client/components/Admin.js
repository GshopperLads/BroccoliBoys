import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {Dashboard, AdminCustomer, AdminProduct, AdminEvent} from './index'

class Admin extends Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div className="ui inverted menu">
          <Link to="/admin/dashboard">
            <div className="active item">Dashboard</div>
          </Link>
          <Link to={'/admin/product'}>
            <div className="item">Product</div>
          </Link>
          <Link to={'/admin/customer'}>
            <div className="item">Customer</div>
          </Link>
          <Link to={'/admin/event'}>
            <div className="item">Event</div>
          </Link>
        </div>
        <Route exact path="/admin/dashboard" component={Dashboard} />
        <Route exact path="/admin/product" component={AdminProduct} />
        <Route exact path="/admin/customer" component={AdminCustomer} />
        <Route exact path="/admin/event" component={AdminEvent} />
      </React.Fragment>
    )
  }
}

const mapState = state => ({})

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Admin)
