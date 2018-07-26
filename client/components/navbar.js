import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <React.Fragment>
    <div className="ui pointing menu">
      <Link to={"/"}>
        <div className="item" >
          Broccoli
  </div>
      </Link>
      <Link to={"/products"}>
        <div className="item">
          Products
      </div>
      </Link>
      <div className="right menu">
        <div className="ui pointing menu">
          <Link to={"/cart"}>
            <div className="item" >
              <i className="shop icon"></i>
            </div>
          </Link>
        </div>
        <div className="item">

          <div className="ui transparent icon input">
            <input type="text" placeholder="Search..." />
            <i className="search link icon"></i>
          </div>

        </div>
      </div>
    </div>
    <div className="ui segment">
      <p></p>
    </div>
  </React.Fragment>

)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
