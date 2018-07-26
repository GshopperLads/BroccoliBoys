import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
//   <nav className="navbar navbar-light bg-light">
//     <Link className="navbar-brand" to="/">
//       <img src="logo.jpg" width="30" height="30" className="d-inline-block align-top" alt="" />
//       Broccoli
//   </Link>
//     <Link className="navbar-brand" to="/products">
//       Products
//   </Link>
//   </nav>
// )

<nav className="navbar navbar-light bg-light">
{isLoggedIn ? (
      <div>
        <Link className="navbar-brand" to="/">
          <img
            src="logo.jpg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Broccoli
        </Link>
        <Link className="navbar-brand" to="/products">
          Products
        </Link>
        <a href="#" onClick={handleClick}>
        Logout
        </a>
      </div>
    ) : (
      <div>
      <Link className="navbar-brand" to="/">
        <img
          src="logo.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Broccoli
      </Link>
      <Link className="navbar-brand" to="/products">
        Products
      </Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      </div>
    )}
    </nav>
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
