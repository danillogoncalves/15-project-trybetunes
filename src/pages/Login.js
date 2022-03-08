import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      redirect: false,
      nameLogin: '',
      isDisebedButtonLogin: true,
    };
  }

  handleInputLogin = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.setState({
      isDisebedButtonLogin: value.length <= 2,
    }));
  }

  handleButtonLogin = (event) => {
    event.preventDefault();
    const { value } = event.target;
    createUser({ name: value });
    this.setState({
      loading: true,
    });
    const second = 500;
    setTimeout(() => {
      this.setState({ redirect: true });
    }, second);
  }

  render() {
    const {
      nameLogin,
      isDisebedButtonLogin,
      redirect,
      loading,
    } = this.state;
    return (
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <form>
              <fieldset>
                <legend>Login</legend>
                <div>
                  <input
                    data-testid="login-name-input"
                    value={ nameLogin }
                    name="nameLogin"
                    onChange={ this.handleInputLogin }
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    value={ nameLogin }
                    data-testid="login-submit-button"
                    disabled={ isDisebedButtonLogin }
                    onClick={ this.handleButtonLogin }
                  >
                    Entrar
                  </button>
                </div>
              </fieldset>
            </form>
          )}
        {redirect ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}

export default Login;
