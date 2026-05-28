"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Drawer } from "@/components/ui/drawer"
import { ptBR } from "../i18n/pt-BR"
import { ShoppingCart, X, Trash2, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  newItem?: CartItem | null
}

export default function CartDrawer({ open, onClose, newItem }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null)

  useEffect(() => {
    // Carregar itens do carrinho do localStorage ou de um estado global
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    // Salvar carrinho no localStorage quando for atualizado
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  useEffect(() => {
    // Adicionar novo item ao carrinho quando for passado como prop
    if (newItem) {
      const existingItemIndex = cartItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex >= 0) {
        // Atualizar quantidade se o item já existir
        const updatedItems = [...cartItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        setCartItems(updatedItems)
        setHighlightedItem(newItem.id)
      } else {
        // Adicionar novo item
        setCartItems([...cartItems, newItem])
        setHighlightedItem(newItem.id)
      }

      // Limpar o destaque após 2 segundos
      setTimeout(() => {
        setHighlightedItem(null)
      }, 2000)
    }
  }, [newItem])

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    if (cartItems.length === 1) {
      localStorage.removeItem("cart")
    }
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Drawer open={open} onClose={onClose} side="right" size="default">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-black">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            <h2 className="text-xl font-bold uppercase">{ptBR.cart.title}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="font-mono">{ptBR.cart.empty}</p>
              <Button
                asChild
                className="mt-4 bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase"
                onClick={onClose}
              >
                <Link href="/projects">{ptBR.cart.continueShopping}</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex border-2 border-black p-3 ${
                    highlightedItem === item.id ? "bg-green-50 animate-pulse" : "bg-white"
                  }`}
                >
                  <div className="relative h-20 w-20 border-2 border-black flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-bold uppercase">{item.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-mono">R$ {item.price.toLocaleString("pt-BR")}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-2 border-black"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2 font-mono">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 border-2 border-black"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t-4 border-black">
            <div className="flex justify-between mb-4">
              <span className="font-mono">{ptBR.cart.subtotal}</span>
              <span className="font-mono">R$ {total.toLocaleString("pt-BR")}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-bold uppercase">{ptBR.cart.total}</span>
              <span className="font-bold">R$ {total.toLocaleString("pt-BR")}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                asChild
                className="bg-white text-black hover:bg-black hover:text-white border-2 border-black font-mono uppercase"
                onClick={onClose}
              >
                <Link href="/projects">{ptBR.cart.continueShopping}</Link>
              </Button>
              <Button
                asChild
                className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase flex items-center gap-1"
              >
                <Link href="/checkout">
                  {ptBR.cart.checkout}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  )
}
