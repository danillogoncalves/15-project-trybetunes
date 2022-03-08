import React, { Component } from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      artistName: '',
      nameSearched: '',
      searchResult: [],
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

  handleButton = async (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      loading: true,
    }, async () => {
      const searchResult = await searchAlbumsAPI(value);
      this.setState({
        loading: false,
        artistName: '',
        nameSearched: value,
        searchResult,
      });
    });
  }

  render() {
    const {
      loading,
      artistName,
      nameSearched,
      searchResult,
      isDisebedButton,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {loading
            ? <Loading />
            : (
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
                    Pesquisar
                  </button>
                </div>
                {searchResult <= 0
                  ? null
                  : (
                    <div>
                      <p>
                        Resultado de álbuns de:
                        {' '}
                        {nameSearched}
                      </p>
                    </div>
                  )}
              </form>
            )}
        </div>
      </>
    );
  }
}

export default Search;
