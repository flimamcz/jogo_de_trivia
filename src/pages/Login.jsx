import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getToken from '../services/apiToken';
import logo from '../trivia.png'
import '../styles/Login.css';
import { actionEmail } from '../redux/actions/action';

class Login extends Component {
  state = {
    email: '',
    name: '',
    btnDisable: true,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    const { token } = await getToken();
    localStorage.setItem('token', token);
    if (token.length) {
      dispatch(actionEmail(email, name));
      history.push('/game');
    }
  };

  validateTriviaForm = () => {
    const { email, name } = this.state;
    const verify = /\S+@\S+\.\S+/;
    if (name.length > 0 && verify.test(email)) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => { this.validateTriviaForm(); });
  };

  redirectSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { btnDisable } = this.state;
    return (
      <div className="login">
        <img src={ logo } className="logo" alt="logo" />
        <br />
        <form onSubmit={ this.handleSubmit } className="form">
          <label htmlFor="email">
            <span>E-mail</span>
            <input
              id="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              name="email"
              placeholder="Informe seu email"
              className="email"
            />
          </label>
          <br />
          <label htmlFor="name">
            <span>Name</span>
            <input
              placeholder="Informe seu nome"
              id="name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              name="name"
              className="name"
            />
          </label>
          <div className="buttons-login">
            <button
              data-testid="btn-play"
              type="submit"
              disabled={ btnDisable }
            >
              Jogar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
