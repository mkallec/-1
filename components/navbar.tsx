'use client';

import Link from 'next/link';
import { Play, Heart, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="nav-transparent">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Play className="w-8 h-8 text-accent group-hover:rotate-90 transition-transform" />
          <span className="text-2xl font-bold bg-gradient-to-r from-accent to-red-300 bg-clip-text text-transparent">
            日韩电影网
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-white/80 hover:text-accent transition-colors">
            首页
          </Link>
          <Link href="/movies" className="text-white/80 hover:text-accent transition-colors">
            全部电影
          </Link>
          <Link href="/" className="text-white/80 hover:text-accent transition-colors">
            热门
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Search className="w-5 h-5 text-white/60" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Heart className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>
    </nav>
  );
}
