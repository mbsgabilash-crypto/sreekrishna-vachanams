import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anek_Malayalam, Noto_Sans_Malayalam } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const anek = Anek_Malayalam({
  subsets: ['malayalam', 'latin'],
  variable: '--font-anek',
  display: 'swap',
})

const noto = Noto_Sans_Malayalam({
  subsets: ['malayalam', 'latin'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ശ്രീകൃഷ്ണ വചനങ്ങൾ | Krishna-Inspired Malayalam Sayings',
  description:
    '2400 ശ്രീകൃഷ്ണ പ്രചോദിത വചനങ്ങൾ — കർമ്മം, ധർമ്മം, ഭക്തി, സ്നേഹം, ശാന്തി, ജ്ഞാനം എന്നിവയെക്കുറിച്ചുള്ള മലയാളം ചിന്തകൾ. Original Krishna-inspired Malayalam sayings on karma, dharma, devotion, love, peace and wisdom.',
  keywords: [
    'Krishna quotes Malayalam',
    'ശ്രീകൃഷ്ണ വചനങ്ങൾ',
    'Malayalam devotional sayings',
    'Krishna inspired quotes',
    'ഭക്തി വചനങ്ങൾ',
    'Malayalam quotes',
  ],
  authors: [{ name: 'ശ്രീകൃഷ്ണ വചനങ്ങൾ' }],
  generator: 'v0.app',
  openGraph: {
    title: 'ശ്രീകൃഷ്ണ വചനങ്ങൾ',
    description:
      '2400 ശ്രീകൃഷ്ണ പ്രചോദിത വചനങ്ങൾ — Original Krishna-inspired Malayalam sayings.',
    type: 'website',
    locale: 'ml_IN',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f4ec' },
    { media: '(prefers-color-scheme: dark)', color: '#161a2e' },
  ],
}

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var c=document.documentElement.classList;c.remove('light','dark');c.add(d?'dark':'light');}catch(e){document.documentElement.classList.add('light');}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ml"
      className={`${anek.variable} ${noto.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
