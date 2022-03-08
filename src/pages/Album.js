import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      artworkUrl100: '',
      collectionName: '',
      loading: false,
      listMusic: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    }, async () => {
      const collection = await getMusics(id);
      const listMusic = collection.filter((_music, index) => index !== 0);
      this.setState({
        artistName: collection[0].artistName,
        artworkUrl100: collection[0].artworkUrl100,
        collectionName: collection[0].collectionName,
        listMusic,
        loading: false,
      });
    });
  }

  render() {
    const { loading,
      listMusic,
      artistName,
      artworkUrl100,
      collectionName } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          {loading
            ? <Loading />
            : (
              <div>
                <h1>Album</h1>
                <img src={ artworkUrl100 } alt={ artistName } />
                <p data-testid="artist-name">{ artistName }</p>
                <p data-testid="album-name">{ collectionName }</p>
                <div>
                  { listMusic.map((music) => (
                    <MusicCard
                      key={ music.trackNumber }
                      value={ music }
                    />
                  )) }
                </div>
              </div>
            )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
