"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ptBR } from "../i18n/pt-BR"
import { Trash2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Breadcrumb, { useBreadcrumb } from "../components/breadcrumb"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [removingId, setRemovingId] = useState<number | null>(null)
  const breadcrumbItems = useBreadcrumb()

  useEffect(() => {
    // Simular carregamento de itens do carrinho
    setCartItems([
      { id: 1, title: "Casa Moderna", price: 3500, quantity: 1, image: "/images/modern-house.jpg" },
      {
        id: 2,
        title: "Apartamento Compacto",
        price: 1500,
        quantity: 1,
        image: "/images/compact-apartment.jpg",
      },
    ])
  }, [])

  const removeFromCart = (id: number) => {
    setRemovingId(id)

    // Pequeno atraso para a animação
    setTimeout(() => {
      setCartItems(cartItems.filter((item) => item.id !== id))
      setRemovingId(null)
    }, 300)
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center gap-3 border-b-4 border-black pb-4 mb-8">
        <ShoppingCart className="h-8 w-8" />
        <h1 className=\"text-3xl font-bold uppercase\">Carrinho de Compras</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center border-4 border-black p-8">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 stroke-gray-400" />
          <p className="text-xl mb-4 font-mono">{ptBR.cart.empty}</p>
          <Button
            asChild
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase transition-colors duration-300"
          >
            <Link href="/">{ptBR.cart.continueShopping}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`
                  flex items-center justify-between py-4 border-b-2 border-black
                  transition-all duration-300 ease-in-out
                  ${removingId === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"}
                `}
              >
                <div className="flex items-center">
                  <div className="relative h-24 w-24 border-2 border-black">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-none"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-bold uppercase">{item.title}</h2>
                    <p className="font-mono">R$ {item.price.toLocaleString("pt-BR")}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="mr-2 font-mono">{ptBR.cart.quantity}</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                    className="w-16 p-2 border-2 border-black rounded-none font-mono"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 hover:bg-red-500 hover:text-white transition-colors duration-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-1">
            <div className="border-4 border-black p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 uppercase">{ptBR.cart.orderSummary}</h2>
              <div className="flex justify-between mb-2">
                <span className="font-mono">{ptBR.cart.subtotal}</span>
                <span className="font-mono">R$ {total.toLocaleString("pt-BR")}</span>
              </div>
              <div className="border-t-2 border-black pt-2 mt-2">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-bold uppercase">{ptBR.cart.total}</span>
                  <span className="text-lg font-bold">R$ {total.toLocaleString("pt-BR")}</span>
                </div>
                <Button
                  asChild
                  className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase transition-colors duration-300"
                >
                  <Link href="/checkout">{ptBR.cart.checkout}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
