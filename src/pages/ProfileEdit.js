import React, { Component } from 'react';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
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
      });
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          {loading
            ? <Loading />
            : (
              <div>
                <h1>ProfileEdit</h1>
                <h1>Profile</h1>
                <form>
                  <img
                    src={ image }
                    alt="UserImage"
                  />
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
                  <button
                    data-testid="edit-button-save"
                    type="submit"
                  >
                    Salvar
                  </button>
                </form>
              </div>
            )}
        </div>
      </>
    );
  }
}

export default ProfileEdit;
