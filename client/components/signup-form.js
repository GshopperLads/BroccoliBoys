import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {authSignup} from '../store'

const SignupForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div className="form">
      <div className="form-title">Create Account</div>
      <form onSubmit={handleSubmit} name={name} className="form-wrapper">
        <div>
          <label htmlFor="email" className="input-text">
            Email
          </label>
          <input name="email" type="text" className="input-box" />
        </div>
        <div>
          <label htmlFor="name" className="input-text">
            Name
          </label>
          <input name="name" type="text" className="input-box" />
        </div>
        <div>
          <label htmlFor="password" className="input-text">
            Password
          </label>
          <input name="password" type="password" className="input-box" />
        </div>
        <div>
          <button type="submit" className="btn-login">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div>
        <a href="/auth/google" className="btn btn-info">
          {displayName} with Google
        </a>
      </div>
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const name = evt.target.name.value
      const password = evt.target.password.value
      dispatch(authSignup(email, name, password))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(SignupForm)

SignupForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
