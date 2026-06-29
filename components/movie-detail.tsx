'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Heart, Share2, ChevronLeft } from 'lucide-react';
import VideoPlayer from './video-player';

interface MovieDetailProps {
  id: number;
}

export default function MovieDetail({ id }: MovieDetailProps) {
  const [showPlayer, setShowPlayer] = useState(false);

  const videoId = ((id - 1) % 10) + 1;
  const imageId = ((id - 1) % 150) + 1;

  const generateRating = (movieId: number) => {
    const seed = movieId * 7919;
    const normalized = ((seed % 100) / 100);
    return parseFloat((normalized * 2 + 7.5).toFixed(1));
  };

  const generateYear = (movieId: number) => {
    const seed = movieId * 3571;
    return 2024 - (seed % 5);
  };

  const movie = {
    id,
    title: `日韩电影 ${String(id).padStart(2, '0')}`,
    year: generateYear(id),
    rating: generateRating(id),
    director: '导演',
    actors: ['演员A', '演员B', '演员C'],
    genre: ['剧情', '爱情', '悬疑'],
    duration: '120分钟',
    synopsis:
      '这是一部精彩的日韩电影作品。影片以其独特的叙事手法和精妙的视听表达，为观众呈现了一个引人入胜的故事。主角的成长历程与心理变化,影片细节的处理都恰到好处,整个故事充满了张力和情感。推荐所有喜爱电影艺术的观众观看。',
  };

  return (
    <>
      <div className="pt-20 pb-12 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 text-accent hover:text-red-400 transition-colors mb-8"
          >
            <ChevronLeft className="w-5 h-5" />
            返回电影列表
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-1">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl shadow-black/50 group">
                <Image
                  src={`/assets/${imageId}.jpg`}
                  alt={movie.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button
                  onClick={() => setShowPlayer(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors"
                >
                  <div className="p-4 rounded-full bg-accent/80 hover:bg-accent text-white transition-colors">
                    <Play className="w-8 h-8 fill-white" />
                  </div>
                </button>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-300">
                  <Play className="w-5 h-5" />
                  播放
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-white/30 text-white rounded-lg hover:border-accent hover:text-accent transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-white/30 text-white rounded-lg hover:border-accent hover:text-accent transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>

              <div className="flex flex-wrap gap-4 mb-8 text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold text-xl">⭐{movie.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">(评分)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{movie.year}</span>
                  <span className="text-sm text-gray-500">年</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{movie.duration}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-400 text-sm uppercase font-semibold mb-2">导演</h3>
                  <p className="text-white text-lg">{movie.director}</p>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm uppercase font-semibold mb-2">主演</h3>
                  <div className="flex flex-wrap gap-3">
                    {movie.actors.map((actor, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 text-white rounded-full text-sm">
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm uppercase font-semibold mb-2">类型</h3>
                  <div className="flex flex-wrap gap-3">
                    {movie.genre.map((g, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 border border-accent/50 text-accent rounded-full text-sm hover:bg-accent/20 transition-colors cursor-pointer"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm uppercase font-semibold mb-2">剧情简介</h3>
                  <p className="text-white/80 leading-relaxed text-base">{movie.synopsis}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-16">
            <h2 className="text-3xl font-bold text-white mb-8">相关推荐</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }, (_, i) => {
                const relatedId = ((id + i + 1) % 36) + 1;
                return (
                  <Link
                    key={i}
                    href={`/movie/${relatedId}`}
                    className="card-movie relative h-56 rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={`/assets/${((relatedId - 1) % 150) + 1}.jpg`}
                      alt="Related Movie"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="card-overlay">
                      <Play className="w-6 h-6 text-accent mx-auto" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showPlayer && (
        <VideoPlayer
          src={`/assets/${videoId}.mp4`}
          title={movie.title}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  );
}
