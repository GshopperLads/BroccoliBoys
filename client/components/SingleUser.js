import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { me } from "../store"

class SingleUser extends Component {

  render() {
    const user = this.props.user
    return (
      <div className="user-info">
        {
          <div className="user-info-text">
            <div className="user-info-title"><h1>Account Info</h1></div>
            <hr />
            <div><big>BroccoliBoys ID</big></div>
            <div className="user-data-text">{user.email}</div>
            <div><big>Your Name</big></div>
            <div className="user-data-text">{user.name}</div>
            <div><big>Shipping Address</big></div>
            <div className="user-data-text">{user.address}</div>
            <div><big>Order History</big></div>
            <div className="user-data-text">maybe need?</div>
            <Link to="/useredit">
              <div>
                <input type="submit" value="Edit" className="btn-edit" />
              </div>
            </Link>
            <Link to="/payment">
              <input type="submit" value="PaymentTest" className="btn-edit" />
            </Link>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
