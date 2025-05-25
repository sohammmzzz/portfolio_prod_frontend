import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Soham Das | Portfolio',
  description: 'Created with love',
  generator: 'Soham Das',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
