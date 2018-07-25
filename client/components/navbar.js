import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>BOILERMAKER</h1>
    <nav>
      {(
        <div>
          <header id="header">
            <nav id="navigation" role="navigation">
              <div className="wrapper-full">
                <div id="logo">
                  <a href="http://localhost:1337/"></a>
                </div>
                <div className="nav-wrapper">
                  <ul className="main-nav">
                    <li className="has-dropdown">
                      <a href="https://www.heroku.com/products">Stuff I Do</a>
                      <ul className="dropdown">
                        <li className="has-dropdown">
                          <a className="bookends-icon platform" href="https://www.heroku.com/platform">Comics</a>
                          <ul className="dropdown">
                            <li className="has-dropdown">
                              <a className="bookends-icon dx" href="https://www.heroku.com/dx">Mr. Floopy</a>
                              <ul className="dropdown wide">
                                <li>
                                  <a className="bookends-icon flow" href="https://www.heroku.com/flow">Heroku Flow</a>
                                </li>
                                <li>
                                  <a className="bookends-icon cd" href="https://www.heroku.com/continuous-delivery">Continuous Delivery</a>
                                </li>
                                <li>
                                  <a className="bookends-icon ci" href="https://www.heroku.com/continuous-integration">Continuous Integration</a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a className="bookends-icon opex" href="https://www.heroku.com/platform/opex">CS Sal</a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a className="bookends-icon postgres" href="https://www.heroku.com/postgres">Athletics</a>
                        </li>
                        <li>
                          <a className="bookends-icon redis" href="https://www.heroku.com/redis">Resume</a>
                        </li>
                        <li>
                          <a className="bookends-icon kafka" href="https://www.heroku.com/kafka">Social</a>
                        </li>
                        <li>
                          <a className="bookends-icon kafka" href="https://www.heroku.com/kafka">Blog</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  console.log("state: ", state.user)
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
