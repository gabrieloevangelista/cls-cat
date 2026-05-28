"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useWishlist } from "../contexts/WishlistContext"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface WishlistButtonProps {
  projectId: number
  projectTitle: string
}

export default function WishlistButton({ projectId, projectTitle }: WishlistButtonProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)

  const isInWishlist = wishlist.some((item) => item.id === projectId)

  const handleWishlistAction = () => {
    if (!user) {
      toast({
        title: "Ação necessária",
        description: "Você precisa estar logado para adicionar à lista de desejos.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (isInWishlist) {
      removeFromWishlist(projectId)
      toast({
        title: "Removido da lista de desejos",
        description: `${projectTitle} foi removido da sua lista de desejos.`,
      })
    } else {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 700)

      addToWishlist({ id: projectId, title: projectTitle })
      toast({
        title: "Adicionado à lista de desejos",
        description: `${projectTitle} foi adicionado à sua lista de desejos.`,
      })
    }
  }

  return (
    <Button
      onClick={handleWishlistAction}
      className={`
        w-full flex items-center justify-center gap-2 
        ${
          isInWishlist
            ? "bg-green-700 text-white hover:bg-white hover:text-green-700"
            : "bg-white text-black hover:bg-black hover:text-white"
        } 
        border-2 border-black font-mono uppercase
        transition-all duration-300 ease-in-out
        ${isAnimating ? "scale-105" : ""}
      `}
    >
      <Heart
        className={`
          ${isInWishlist ? "fill-white" : ""} 
          ${isAnimating ? "animate-ping" : ""}
          transition-all duration-300
        `}
        size={18}
      />
      {isInWishlist ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    </Button>
  )
}
