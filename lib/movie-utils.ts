/**
 * 根据电影ID生成一致的评分
 * 使用质数作为乘数保证分布均匀且确定性
 */
export const generateRating = (id: number): number => {
  const seed = id * 7919;
  const normalized = ((seed % 100) / 100);
  return parseFloat((normalized * 2 + 7.5).toFixed(1));
};

/**
 * 根据电影ID生成一致的年份
 * 确保服务端和客户端渲染一致，避免 hydration 错误
 */
export const generateYear = (id: number): number => {
  const seed = id * 3571;
  return 2024 - (seed % 5);
};

/**
 * 获取电影的描述文本
 */
export const getMovieDescription = (id: number, descriptions: { [key: number]: string }): string => {
  return descriptions[id] || '精彩的电影，值得一看';
};

/**
 * 获取电影的标签
 */
export const getMovieTags = (id: number, tags: { [key: number]: string[] }): string[] => {
  return tags[id] || ['电影'];
};

/**
 * 格式化视频时长（秒 -> MM:SS）
 */
export const formatTime = (seconds: number): string => {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * 生成电影列表
 */
export const generateMovieList = (
  count: number,
  titles: string[],
  descriptions: { [key: number]: string },
  tags: { [key: number]: string[] }
) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: titles[i] || `日韩电影 ${String(i + 1).padStart(2, '0')}`,
    image: `/assets/${((i % 150) + 1)}.jpg`,
    rating: generateRating(i + 1),
    year: generateYear(i + 1),
    description: getMovieDescription(i + 1, descriptions),
    tags: getMovieTags(i + 1, tags),
  }));
};
