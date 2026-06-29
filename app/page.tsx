import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import HeroBanner from '@/components/hero-banner';
import FeaturesSection from '@/components/features-section';
import TrendingSection from '@/components/trending-section';
import MoviesGrid from '@/components/movies-grid';
import AboutSection from '@/components/about-section';
import Footer from '@/components/footer';
import { MultiSEOSchema } from '@/components/seo-schema';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/schema-generator';
import { SEO_CONFIG } from '@/lib/movie-constants';

export const metadata: Metadata = {
  title: `${SEO_CONFIG.site_name}|免费在线看日韩电影,日剧韩剧-最新高清1080P`,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  openGraph: {
    title: `${SEO_CONFIG.site_name}-免费在线观看日本电影韩国电影`,
    description: '日韩电影网提供最新日韩电影电视剧在线观看，高清1080P和4K超清，支持多设备播放和离线下载',
    url: 'https://rihaneledianying.com',
    type: 'website',
  },
};

export default function Page() {
  const schemas = [generateOrganizationSchema(), generateWebsiteSchema()];

  return (
    <>
      <MultiSEOSchema schemas={schemas} />
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroBanner />
          <FeaturesSection />
          <TrendingSection />
          <MoviesGrid />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
