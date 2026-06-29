'use client';

import { Zap, Sparkles, Shield, Download } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: '4K 超清画质',
      description: '享受业界最高标准的视频质量',
    },
    {
      icon: Sparkles,
      title: '即时更新',
      description: '每日更新最新的日韩电影作品',
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '100%安全的观影体验，无广告骚扰',
    },
    {
      icon: Download,
      title: '离线下载',
      description: '一键下载，随时随地离线观看',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-red-500/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center mb-4">核心功能</h2>
        <p className="text-center text-gray-400 mb-16 text-lg">体验极致的电影观影平台</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="icon-box w-fit mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
