import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, fetchCart, me } from '../store'


class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.fetchMe()
    if (this.props.user.id) {
      this.props.fetchCart(this.props.user.id)


    }
  }

  render() {
    return (
      <React.Fragment>


        {this.props.isLoggedIn ? (
          <div>
            <div className="ui pointing menu">
              <Link to={'/'}>
                <div className="item">Home</div>
              </Link>
              <Link to={'/products'}>
                <div className="item">Products</div>
              </Link>
              <div className="right menu">
                <div href="#" onClick={this.props.handleClick} className="item">
                  Logout
                  </div>
                <div className="ui pointing menu">
                  <Link to={'/account'}>
                    <div className="item">Account</div>
                  </Link>
                  <Link to={`/cart/${this.props.user.id}`}>
                    <div className="item">Cart</div>
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
            <div className="ui segment">
              <p />
            </div>

          </div>
        ) : (
            <div>
              <div className="ui pointing menu">
                <Link to={'/'}>
                  <div className="item">Home</div>
                </Link>
                <Link to={'/products'}>
                  <div className="item">Products</div>
                </Link>

                <div className="right menu">
                  <Link to="/login"><div className="item">Login</div></Link>
                  <Link to="/signup"><div className="item">Sign Up</div></Link>
                  <Link to='/guestcart'>
                    <div className="item">Cart</div>
                  </Link>
                  <div className="item">
                    <div className="ui transparent icon input">
                      <input type="text" placeholder="Search..." id="searchBar2" />
                      <i className="search link icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui segment">
                <p />
              </div>
            </div>
          )}
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart

  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchCart: (userid) => dispatch(fetchCart(userid)),
    fetchMe: () => dispatch(me())
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
