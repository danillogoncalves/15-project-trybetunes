import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      isDisebedButton: true,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.setState({
      isDisebedButton: value.length <= 1,
    }));
  }

  render() {
    const {
      artistName,
      isDisebedButton,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <h1>Search</h1>
            <div>
              <input
                data-testid="search-artist-input"
                value={ artistName }
                name="artistName"
                onChange={ this.handleInput }
              />
            </div>
            <div>
              <button
                type="submit"
                value={ artistName }
                data-testid="search-artist-button"
                disabled={ isDisebedButton }
                onClick={ this.handleButton }
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
