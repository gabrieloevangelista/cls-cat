"use client"

import { useWishlist } from "../contexts/WishlistContext"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Heart, Trash2, AlertCircle } from "lucide-react"
import Breadcrumb, { useBreadcrumb } from "../components/breadcrumb"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

// Dados dos projetos (normalmente viriam de uma API)
const projects = [
  {
    id: 1,
    title: "Casa Moderna",
    image: "/images/modern-house.jpg",
  },
  {
    id: 2,
    title: "Apartamento Compacto",
    image: "/images/compact-apartment.jpg",
  },
  {
    id: 3,
    title: "Chalé Rústico",
    image: "/images/rustic-cabin.jpg",
  },
  {
    id: 4,
    title: "Sobrado Familiar",
    image: "/images/family-home.jpg",
  },
]

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { user } = useAuth()
  const breadcrumbItems = useBreadcrumb()
  const { toast } = useToast()
  const [removingId, setRemovingId] = useState<number | null>(null)

  const handleRemoveFromWishlist = (id: number, title: string) => {
    setRemovingId(id)

    // Pequeno atraso para a animação
    setTimeout(() => {
      removeFromWishlist(id)
      setRemovingId(null)

      toast({
        title: "Item removido",
        description: `${title} foi removido da sua lista de desejos.`,
      })
    }, 300)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="border-4 border-black p-8 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4 uppercase">Lista de Desejos</h1>
          <p className="font-mono mb-4">Você precisa estar logado para ver sua lista de desejos.</p>
          <Button
            asChild
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Encontrar detalhes completos dos projetos na lista de desejos
  const wishlistItems = wishlist.map((item) => {
    const projectDetails = projects.find((p) => p.id === item.id)
    return {
      ...item,
      image: projectDetails?.image || "/placeholder.svg",
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="border-4 border-black p-6 mb-8">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8" />
          <h1 className="text-3xl font-bold uppercase">Sua Lista de Desejos</h1>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="border-4 border-black p-8 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 stroke-gray-400" />
          <p className="font-mono mb-4">Sua lista de desejos está vazia.</p>
          <Button
            asChild
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase"
          >
            <Link href="/">Explorar Projetos</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className={`
                border-4 border-black flex 
                transition-all duration-300 ease-in-out
                ${removingId === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"}
              `}
            >
              <div className="relative h-auto w-40">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={160}
                  height={160}
                  style={{ objectFit: "cover", height: "100%" }}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h2 className="text-xl font-bold uppercase">{item.title}</h2>
                <div className="flex justify-between items-center mt-4">
                  <Button
                    asChild
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase transition-colors duration-300"
                  >
                    <Link href={`/projects/${item.id}`}>Ver Detalhes</Link>
                  </Button>
                  <Button
                    onClick={() => handleRemoveFromWishlist(item.id, item.title)}
                    variant="outline"
                    size="icon"
                    className="border-2 border-black hover:bg-red-500 hover:text-white transition-colors duration-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
