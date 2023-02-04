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
      PlayListName: "New playlist",
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
}

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
