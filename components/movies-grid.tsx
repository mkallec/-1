'use client';

import MovieCard from './movie-card';
import { movieTitles, movieDescriptions, movieTags } from '@/lib/movie-constants';
import { generateMovieList } from '@/lib/movie-utils';
import { gridClasses } from '@/lib/tailwind-classes';

const movies = generateMovieList(36, movieTitles, movieDescriptions, movieTags);

export default function MoviesGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="section-title mb-2">精选电影</h2>
          <p className="text-gray-400">最新的日韩精品电影作品在这里等你发现</p>
        </div>

        <div className={gridClasses.container}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                image={movie.image}
                rating={movie.rating}
                year={movie.year}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
