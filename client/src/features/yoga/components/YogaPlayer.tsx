import React, { useEffect, useRef, useState } from 'react';

interface YogaPlayerProps {
  src: string;
  title: string;
  duration?: number;
}

interface IconProps {
  className?: string;
}

const PlayIcon: React.FC<IconProps> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.28-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
  </svg>
);

const PauseIcon: React.FC<IconProps> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M6 5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1Zm7 0a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1Z" />
  </svg>
);

const VolumeIcon: React.FC<IconProps> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M11 5.17a1 1 0 0 0-1.62-.78L5.7 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.7l3.68 3.61A1 1 0 0 0 11 19.83ZM16.5 8.5a1 1 0 0 1 0 1.41 3.99 3.99 0 0 0 0 5.66 1 1 0 1 1-1.41 1.41 6 6 0 0 1 0-8.49 1 1 0 0 1 1.41.01Zm3.54-2.12a1 1 0 0 1 0 1.41 7.99 7.99 0 0 0 0 11.31 1 1 0 1 1-1.41 1.41 10 10 0 0 1 0-14.14 1 1 0 0 1 1.41.01Z" />
  </svg>
);

const MuteIcon: React.FC<IconProps> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M11 5.17a1 1 0 0 0-1.62-.78L5.7 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.7l3.68 3.61A1 1 0 0 0 11 19.83Zm8.29 4.83 1.71-1.71a1 1 0 1 0-1.41-1.41l-1.71 1.71-1.71-1.71a1 1 0 0 0-1.41 1.41L16.47 10l-1.71 1.71a1 1 0 1 0 1.41 1.41l1.71-1.71 1.71 1.71a1 1 0 0 0 1.41-1.41Z" />
  </svg>
);

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '00:00';
  }

  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${mins}:${secs}`;
};

export const YogaPlayer: React.FC<YogaPlayerProps> = ({
  src,
  title,
  duration: initialDuration,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(initialDuration || 0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const handleLoadedMetadata = () => setDuration(video.duration || initialDuration || 0);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime || 0);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [initialDuration]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.pause();
    video.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  }, [src]);

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await video.play();
      setIsPlaying(true);
    } catch (error) {
      void error;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    setIsMuted(!isMuted);
    video.muted = !isMuted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    video.volume = newVolume;
  };

  return (
    <div className="space-y-4 rounded-2xl bg-slate-900 p-4">
      <video ref={videoRef} src={src} className="w-full rounded-lg bg-black" title={title} />

      <div className="space-y-3">
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-emerald-500"
          aria-label="Video progress"
        />

        {/* Time Display */}
        <div className="flex justify-between text-xs text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayback}
            className="flex items-center justify-center rounded-full bg-emerald-500 p-3 text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          {/* Volume Controls */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-slate-300 transition-colors hover:text-white"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MuteIcon /> : <VolumeIcon />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-slate-700 accent-emerald-500"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
