import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (

  <React.Fragment>


    {isLoggedIn ? (
      <div>
        <div className="ui pointing menu">
          <Link to={'/'}>
            <a className="item">Broccoli</a>
          </Link>
          <Link to={'/products'}>
            <a className="item">Products</a>
          </Link>
          <div className="right menu">
            <a href="#" onClick={handleClick} className="item">
              Logout
            </a>
            <div className="ui pointing menu">
              <Link to={'/account'}>
                <a className="item">Account</a>
              </Link>
              <Link to={'/cart'}>
                <a className="item">Cart</a>
              </Link>
            </div>
            <div className="item">
              <div className="ui transparent icon input">
                <input type="text" placeholder="Search..." id="searchBar1" />
                <i className="search link icon" />
              </div>
            </div>
          </div>
        </div>


      </div>
    ) : (
        <div>
          <div className="ui pointing menu">
            <Link to={'/'}>
              <div className="item">Broccoli</div>
            </Link>
            <Link to={'/products'}>
              <a className="item">Products</a>
            </Link>

            <div className="right menu">
              <Link to="/login"><a className="item">Login</a></Link>
              <Link to="/signup"><a className="item">Sign Up</a></Link>
              <div className="ui pointing menu">
                <Link to={'/cart'}>
                  <a className="item">Cart</a>
                </Link>
              </div>
              <div className="item">
                <div className="ui transparent icon input">
                  <input type="text" placeholder="Search..." id="searchBar2" />
                  <i className="search link icon" />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
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