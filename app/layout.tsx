import "./globals.css"
import type { Metadata } from "next"
import { Roboto_Mono } from "next/font/google"
import Header from "./components/header"
import Footer from "./components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ptBR } from "./i18n/pt-BR"
import { AuthProvider } from "./contexts/AuthContext"
import { WishlistProvider } from "./contexts/WishlistContext"
import { CartProvider } from "./contexts/CartContext"
import CartDrawerWrapper from "./components/cart-drawer-wrapper"
import type React from "react"

const robotoMono = Roboto_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: ptBR.siteTitle,
  description: ptBR.siteDescription,
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${robotoMono.className} bg-white text-black min-h-screen`}>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="relative z-10">
                <Header />
                <main className="container mx-auto px-4 py-8 relative">{children}</main>
                <Footer />
                <CartDrawerWrapper />
              </div>
              <Toaster />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
