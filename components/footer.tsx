'use client';

import Link from 'next/link';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* 主要信息 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* 关于 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">关于日韩电影网</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              日韩电影网是专业的日韩电影在线观看平台，致力于为观众提供最新、最热的日本电影、韩国电影、日剧、韩剧资源。
            </p>
          </div>

          {/* 快速链接 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-accent transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-gray-400 hover:text-accent transition-colors">
                  全部电影
                </Link>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-accent transition-colors">
                  关于我们
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-accent transition-colors">
                  联系我们
                </a>
              </li>
            </ul>
          </div>

          {/* 用户服务 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">用户服务</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#faq" className="text-gray-400 hover:text-accent transition-colors">
                  常见问题
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-accent transition-colors">
                  隐私政策
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-accent transition-colors">
                  使用条款
                </a>
              </li>
              <li>
                <a href="#feedback" className="text-gray-400 hover:text-accent transition-colors">
                  用户反馈
                </a>
              </li>
            </ul>
          </div>

          {/* 联系信息 */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg">联系我们</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-accent" />
                <span>support@rihaneledianying.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-accent" />
                <span>+86-010-XXXX-XXXX</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                <span>北京市朝阳区某街道123号</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-white/10 py-8 space-y-6">
          {/* 法律和政策文本 */}
          <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
            <p>
              本网站上的所有内容，包括但不限于文字、图像、视频等，均受版权保护。未经许可，不得复制、传播、转载或以其他方式使用。日韩电影网致力于保护知识产权，反对一切侵权行为。如您认为本网站的内容侵犯了您的权利，请立即联系我们。
            </p>
            <p>
              所有用户在使用本网站时，应遵守中国法律法规和国际条约。日韩电影网保留随时修改、暂停或终止服务的权利。我们不承担任何因用户使用本网站而产生的直接或间接损失的责任。
            </p>
            <p>
              日韩电影网采用最先进的安全技术保护用户数据，但无法保证100%的安全性。用户应自行采取措施保护个人账户信息。我们不收集或使用用户的敏感个人信息，所有数据都按照隐私政策严格保护。
            </p>
          </div>

          {/* 底部栏 */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {currentYear} 日韩电影网. 保留所有权利。</span>
              <Heart className="w-4 h-4 text-accent fill-accent" />
              <span>专业日韩电影平台</span>
            </div>

            {/* 社交媒体链接 */}
            <div className="flex gap-4">
              {['微博', '微信', 'B站', '抖音'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-500 hover:text-accent transition-colors text-sm font-medium"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
