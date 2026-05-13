import React, { useRef, useState, useEffect } from 'react';

interface TherapyPlayerProps {
  audioUrl: string;
  title: string;
  className?: string;
}

export const TherapyPlayer: React.FC<TherapyPlayerProps> = ({
  audioUrl,
  title,
  className = '',
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions silently
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (time: number): string => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-6 ${className}`}
    >
      <audio ref={audioRef} src={audioUrl} crossOrigin="anonymous" />

      {/* Player Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">Now Playing</p>
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">{title}</h3>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-500"
          aria-label="Audio progress"
        />
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md transition-all hover:bg-emerald-600 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          {isPlaying ? (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default TherapyPlayer;
