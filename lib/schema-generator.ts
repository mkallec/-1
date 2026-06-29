/**
 * 生成Schema结构化数据，用于搜索引擎理解和展示
 */

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '日韩电影网',
  url: 'https://rihaneledianying.com',
  description: '日韩电影网-免费在线观看日本电影和韩国电影的综合平台',
  logo: 'https://rihaneledianying.com/logo.png',
  sameAs: [
    'https://weibo.com/rihaneledianying',
    'https://www.douyin.com/user/rihaneledianying',
  ],
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://rihaneledianying.com',
  name: '日韩电影网 - 免费在线观看日本电影韩国电影',
  description: '日韩电影网提供最新最热的日本电影、韩国电影、日剧、韩剧在线观看，支持高清1080P和4K超清',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://rihaneledianying.com/movies?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
});

export const generateMovieSchema = (movie: {
  id: number;
  title: string;
  description: string;
  rating: number;
  year: number;
  image: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: movie.title,
  description: movie.description,
  url: `https://rihaneledianying.com/movie/${movie.id}`,
  image: `https://rihaneledianying.com${movie.image}`,
  datePublished: `${movie.year}-01-01`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: movie.rating,
    bestRating: '10',
    worstRating: '0',
    ratingCount: '100',
  },
});

export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateVideoSchema = (video: {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: video.title,
  description: video.description,
  thumbnailUrl: video.thumbnailUrl,
  uploadDate: video.uploadDate,
  duration: video.duration,
});
