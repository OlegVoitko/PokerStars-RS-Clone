import React, { useEffect, useRef, useState } from 'react';
import './SoundOnOff.scss';

const SoundOnOff = (): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioEl = useRef<HTMLAudioElement>(null);
  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioEl.current?.play();
    } else {
      audioEl.current?.pause();
    }
  }, [isPlaying]);

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
