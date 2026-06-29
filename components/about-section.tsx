'use client';

import { Globe, Users, Award, Zap } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-20 bg-card/30 border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {/* 标题和介绍 */}
        <div className="space-y-6">
          <div>
            <h2 className="section-title mb-4">关于日韩电影网</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent to-orange-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                日韩电影网是一个专业的日韩电影在线观看平台，致力于为观众提供最新、最热的日本电影、韩国电影、日剧和韩剧作品。我们与众多国际电影制片公司和发行商建立了合作关系，确保为用户提供高清正版的电影内容。自成立以来，日韩电影网已经成为日韩电影爱好者的首选平台，拥有大量的活跃用户。
              </p>
              <p>
                在日韩电影网，您不仅可以观看到最新发布的电影大片和热播电视剧，还能发现那些独立制作的艺术电影和经典佳作。我们的平台采用先进的推荐算法，根据您的观看历史和喜好，为您个性化推荐电影。无论您是日本电影的粉丝，还是韩国剧情片的爱好者，日韩电影网都能满足您的需求。
              </p>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                我们相信电影是一种跨越国界的通用语言，能够连接不同文化的观众。日本电影以其细腻的情感表达和创新的视觉语言著称，从宫崎骏的动画艺术到大师级导演的文艺作品，都展现了日本电影的多样性和深度。韩国电影则以其强大的故事叙述能力和高超的制作水准赢得了国际认可，无论是悬念惊悚片、浪漫爱情片还是社会话题剧，都能看到韩国电影的精妙构思。
              </p>
              <p>
                日韩电影网为每部电影提供详细的信息页面，包括导演、演员、剧情介绍、用户评分和评论。这让您能够在观看前全面了解电影，做出最佳选择。我们还定期举办线上电影节和讨论活动，让观众们可以分享观影体验和感受，建立活跃的电影爱好者社区。
              </p>
            </div>
          </div>
        </div>

        {/* 四大特色 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="feature-card group">
            <div className="icon-box mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-accent transition-colors">全球内容</h3>
            <p className="text-sm text-gray-400">与全球顶级制片公司合作，提供最新的日韩电影作品和国际精选电影。</p>
          </div>

          <div className="feature-card group">
            <div className="icon-box mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-accent transition-colors">社区互动</h3>
            <p className="text-sm text-gray-400">与来自世界各地的电影爱好者交流，分享观影感受，发现志同道合的朋友。</p>
          </div>

          <div className="feature-card group">
            <div className="icon-box mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-accent transition-colors">品质保证</h3>
            <p className="text-sm text-gray-400">所有内容均经过严格审核和授权，提供正版高清的观看体验和最佳画质。</p>
          </div>

          <div className="feature-card group">
            <div className="icon-box mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-accent transition-colors">快速更新</h3>
            <p className="text-sm text-gray-400">每周更新最新电影，第一时间为您带来院线大片和网络独家内容。</p>
          </div>
        </div>

        {/* 详细介绍 */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold text-white">为什么选择CinemaFlix</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-accent mb-2">丰富的内容库</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  CinemaFlix拥有超过5000部精选的日韩电影作品，涵盖各种类型和风格。从文艺片到商业大片，从古装剧到现代爱情片，您都能在这里找到。我们定期更新电影库，确保您总是能看到最新的作品。每部电影都经过严格的筛选，保证质量和观赏价值。
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-accent mb-2">个性化推荐系统</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  我们的AI推荐引擎会根据您的观看历史、评分记录和浏览行为，为您推荐最符合您口味的电影。这个系统不断学习和改进，确保您每次打开应用都能发现新的惊喜。个性化的体验让您节省时间，快速找到真正喜欢的电影。
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-accent mb-2">超高清画质</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  所有电影都提供多种清晰度选择，从标清到4K超高清，适应不同的网络环境和设备需求。我们采用先进的视频编码技术，在保证画质的同时优化文件大小，让您享受流畅的观看体验。
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-accent mb-2">离线下载功能</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  付费会员可以下载喜欢的电影到本地设备，在没有网络的情况下随时观看。这个功能特别适合旅行和移动场景，让您不受网络限制地享受电影。所有下载的内容都受DRM保护，确保版权安全。
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-accent mb-2">多设备同步</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  登录您的账户，可在手机、平板、电脑等多个设备上无缝切换观看。系统会记住您的播放进度，让您可以在一个设备上开始观看，在另一个设备上继续观看。这种灵活性让您随时随地享受电影。
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-accent mb-2">专业评论和资讯</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  我们的电影评论家和编辑团队定期撰写深度影评和电影资讯，帮助您更好地理解和欣赏电影。您也可以在社区中分享自己的观影笔记，与其他用户讨论电影中的细节和主题。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 用户见证 */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold text-white">用户见证</h3>
          <p className="text-gray-400">
            成千上万的用户通过CinemaFlix发现了他们最喜爱的电影。他们在社区中分享观影体验，建立了一个充满热情和创意的电影爱好者社区。无论是第一次接触日韩电影的新手，还是多年的资深影迷，都能在CinemaFlix找到属于自己的电影天地。
          </p>
        </div>

        {/* 联系信息 */}
        <div className="space-y-4 pt-8 border-t border-white/10">
          <h3 className="text-xl font-bold text-white">联系我们</h3>
          <p className="text-gray-400">
            如果您有任何问题、建议或版权投诉，欢迎通过以下方式与我们联系。我们致力于为您提供最好的服务体验。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-card/50 rounded-lg border border-white/5 hover:border-accent/30 transition-colors">
              <p className="text-sm text-gray-400 mb-1">电子邮件</p>
              <p className="text-white font-semibold">support@cinemaflix.com</p>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border border-white/5 hover:border-accent/30 transition-colors">
              <p className="text-sm text-gray-400 mb-1">联系电话</p>
              <p className="text-white font-semibold">+86-010-XXXX-XXXX</p>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border border-white/5 hover:border-accent/30 transition-colors">
              <p className="text-sm text-gray-400 mb-1">官方微博</p>
              <p className="text-white font-semibold">@CinemaFlix官方</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
