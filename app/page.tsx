"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ptBR } from "./i18n/pt-BR"
import Breadcrumb, { useBreadcrumb } from "./components/breadcrumb"

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

export default function Home() {
  const breadcrumbItems = useBreadcrumb()

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <section className="mb-12 border-4 border-black p-0 relative overflow-hidden">
        <div className="relative h-[500px] w-full">
          <Image
            src="/images/hero-image.jpg"
            alt="FASTPROJECT - Plantas prontas para sua casa dos sonhos"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center p-8">
            <h1 className="text-5xl font-bold mb-4 uppercase text-white">{ptBR.hero.title}</h1>
            <p className="text-xl mb-6 font-mono text-white">{ptBR.hero.subtitle}</p>
            <Button
              asChild
              className="bg-white text-black hover:bg-black hover:text-white border-2 border-white font-mono uppercase w-fit"
            >
              <Link href="#projects">{ptBR.hero.cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="projects" className="mb-12">
        <div className="border-4 border-black p-6 mb-8">
          <h2 className="text-3xl font-bold uppercase">{ptBR.projects.title}</h2>
          <p className="font-mono mt-2">Explore nossos projetos arquitetônicos inovadores e acessíveis.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
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
                  <span className="text-lg font-bold uppercase">R$ {project.price}</span>
                  <Button
                    asChild
                    className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase text-xs"
                  >
                    <Link href={`/projects/${project.id}`}>{ptBR.projectCard.viewDetails}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
