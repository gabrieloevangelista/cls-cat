"use client"

import { useCart } from "../contexts/CartContext"
import CartDrawer from "./cart-drawer"

export default function CartDrawerWrapper() {
  const { isCartOpen, closeCart, newItem } = useCart()

  return <CartDrawer open={isCartOpen} onClose={closeCart} newItem={newItem} />
}
