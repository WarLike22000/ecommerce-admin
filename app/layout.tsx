import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthContext from './context/AuthContext'
import ToastContext from './context/ToastContext'
import ModalProvider from '@/providers/ModalProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToastContext />
          <ModalProvider />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
