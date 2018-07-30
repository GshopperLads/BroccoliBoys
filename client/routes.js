import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Cart,
  AllProducts,
  SingleUser,
  SingleProduct,
  Home,
  Payment,
  NewReview,
  UserEdit,
  Admin,
  Dashboard
} from './components'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props
    const { isAdmin } = this.props

    return isAdmin ? (
      <Switch>
        <Route path="/admin" component={Admin} />

      </Switch>
    ) : (
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/cart/:userId" component={Cart} />
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route path="/products/:id/newreview" component={NewReview} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/home" component={Home} />
              <Route exact path="/account" component={SingleUser} />
              <Route exact path="/payment" component={Payment} />
              <Route exact path="/useredit" component={UserEdit} />
            </Switch>
          )}
        </Switch>
      )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!(state.user.id === 1)
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
