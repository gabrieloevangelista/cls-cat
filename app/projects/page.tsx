"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ptBR } from "../i18n/pt-BR"
import Breadcrumb, { useBreadcrumb } from "../components/breadcrumb"
import { Search, Filter } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Casa Moderna",
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    price: 2500,
    image: "/images/modern-house.jpg",
  },
  {
    id: 2,
    title: "Apartamento Compacto",
    area: 80,
    bedrooms: 2,
    bathrooms: 1,
    price: 1500,
    image: "/images/compact-apartment.jpg",
  },
  {
    id: 3,
    title: "Chalé Rústico",
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    price: 2000,
    image: "/images/rustic-cabin.jpg",
  },
  {
    id: 4,
    title: "Sobrado Familiar",
    area: 200,
    bedrooms: 4,
    bathrooms: 3,
    price: 3500,
    image: "/images/family-home.jpg",
  },
]

export default function Projects() {
  const breadcrumbItems = useBreadcrumb()
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar projetos com base no termo de pesquisa
  const filteredProjects = projects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="border-4 border-black p-6 mb-8">
        <h1 className=\"text-3xl font-bold uppercase\">Catálogo de Projetos</h1>
        <p className=\"font-mono mt-2\">Explore nossos projetos arquitetônicos inovadores e acessíveis.</p>
      </div>

      <div className="mb-8 border-4 border-black p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-3 border-2 border-black font-mono"
            />
          </div>
          <Button className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="border-4 border-black p-8 text-center">
          <p className="font-mono mb-4">Nenhum projeto encontrado para "{searchTerm}".</p>
          <Button
            onClick={() => setSearchTerm("")}
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase"
          >
            Limpar Busca
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className=\"border-4 border-black transition-transform duration-300 hover:shadow-2xl hover:scale-105\">
              <div className="relative h-64 w-full">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 uppercase">{project.title}</h3>
                <p className="font-mono mb-2">
                  {ptBR.projectDetails.area} {project.area} m²
                </p>
                <p className="font-mono mb-2">
                  {ptBR.projectDetails.bedrooms} {project.bedrooms}
                </p>
                <p className="font-mono mb-4">
                  {ptBR.projectDetails.bathrooms} {project.bathrooms}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">R$ {project.price}</span>
                  <Button
                    asChild
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase"
                  >
                    <Link href={`/projects/${project.id}`}>{ptBR.projectCard.viewDetails}</Link>
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
