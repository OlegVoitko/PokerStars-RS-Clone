import React, { Component, useState } from 'react';
import './SoundOnOff.scss';

const song = require('../../assets/sounds/background_music.mp3');

class SoundOnOff extends Component<any, {playing: boolean}> {
  audioEl: any;
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      playing: false,
    };
  }

  onPlay = (_event: any) => {
    this.setState({ playing: true });
  };
  onPause = (_event: any) => {
    this.setState({ playing: false });
  };
  onEnded = (_event: any) => {
    this.setState({ playing: false });
  };

  playAudio = () => {
    this.audioEl.play();
    const audio = this.audioEl;
    audio.addEventListener('play', this.onPlay);
    audio.addEventListener('pause', this.onPause);
  };

  pauseAudio = () => {
    this.audioEl.pause();
  };

  startAudio = () => {
    this.playAudio();
  };

  renderAudio = () => {
    const { playing } = this.state;

    return (
      <>
        <div className='poker__header'>
          {!playing && <div className='btn pause-btn' onClick={this.startAudio}></div>}
          {playing && <div className='btn play-btn' onClick={this.pauseAudio}></div>}

          <audio
            src={require('../../assets/sounds/background_music.mp3')}
            ref={(ref) => {
              this.audioEl = ref;
            }}
          ></audio>
        </div>
      </>
    );
  };

  render() {
    return this.renderAudio();
  }
}

export default SoundOnOff;
