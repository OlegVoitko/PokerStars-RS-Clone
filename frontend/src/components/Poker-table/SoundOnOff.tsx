import React, { Component } from 'react';
import './SoundOnOff.scss';

const song = require('../../assets/sounds/background_music.mp3');

class Sound extends Component {
  state = {
    audio: new Audio(song),
    isPlaying: false,
  };
  playPause = () => {
    const isPlaying = this.state.isPlaying;

    if (isPlaying) {
      this.state.audio.pause();
    } else {
      this.state.audio.play();
    }
    this.setState({ isPlaying: !isPlaying });
  };

  render() {
    return (
      <div className='poker__header'>
        {/* <p>{this.state.isPlaying ? 'Song is Playing' : 'Song is Paused'}</p> */}
        <button className='background__button' onClick={this.playPause}>
          Play | Pause
        </button>
      </div>
    );
  }
}

export default Sound;
