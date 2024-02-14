import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { RedirectProvider } from '@/components/RedirectProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MotoStudio Venezuela',
  description: 'Paga en cuotas tu moto nueva'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html className=' scrollbar-thumb-[#243984] scrollbar-track-black scrollbar-thin h-32 overflow-y-scroll' lang='es' suppressHydrationWarning={true}>
          <body className={inter.className}>
            <NavBar />
            {children}
          </body>
        </html>
      </ClerkProvider>
  )
}
