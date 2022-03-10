import React, { Component } from 'react';
import Header from './Header';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteSong: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const favoriteSong = await getFavoriteSongs();
      this.setState({
        favoriteSong,
        loading: false,
      });
    });
  }

  handleChange = async ({ target }) => {
    const { favoriteSong } = this.state;
    const song = favoriteSong.find(({ trackId }) => trackId === +target.id);
    this.setState({
      loading: true,
    }, async () => {
      if (target.checked) {
        await addSong(song);
      } else {
        await removeSong(song);
      }
      this.setState({
        favoriteSong: await getFavoriteSongs(),
        loading: false,
      });
    });
  }

  render() {
    const {
      favoriteSong,
      loading,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {loading
            ? <Loading />
            : (
              <>
                <h1>Favorites</h1>
                { favoriteSong.map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    value={ music }
                    checked={ favoriteSong
                      .some(({ trackId }) => +trackId === +music.trackId) }
                    handleChange={ this.handleChange }
                  />
                )) }
              </>
            )}
        </div>
      </>
    );
  }
}

export default Favorites;
