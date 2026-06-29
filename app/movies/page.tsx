import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import MovieCard from '@/components/movie-card';
import Footer from '@/components/footer';
import { MultiSEOSchema } from '@/components/seo-schema';
import { generateBreadcrumbSchema } from '@/lib/schema-generator';
import { movieTitles, movieDescriptions, movieTags } from '@/lib/movie-constants';
import { generateMovieList } from '@/lib/movie-utils';
import { gridClasses, pageClasses } from '@/lib/tailwind-classes';

interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  year: number;
}

export const metadata: Metadata = {
  title: '全部日韩电影大全_日本电影韩国电影列表 - 日韩电影网',
  description: '日韩电影网电影大全，精选36部高质量的日本电影、韩国电影、日剧、韩剧资源，最新更新高清1080P和4K超清影片，支持在线观看和离线下载',
  keywords: '日韩电影大全,日本电影列表,韩国电影列表,日剧大全,韩剧大全,电影在线观看,高清电影,电影资源',
  openGraph: {
    title: '全部日韩电影大全 - 日韩电影网',
    description: '浏览最新日韩电影、日剧、韩剧，高清1080P和4K超清在线观看',
    url: 'https://rihaneledianying.com/movies',
    type: 'website',
  },
};

const movies: Movie[] = generateMovieList(36, movieTitles, movieDescriptions, movieTags);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: '首页', url: 'https://rihaneledianying.com' },
  { name: '全部电影', url: 'https://rihaneledianying.com/movies' },
]);

export default function MoviesPage() {
  return (
    <>
      <MultiSEOSchema schemas={[breadcrumbSchema]} />
      <div className={pageClasses.root}>
        <Navbar />
        <main className={pageClasses.main}>
          <div className="pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-16">
                <h1 className="text-5xl font-bold text-white mb-4">全部电影</h1>
                <p className="text-gray-400 text-lg">
                  浏览我们精心收集的{movies.length}部日韩精品电影，涵盖各种风格和类型的优质作品。每部电影都经过严格筛选，确保为您提供最佳的观影体验。
                </p>
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
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
