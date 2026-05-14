import React, { useEffect, useMemo, useRef, useState } from 'react';

interface TherapyPlayerProps {
  src: string;
  title: string;
}

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

export const TherapyPlayer: React.FC<TherapyPlayerProps> = ({ src, title }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [src]);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const progressPercentage = useMemo(() => {
    if (!duration) {
      return 0;
    }

    return Math.min((currentTime / duration) * 100, 100);
  }, [currentTime, duration]);

  return (
    <section className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/50 to-sky-50/70 p-5 shadow-sm sm:p-6">
      <audio ref={audioRef} src={src} preload="metadata" aria-label={`Audio player for ${title}`} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-emerald-700/80">Now Playing</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">{title}</h2>
        </div>

        <button
          type="button"
          onClick={togglePlayback}
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          aria-label={isPlaying ? 'Pause therapy session' : 'Play therapy session'}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="mt-5 space-y-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-100" aria-hidden="true">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <label htmlFor="therapy-progress" className="sr-only">
          Seek playback position
        </label>
        <input
          id="therapy-progress"
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-emerald-600"
          aria-valuemin={0}
          aria-valuemax={duration || 0}
          aria-valuenow={currentTime}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        />

        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </section>
  );
};
