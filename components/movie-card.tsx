'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, Star, Bookmark } from 'lucide-react';
import { movieDescriptions, movieTags } from '@/lib/movie-constants';
import { getMovieDescription, getMovieTags } from '@/lib/movie-utils';
import { movieCardClasses, movieInfoClasses, tagClasses } from '@/lib/tailwind-classes';

interface MovieCardProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
  description?: string;
  tags?: string[];
  duration?: string;
}

export default function MovieCard({ 
  id, 
  title, 
  image, 
  rating, 
  year, 
  description,
  tags,
  duration = '120分钟'
}: MovieCardProps) {
  const desc = description || getMovieDescription(id, movieDescriptions);
  const tagList = tags || getMovieTags(id, movieTags);
  
  return (
    <Link href={`/movie/${id}`}>
      <div className={movieCardClasses.container}>
        {/* 海报图片 */}
        <div className={movieCardClasses.imageContainer}>
          <Image
            src={image}
            alt={title}
            fill
            className={movieCardClasses.imageElement}
          />
          {/* 悬停播放按钮 */}
          <div className={movieCardClasses.overlay}>
            <div className={movieCardClasses.playButton}>
              <div className={movieCardClasses.playButtonCircle}>
                <Play className="w-7 h-7 text-white fill-white" />
              </div>
              <span className={movieCardClasses.playButtonText}>立即播放</span>
            </div>
          </div>
        </div>

        {/* 信息区 */}
        <div className={movieInfoClasses.container}>
          {/* 评分和年份 */}
          <div className={movieInfoClasses.ratingRow}>
            <div className={movieInfoClasses.ratingGroup}>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className={movieInfoClasses.ratingValue}>{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500">|</span>
              <span className={movieInfoClasses.ratingYear}>{year}年</span>
            </div>
            <Bookmark className={movieInfoClasses.bookmarkButton} />
          </div>

          {/* 标题 */}
          <h3 className={movieInfoClasses.title}>{title}</h3>

          {/* 描述 */}
          <p className={movieInfoClasses.description}>{desc}</p>

          {/* 时长 */}
          <div className={movieInfoClasses.duration}>⏱ {duration}</div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {tagList.slice(0, 3).map((tag) => (
              <span key={tag} className={tagClasses}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
