'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Calendar, Users, Trophy } from 'lucide-react';

const trendingMovies = [
  {
    id: 1,
    title: '四光焦躁见闻记',
    image: '/assets/1.jpg',
    category: '爱情·文艺',
    views: '245万',
    rating: 8.5,
    description: '一部令人深思的爱情电影，讲述了两个灵魂在城市喧嚣中的相遇与救赎。细腻的镜头语言和深刻的人物塑造让这部电影成为年度佳作。',
  },
  {
    id: 2,
    title: '小镇逃离',
    image: '/assets/2.jpg',
    category: '青春·悬疑',
    views: '189万',
    rating: 8.2,
    description: '年度最燃青春剧，大城市的网红主播回归小镇，发生一系列离奇故事。悬念迭起，引发观众思考关于小镇秘密的真相。',
  },
  {
    id: 3,
    title: '白沙岛的异兽传说',
    image: '/assets/3.jpg',
    category: '悬疑·冒险',
    views: '312万',
    rating: 8.7,
    description: '白沙岛上的惊悚冒险，一名失踪者归来，却成为全村解开谜团的关键。紧张的剧情和震撼的转折让这部电影成为年度黑马。',
  },
];

export default function TrendingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* 标题 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-accent" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              最新热播
            </h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            按年份与日历顺序精选近期内容，覆盖电影、剧集与多类型故事。我们为您精心挑选了最值得关注的作品，这些电影不仅在专业评分上表现卓越，更在社区中引发了广泛的讨论。无论是文艺爱好者还是商业大片迷，这个精选列表都能满足您的需求。
          </p>
        </div>

        {/* 热播电影卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max">
          {trendingMovies.map((movie, index) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="h-full">
              <div className="group h-full rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 bg-card/50 hover:bg-card hover:-translate-y-1 flex flex-col">
                {/* 图片容器 */}
                <div className="relative w-full aspect-video overflow-hidden flex-shrink-0">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* 排名徽章 */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">#{index + 1}</span>
                  </div>
                </div>

                {/* 内容区 */}
                <div className="p-5 space-y-4 flex-1 flex flex-col">
                  {/* 分类标签 */}
                  <div className="flex gap-2">
                    {movie.category.split('·').map((cat) => (
                      <span key={cat} className="px-2 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent">
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* 标题 */}
                  <h3 className="text-white font-bold text-lg line-clamp-2 group-hover:text-accent transition-colors">
                    {movie.title}
                  </h3>

                  {/* 描述 */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {movie.description}
                  </p>

                  {/* 底部统计 */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-white font-semibold">{movie.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-400">{movie.views}</span>
                      </div>
                    </div>
                    <span className="text-xs text-accent font-medium">查看详情 →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 热播说明文字 */}
        <div className="bg-card/50 border border-white/10 rounded-xl p-8 space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-accent" />
            热播更新说明
          </h3>
          <p className="text-gray-400 leading-relaxed">
            CinemaFlix的"最新热播"栏目每周更新一次，选取那些在观众中最受欢迎、讨论度最高的电影作品。我们的选片团队由专业的电影评论家和编辑组成，他们会综合考虑用户评分、社区讨论热度、专业评价等多个维度，为您呈现最值得观看的电影。这个栏目不仅展示了当前最热门的电影，更是一个发现高质量作品的窗口。在这里，您可以看到各种风格和类型的电影，从温暖治愈的爱情故事到惊险刺激的冒险电影，应有尽有。
          </p>
          <p className="text-gray-400 leading-relaxed">
            我们相信每一部电影都有其独特的价值和魅力。无论是大制作的商业电影，还是独立制作的艺术电影，只要它能触动人心、启发思想，就值得被看见。通过"最新热播"栏目，我们希望帮助观众快速找到真正符合自己口味的电影，同时也帮助优秀的电影作品找到属于它们的观众。
          </p>
        </div>

        {/* 查看全部 */}
        <div className="text-center">
          <Link href="/movies">
            <button className="px-8 py-3 bg-gradient-to-r from-accent to-orange-500 hover:from-accent/80 hover:to-orange-500/80 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105">
              查看全部电影
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
