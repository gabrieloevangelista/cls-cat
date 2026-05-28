"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ptBR } from "../../i18n/pt-BR"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import Lightbox from "react-image-lightbox"
import Breadcrumb, { useBreadcrumb } from "../../components/breadcrumb"
import WishlistButton from "../../components/wishlist-button"
import { useCart } from "../../contexts/CartContext"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "react-image-lightbox/style.css"

const projects = [
  {
    id: 1,
    title: "Casa Moderna",
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    price: 2500,
    images: ["/images/modern-house-1.jpg", "/images/modern-house-2.jpg", "/images/modern-house-3.jpg"],
    description: "Uma casa moderna com amplos espaços e muita luz natural.",
    features: ["Cozinha gourmet", "Área de lazer", "Escritório"],
  },
  {
    id: 2,
    title: "Apartamento Compacto",
    area: 80,
    bedrooms: 2,
    bathrooms: 1,
    price: 1500,
    images: ["/images/compact-apartment-1.jpg", "/images/compact-apartment-2.jpg", "/images/compact-apartment-3.jpg"],
    description: "Um apartamento compacto e funcional, perfeito para solteiros ou casais.",
    features: ["Varanda", "Área de serviço", "Vaga de garagem"],
  },
  {
    id: 3,
    title: "Chalé Rústico",
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    price: 2000,
    images: ["/images/rustic-cabin-1.jpg", "/images/rustic-cabin-2.jpg", "/images/rustic-cabin-3.jpg"],
    description: "Um chalé rústico com muito charme, ideal para quem busca tranquilidade.",
    features: ["Lareira", "Deck de madeira", "Vista panorâmica"],
  },
  {
    id: 4,
    title: "Sobrado Familiar",
    area: 200,
    bedrooms: 4,
    bathrooms: 3,
    price: 3500,
    images: ["/images/family-home-1.jpg", "/images/family-home-2.jpg", "/images/family-home-3.jpg"],
    description: "Um sobrado espaçoso para toda a família, com ambientes integrados.",
    features: ["Suíte master", "Sala de jogos", "Churrasqueira"],
  },
]

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const { toast } = useToast()
  const breadcrumbItems = useBreadcrumb()
  const { addToCart } = useCart()
  const project = projects.find((p) => p.id === Number.parseInt(params.id))

  if (!project) {
    return <div className="container mx-auto px-4 py-8 font-mono">Projeto não encontrado</div>
  }

  // Atualizar o último item do breadcrumb para mostrar o título do projeto
  if (breadcrumbItems.length > 0) {
    breadcrumbItems[breadcrumbItems.length - 1].label = project.title
  }

  const handleAddToCart = () => {
    addToCart({
      id: project.id,
      title: project.title,
      price: project.price,
      quantity: 1,
      image: project.images[0],
    })

    setIsAddedToCart(true)

    toast({
      title: ptBR.projectCard.addedToCart,
      description: ptBR.projectCard.addedToCartDescription.replace("{title}", project.title),
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border-4 border-black p-4">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-[400px]"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - Imagem ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    onClick={() => {
                      setPhotoIndex(index)
                      setLightboxOpen(true)
                    }}
                    className="cursor-pointer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="border-4 border-black p-6 bg-white">
          <h1 className="text-3xl font-bold mb-4 uppercase">{project.title}</h1>
          <p className="font-mono mb-2 text-green-700">
            {ptBR.projectDetails.area} {project.area} m²
          </p>
          <p className="font-mono mb-2 text-green-700">
            {ptBR.projectDetails.bedrooms} {project.bedrooms}
          </p>
          <p className="font-mono mb-2 text-green-700">
            {ptBR.projectDetails.bathrooms} {project.bathrooms}
          </p>
          <p className="text-2xl font-bold mb-6">R$ {project.price}</p>
          <h2 className="text-xl font-bold mb-2 uppercase text-green-700">{ptBR.projectDetails.description}</h2>
          <p className="font-mono mb-6">{project.description}</p>
          <h2 className="text-xl font-bold mb-2 uppercase text-green-700">{ptBR.projectDetails.features}</h2>
          <ul className="list-disc list-inside mb-6 font-mono">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="space-y-4">
            <Button
              onClick={handleAddToCart}
              disabled={isAddedToCart}
              className={`w-full ${
                isAddedToCart ? "bg-green-700" : "bg-black"
              } text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase transition-all duration-300`}
            >
              {isAddedToCart ? ptBR.projectCard.addedToCart : ptBR.projectCard.addToCart}
            </Button>

            <WishlistButton projectId={project.id} projectTitle={project.title} />
          </div>
        </div>
      </div>
      {lightboxOpen && (
        <Lightbox
          mainSrc={project.images[photoIndex]}
          nextSrc={project.images[(photoIndex + 1) % project.images.length]}
          prevSrc={project.images[(photoIndex + project.images.length - 1) % project.images.length]}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + project.images.length - 1) % project.images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % project.images.length)}
        />
      )}
    </div>
  )
}
