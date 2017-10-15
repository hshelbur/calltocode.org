import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import styles from './Login.css'
import credentials from '../../data/login'
import { login } from '../../actions'

class Login extends Component {
  renderEmail (field) {
    return (
      <div>
        <input className={styles.inputEmail}
          placeholder="Email"
          {...field.input} />
        <div > <span className={styles.errorContent}>{field.meta.touched ? field.meta.error : ''}</span></div>
      </div>
    )
  }

  renderPassword (field) {
    return (
      <div>
        <input className={styles.inputPassword}
          placeholder="Password"
          type="password"
          {...field.input} />
        <div className={styles.errorContent}> {field.meta.touched ? field.meta.error : ''}</div>
      </div>
    )
  }

  render () {
    const { handleSubmit, login } = this.props

    return (
      <form className={styles.form} onSubmit={handleSubmit(login)}>
        <h1 className={styles.title}>Login</h1>

        <Field name="email"
          component={this.renderEmail} />
        <Field name="password"
          component={this.renderPassword} />

        <button className={styles.buttonSubmit} type="submit">
          Submit
        </button>
      </form>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  handleSubmit: PropTypes.func
}

function validate (values) {
  const errors = {}
  if (!values.email || values.email === '') {
    errors.email = `Please enter an email`
  } else if (values.email !== credentials.email) {
    errors.email = `Email is incorrect`
  }
  if (!values.password || values.password === '') {
    errors.password = `Please enter a password`
  } else if (values.password !== credentials.password) {
    errors.password = `Password is incorrect`
  }
  return errors
}

/* function validateEmailAndPassword (values) {
  const errors = {}
  if (values.email !== credentials.email) {
    errors.email = `Email should be ${credentials.email}`
  }
  if (values.password !== credentials.password) {
    errors.password = `Password should be ${credentials.password}`
  }
  return errors
} */

const LoginForm = reduxForm({
  form: 'LoginForm',
  onSubmitSuccess: (result, dispatch) => dispatch(push('/')),
  validate
})(Login)

export default connect(null, { login })(LoginForm)
