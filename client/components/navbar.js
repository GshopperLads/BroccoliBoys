import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
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

{/* <div>
<h1>BOILERMAKER</h1>
<nav>
  {isLoggedIn ? (
    <div>
      {/* The navbar will show these links after you log in */}
      <Link to="/home">Home</Link>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
    </div>
  ) : (
    <div>
      {/* The navbar will show these links before you log in */}
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  )}
</nav>
<hr />
</div> */}

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
