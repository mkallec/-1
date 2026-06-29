'use client';

import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  title: string;
  onClose?: () => void;
}

export default function VideoPlayer({ src, title, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const formatTime = (time: number) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full h-full max-w-6xl flex flex-col rounded-2xl overflow-hidden bg-black shadow-2xl">
        {/* 播放器头部 */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-black via-black/80 to-black/60 border-b border-white/10">
          <h2 className="text-white font-bold text-lg truncate">{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all hover:scale-110"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          )}
        </div>

        {/* 视频容器 */}
        <div className="flex-1 relative bg-black group overflow-hidden">
          <video
            ref={videoRef}
            src={src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-contain"
            crossOrigin="anonymous"
          />

          {/* 中心播放/暂停按钮 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="p-6 rounded-full bg-accent/90 hover:bg-accent shadow-2xl transform hover:scale-110 transition-all"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" />
              ) : (
                <Play className="w-10 h-10 text-white fill-white" />
              )}
            </button>
          </div>

          {/* 底部控制条 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* 进度条 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative h-1.5 bg-white/20 rounded-full cursor-pointer group/progress hover:h-2 transition-all">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10"
                />
                <div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-red-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all"
                  style={{ left: `calc(${progress}% - 8px)` }}
                />
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all hover:text-accent group/btn"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  ) : (
                    <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform fill-current" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all hover:text-accent group/btn"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  ) : (
                    <Volume2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  )}
                </button>
                <span className="text-sm font-medium text-gray-300 min-w-[80px]">
                  {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                </span>
              </div>
              <button className="p-2 hover:bg-white/20 rounded-lg transition-all hover:text-accent group/btn">
                <Maximize className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
