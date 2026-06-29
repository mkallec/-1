import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SEO_CONFIG } from '@/lib/movie-constants'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: `${SEO_CONFIG.site_name}|免费在线观看日本电影韩国电影高清1080P`,
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  authors: [{ name: SEO_CONFIG.author }],
  creator: SEO_CONFIG.author,
  publisher: SEO_CONFIG.site_name,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  alternates: {
    canonical: 'https://rihaneledianying.com',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://rihaneledianying.com',
    siteName: SEO_CONFIG.site_name,
    title: `${SEO_CONFIG.site_name}|免费在线观看日本电影韩国电影`,
    description: '日韩电影网提供最新最热的日本电影、韩国电影、日剧、韩剧在线观看，高清1080P和4K超清，支持手机平板电脑多设备播放',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '日韩电影网-免费在线观看日本电影韩国电影',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SEO_CONFIG.site_name}|免费在线观看日本电影韩国电影`,
    description: SEO_CONFIG.description,
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
