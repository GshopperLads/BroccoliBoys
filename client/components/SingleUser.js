import React, {Component} from 'react'
import { connect } from 'react-redux'
import {me} from '../store'

class SingleUser extends Component {
  render() {
    console.log(this.props.user)
    const user = this.props.user
    return (
      <div className="user-info">
        {
          <div className="user-info-text">
            <h1>Account Info</h1>
            <hr />
            <div><big>BroccoliBoys ID</big></div>
            <div className="user-data-text">{user.email}</div>
            <div><big>Your Name</big></div>
            <div className="user-data-text">{user.name}</div>
            <div><big>Shipping Address</big></div>
            <div className="user-data-text">maybe need?</div>
            <div><big>Payment Info</big></div>
            <div className="user-data-text">maybe need?</div>
            <div>
              <input type="submit" value="Edit" className="btn-edit" />
            </div>
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
  // me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
