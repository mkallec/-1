'use client';

import Image from 'next/image';
import { Play, Info } from 'lucide-react';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <div className="relative h-screen bg-black overflow-hidden pt-16">
      <div className="absolute inset-0">
        <Image
          src="/assets/1.jpg"
          alt="Featured Movie"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                2024 新作
              </span>
              <span className="text-yellow-400 flex items-center gap-1">
                ⭐ 8.9/10
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
              日韩电影
              <span className="bg-gradient-to-r from-accent via-red-400 to-orange-400 bg-clip-text text-transparent">
                {' '}盛宴
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
              探索最新最热的日本和韩国电影作品，体验高清影视盛宴，品味东方电影艺术的精妙之处。
            </p>

            <div className="flex gap-4">
              <button className="group flex items-center gap-2 px-8 py-3 bg-accent hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-accent/50">
                <Play className="w-5 h-5" />
                立即观看
              </button>
              <Link href="/movies">
                <button className="flex items-center gap-2 px-8 py-3 border border-white/30 hover:border-accent text-white rounded-lg font-semibold transition-all duration-300 hover:bg-accent/10">
                  <Info className="w-5 h-5" />
                  查看更多
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}
