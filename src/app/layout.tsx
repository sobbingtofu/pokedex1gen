import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

import Header from "./_components/Header"
import QueryProvider from "./_components/ReactQueryClientProvider/ReactQueryClientProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pokedex",
  description: "all about your pokemon",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
