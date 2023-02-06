import React from 'react';
import './App.css';

import PlayList from '../PlayList/PlayList';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      SearchResults: [],
      PlayListName: "New Playlist",
      PlayListTracks: []
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.removeTrackSearch = this.removeTrackSearch(this);
  }

  search(term) {
    Spotify.search(term).then(SearchResults => {
      this.setState({ SearchResults: SearchResults });
    });
  }

  addTrack(track) {
    let tracks = this.state.PlayListTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ PlayListTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.PlayListTracks;
    let trackSearch = this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    tracks.unshift(track);
    this.setState({ PlayListTracks: tracks });
  }

  removeTrackSearch(track) {
    let tracks = this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ SearchResults: track });
  }

  doThese(track) {
    this.addTrack(track);
    this.removeTrack(track);
  }

  updatePlayListName(name) {
    this.setState({ updatePlayListName: name });
  }

  savePlayList() {
    const trackUris = this.state.PlayListTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.PlayListName, trackUris).then( () => {
      this.setState({
        updatePlayListName: "New Playlist",
        PlayListTracks: []
      });
    });
  }
}

function App() {
  return (
    <div>
      <h1>
        <a href='http://localhost:3000'>Music</a>
      </h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className='App-playlist'>
          <SearchResults SearchResults={this.state.SearchResults} onAdd={this.state.doThese} />
          <PlayList 
            PlayListTracks={this.state.PlayListTracks} 
            onNameChange={this.updatePlayListName}
            onRemove={this.removeTrack}
            onSave={this.savePlayList}
          
          />
        </div>
      </div>
    </div>
  );
}

export default App;
