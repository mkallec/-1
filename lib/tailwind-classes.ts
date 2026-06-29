/**
 * 电影卡片样式类
 */
export const movieCardClasses = {
  container: 'bg-card rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-300 h-full flex flex-col hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-1',
  imageContainer: 'relative w-full aspect-video group overflow-hidden bg-black/50 flex-shrink-0',
  overlay: 'absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center',
  playButton: 'opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2',
  playButtonCircle: 'w-14 h-14 rounded-full bg-accent hover:bg-red-600 transition-colors flex items-center justify-center shadow-lg',
  playButtonText: 'text-xs font-semibold text-white mt-1',
  imageElement: 'object-cover w-full h-full group-hover:scale-110 transition-transform duration-300',
};

/**
 * 电影信息区样式
 */
export const movieInfoClasses = {
  container: 'p-4 space-y-3',
  ratingRow: 'flex items-center justify-between',
  ratingGroup: 'flex items-center gap-2',
  ratingValue: 'text-sm font-bold text-white',
  ratingYear: 'text-xs text-gray-500',
  bookmarkButton: 'w-4 h-4 text-gray-500 hover:text-accent transition-colors cursor-pointer',
  title: 'text-white font-bold text-base line-clamp-2 leading-tight',
  description: 'text-gray-400 text-sm line-clamp-2 leading-relaxed',
  duration: 'text-xs text-gray-500',
};

/**
 * 标签样式
 */
export const tagClasses = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 transition-colors';

/**
 * 播放器样式
 */
export const playerClasses = {
  backdrop: 'fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4',
  container: 'w-full h-full max-w-6xl flex flex-col rounded-2xl overflow-hidden bg-black shadow-2xl',
  header: 'flex items-center justify-between px-6 py-4 bg-gradient-to-r from-black via-black/80 to-black/60 border-b border-white/10',
  title: 'text-white font-bold text-lg truncate',
  closeButton: 'p-2 hover:bg-white/20 rounded-lg transition-all hover:scale-110',
  videoContainer: 'flex-1 relative bg-black group overflow-hidden',
  video: 'w-full h-full object-contain',
  centerPlayButton: 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300',
  playButtonLarge: 'p-6 rounded-full bg-accent/90 hover:bg-accent shadow-2xl transform hover:scale-110 transition-all',
  controlsContainer: 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
  progressBar: 'flex items-center gap-3 mb-4',
  progressTrack: 'flex-1 relative h-1.5 bg-white/20 rounded-full cursor-pointer group/progress hover:h-2 transition-all',
  progressFill: 'absolute left-0 top-0 h-full bg-gradient-to-r from-accent to-red-500 rounded-full transition-all',
  progressThumb: 'absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all',
  controlsRow: 'flex items-center justify-between text-white',
  controlButtons: 'flex items-center gap-4',
  controlButton: 'p-2 hover:bg-white/20 rounded-lg transition-all hover:text-accent group/btn',
  timeDisplay: 'text-sm font-medium text-gray-300 min-w-[80px]',
};

/**
 * 网格容器样式
 */
export const gridClasses = {
  container: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max',
  trendingContainer: 'grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max',
};

/**
 * 页面容器样式
 */
export const pageClasses = {
  root: 'flex flex-col min-h-screen bg-background',
  main: 'flex-1',
};
