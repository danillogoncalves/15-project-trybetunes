import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const userProfile = await getUser();
      this.setState({
        userProfile,
        loading: false,
      });
    });
  }

  render() {
    const { userProfile, loading } = this.state;
    const { name, email, image, description } = userProfile;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {loading
            ? <Loading />
            : (
              <div>
                <h1>Profile</h1>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ name }
                />
                <p>Nome</p>
                <p>{ name }</p>
                <p>E-mail</p>
                <p>{ email }</p>
                <p>Descrição</p>
                <p>{ description }</p>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )}
        </div>
      </>
    );
  }
}

export default Profile;
