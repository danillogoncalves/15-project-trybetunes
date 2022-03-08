import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const { name } = await getUser();
      this.setState({
        name,
        loading: false,
      });
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        {loading
          ? <Loading />
          : (
            <div>
              <h1>Header</h1>
              <p data-testid="header-user-name">{ name }</p>
              <nav>
                <Link data-testid="link-to-search" to="/search">Search</Link>
                <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
                <Link data-testid="link-to-profile" to="/profile">Profile</Link>
              </nav>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
