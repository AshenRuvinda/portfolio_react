import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  Repeat,
  Music,
  ChevronUp
} from 'lucide-react';
import './DynamicMusicPlayer.css';

const DynamicMusicPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const audioRef = useRef(null);

  // Sample songs - replace with your local music files
  const songs = [
    {
        title: "Lose My Mind",
        artist: "Don Toliver feat. Doja Cat",
        src: "/music/song1.mp3", // Place your music files in public/music/
        cover: "/images/album1.jpg" // Place album covers in public/images/
      },
  ];

  const currentSong = songs[currentSongIndex];

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, isRepeating]);

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted, currentSongIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    let nextIndex;
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    setCurrentSongIndex(nextIndex);
    setCurrentTime(0);
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  const prevSong = () => {
    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * songs.length);
    } else {
      prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    }
    setCurrentSongIndex(prevIndex);
    setCurrentTime(0);
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="music-player-container">
      <audio ref={audioRef} src={currentSong.src} />
      
      {/* Dynamic Island Container */}
      <div 
        className={`dynamic-island ${isExpanded ? 'expanded' : 'collapsed'}`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {/* Collapsed State */}
        {!isExpanded && (
          <div className="collapsed-content">
            <Music className="w-4 h-4 text-white" />
            <div className="collapsed-info">
              {isPlaying && (
                <div className="wave-animation">
                  <div className="wave-bar wave-bar-1"></div>
                  <div className="wave-bar wave-bar-2"></div>
                  <div className="wave-bar wave-bar-3"></div>
                  <div className="wave-bar wave-bar-4"></div>
                </div>
              )}
              <span className="collapsed-text">
                {isPlaying ? 'Playing' : 'Music'}
              </span>
            </div>
          </div>
        )}

        {/* Expanded State */}
        {isExpanded && (
          <div className="expanded-content">
            {/* Header */}
            <div className="player-header">
              <h3 className="player-title">Now Playing</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                className="close-btn"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>

            {/* Album Art */}
            <div className="album-section">
              <div className="album-art-container">
                {currentSong.cover ? (
                  <img 
                    src={currentSong.cover} 
                    alt={currentSong.title}
                    className="album-art"
                    onLoad={(e) => {
                      // Hide placeholder when image loads successfully
                      const placeholder = e.target.parentElement.querySelector('.album-placeholder');
                      if (placeholder) {
                        placeholder.style.display = 'none';
                      }
                    }}
                    onError={(e) => {
                      // Show placeholder when image fails to load
                      e.target.style.display = 'none';
                      const placeholder = e.target.parentElement.querySelector('.album-placeholder');
                      if (placeholder) {
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div className="album-placeholder" style={{display: currentSong.cover ? 'none' : 'flex'}}>
                  <Music />
                </div>
              </div>
            </div>

            {/* Song Info */}
            <div className="song-info">
              <h4 className="song-title">
                {currentSong.title}
              </h4>
              <p className="song-artist">
                {currentSong.artist}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
              <div 
                className="progress-bar-container"
                onClick={handleSeek}
              >
                <div 
                  className="progress-bar"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                />
              </div>
              <div className="progress-time">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="controls-section">
              <button
                onClick={() => setIsShuffled(!isShuffled)}
                className={`control-btn ${isShuffled ? 'active' : 'secondary'}`}
              >
                <Shuffle />
              </button>
              
              <button
                onClick={prevSong}
                className="control-btn secondary"
              >
                <SkipBack />
              </button>
              
              <button
                onClick={togglePlay}
                className="control-btn play-pause"
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>
              
              <button
                onClick={nextSong}
                className="control-btn secondary"
              >
                <SkipForward />
              </button>
              
              <button
                onClick={() => setIsRepeating(!isRepeating)}
                className={`control-btn ${isRepeating ? 'active' : 'secondary'}`}
              >
                <Repeat />
              </button>
            </div>

            {/* Mute Control */}
            <div className="mute-section">
              <button
                onClick={toggleMute}
                className="mute-btn"
              >
                {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicMusicPlayer;