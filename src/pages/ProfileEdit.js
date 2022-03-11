import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      disabled: true,
      redirect: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const userProfile = await getUser();
      const { name, email, image, description } = userProfile;
      this.setState({
        loading: false,
        name,
        email,
        image,
        description,
      }, this.buttonValidation);
    });
  }

  buttonValidation = () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    const emailValidatinon = /\S+@\S+\.\S+/;
    const isValidEmail = emailValidatinon.test(email);
    if (name && isValidEmail && image && description) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { name, email, image, description } = this.state;
    const updatedUser = {
      name,
      email,
      image,
      description,
    };
    await updateUser(updatedUser);
    this.setState({ redirect: true });
  }

  render() {
    const { name, email, image, description, disabled, redirect, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {redirect ? <Redirect to="/profile" /> : null}
          {loading
            ? <Loading />
            : (
              <div>
                <h1>ProfileEdit</h1>
                <h1>Profile</h1>
                <form>
                  <div>
                    <img
                      src={ image }
                      alt="UserImage"
                    />
                  </div>
                  <input
                    data-testid="edit-input-image"
                    value={ image }
                    name="image"
                    onChange={ this.handleChange }
                  />
                  <p>Nome</p>
                  <input
                    data-testid="edit-input-name"
                    value={ name }
                    name="name"
                    onChange={ this.handleChange }
                  />
                  <p>E-mail</p>
                  <input
                    data-testid="edit-input-email"
                    value={ email }
                    name="email"
                    onChange={ this.handleChange }
                  />
                  <p>Descrição</p>
                  <input
                    data-testid="edit-input-description"
                    value={ description }
                    name="description"
                    onChange={ this.handleChange }
                  />
                  <div>
                    <button
                      data-testid="edit-button-save"
                      type="submit"
                      onClick={ this.handleClick }
                      disabled={ disabled }
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            )}
        </div>
      </>
    );
  }
}

export default ProfileEdit;
