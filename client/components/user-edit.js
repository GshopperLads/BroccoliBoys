import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { modifyUser } from '../store'

class UserEdit extends Component {
  constructor() {
    super()
    this.state = {
      name: " ",
      email: " ",
      address: " "
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const email = evt.target.email.value
    const name = evt.target.name.value
    const address = evt.target.address.value
    const modifiedUser = {
      email,
      name,
      address
    }
    await this.props.modifyUser(this.props.user.id, modifiedUser)
  }

  render() {
    const user = this.props.user
    return (
      <div className="user-info">
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="user-info-title">
              <h1>Account Info</h1>
            </div>
            <hr />
            <div>
              <big>BroccoliBoys ID</big>
            </div>
            <div>
              <input
                name="email"
                type="text"
                defaultValue={user.email}
                placeholder={user.email}
                className="user-data-input"
                onChange={this.handleChange} />
              {!this.state.email && (
                <div className="checkValidation">
                  (Email is required)
                  </div>
              )}
            </div>
            <div>
              <big>Your Name</big>
            </div>
            <div>
              <input
                name="name"
                type="text"
                defaultValue={user.name}
                placeholder={user.name}
                className="user-data-input"
                onChange={this.handleChange}
              />
              {!this.state.name && (
                <div className="checkValidation">
                  (Name is required)
                  </div>
              )}
            </div>
            <div>
              <big>Shipping Address</big>
            </div>
            <div>
              <input
                name="address"
                type="text"
                defaultValue={user.address}
                placeholder={user.address}
                className="user-data-input"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input type="submit" value="Submit" className="btn-edit-submit" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  modifyUser: (userId, modifiedUser) =>
    dispatch(modifyUser(userId, modifiedUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
