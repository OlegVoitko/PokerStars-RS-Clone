import React, { FC, useRef, useState } from 'react';
import './SoundOnOff.scss';

const song = require('../../assets/sounds/background_music.mp3');

interface Sound {
	audioEl: HTMLAudioElement,
	isPlaying: boolean,
	setIsPlaying: () => void
}
const SoundOnOff: FC<Sound> = ({ audioEl, isPlaying, setIsPlaying }): JSX.Element => {
  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className='poker__header'>
        {isPlaying ? (
          <div className='btn play-btn' onClick={playPause}></div>
        ) : (
          <div className='btn pause-btn' onClick={playPause}></div>
        )}
        <audio src={require('../../assets/sounds/background_music.mp3')} ref={audioEl}></audio>
      </div>
    </>
  );
};

export default SoundOnOff;
