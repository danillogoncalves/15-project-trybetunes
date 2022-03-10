import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      inputArtistName: '',
      nameSearched: false,
      searchResult: [],
      hasArtistTheName: false,
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
        inputArtistName: '',
        isDisebedButton: true,
        nameSearched: value,
        hasArtistTheName: searchResult.length > 0,
        searchResult,
      });
    });
  }

  render() {
    const {
      loading,
      inputArtistName,
      nameSearched,
      searchResult,
      hasArtistTheName,
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
                value={ inputArtistName }
                name="inputArtistName"
                onChange={ this.handleInput }
              />
            </div>
            <div>
              <button
                type="submit"
                value={ inputArtistName }
                data-testid="search-artist-button"
                disabled={ isDisebedButton }
                onClick={ this.handleButton }
              >
                Pesquisar
              </button>
            </div>
            {loading
              ? <Loading />
              : (
                <div>
                  {!searchResult.length && !nameSearched
                    ? null
                    : (
                      <div>
                        {hasArtistTheName
                          ? (
                            <div>
                              <p>
                                Resultado de álbuns de:
                                {' '}
                                {nameSearched}
                              </p>
                              <nav>
                                (
                                {searchResult.map(({
                                  artistName,
                                  collectionName,
                                  collectionId,
                                  artworkUrl100,
                                }) => (
                                  <Link
                                    data-testid={ `link-to-album-${collectionId}` }
                                    key={ collectionId }
                                    to={ `/album/${collectionId}` }
                                  >
                                    <img src={ artworkUrl100 } alt={ collectionName } />
                                    <p>{ collectionName }</p>
                                    <p>{ artistName }</p>
                                  </Link>))}
                                )
                              </nav>
                            </div>
                          )
                          : (
                            <p>
                              Nenhum álbum foi encontrado
                            </p>
                          )}
                      </div>
                    )}
                </div>
              )}
          </form>
        </div>
      </>
    );
  }
}

export default Search;
