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
      isDisebedButton: true,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.setState({
      isDisebedButton: value.length <= 2,
    }));
  }

  handleButton = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      loading: true,
    },
    async () => {
      await createUser({ name: value });
      this.setState({
        loading: false,
        redirect: true,
      });
    });
  }

  render() {
    const {
      nameLogin,
      isDisebedButton,
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
                    onChange={ this.handleInput }
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    value={ nameLogin }
                    data-testid="login-submit-button"
                    disabled={ isDisebedButton }
                    onClick={ this.handleButton }
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
