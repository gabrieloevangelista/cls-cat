"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { ptBR } from "../i18n/pt-BR"
import { useAuth } from "../contexts/AuthContext"
import { useCart } from "../contexts/CartContext"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const { user, logout } = useAuth()
  const { cartItems, openCart } = useCart()

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white border-b-4 border-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold tracking-tighter uppercase">
            CLS Catalog
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-black hover:underline font-mono uppercase">
                  {ptBR.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-black hover:underline font-mono uppercase">
                  {ptBR.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-black hover:underline font-mono uppercase">
                  {ptBR.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black hover:underline font-mono uppercase">
                  {ptBR.nav.contact}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={openCart} className="border-2 border-black relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-black text-white border-2 border-white h-6 w-6 flex items-center justify-center p-0 rounded-full">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            {user ? (
              <>
                <span className="font-mono uppercase">{user.name}</span>
                <Button
                  onClick={logout}
                  className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-white text-black hover:bg-black hover:text-white border-2 border-black font-mono uppercase"
                >
                  <Link href="/register">Registro</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
