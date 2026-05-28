"use client"

import Image from "next/image"
import Breadcrumb, { useBreadcrumb } from "../components/breadcrumb"

export default function About() {
  const breadcrumbItems = useBreadcrumb()

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="border-4 border-black p-6 mb-8">
        <h1 className=\"text-3xl font-bold uppercase\">Sobre o CLS Catalog</h1>
        <p className=\"font-mono mt-2\">Conheça nossa história e missão</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="border-4 border-black p-0 overflow-hidden">
          <div className="relative h-full min-h-[400px]">
            <Image src="/images/modern-house-1.jpg" alt="FASTPROJECT Escritório" fill style={{ objectFit: "cover" }} />
          </div>
        </div>
        <div className="border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-4 uppercase">Nossa História</h2>
          <p className="font-mono mb-4">
            Fundada em 2025, a FASTPROJECT nasceu da visão de um grupo de arquitetos inovadores que perceberam a
            necessidade de democratizar o acesso a projetos arquitetônicos de qualidade.
          </p>
          <p className="font-mono mb-4">
            Nossa missão é simplificar o processo de construção e reforma, oferecendo plantas prontas que combinam
            estética, funcionalidade e sustentabilidade.
          </p>
          <p className="font-mono">
            Ao longo dos anos, nos tornamos referência no mercado de projetos arquitetônicos pré-fabricados, atendendo
            clientes em todo o Brasil com soluções rápidas e acessíveis.
          </p>
        </div>
      </div>

      <div className="border-4 border-black p-6 mb-12">
        <h2 className="text-2xl font-bold mb-6 uppercase">Nossa Equipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Ana Silva",
              role: "Arquiteta Chefe",
              image: "/professional-woman-architect.png",
            },
            {
              name: "Carlos Mendes",
              role: "Engenheiro Estrutural",
              image: "/professional-engineer.png",
            },
            {
              name: "Juliana Costa",
              role: "Designer de Interiores",
              image: "/professional-interior-designer.png",
            },
            {
              name: "Roberto Alves",
              role: "Gerente de Projetos",
              image: "/professional-project-manager.png",
            },
          ].map((member, index) => (
            <div key={index} className="border-2 border-black text-center p-4">
              <div className="relative h-48 w-full mb-4">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill style={{ objectFit: "cover" }} />
              </div>
              <h3 className="text-lg font-bold uppercase">{member.name}</h3>
              <p className="font-mono text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="border-4 border-black p-6">
          <h2 className="text-xl font-bold mb-4 uppercase">Nossa Missão</h2>
          <p className="font-mono">
            Democratizar o acesso a projetos arquitetônicos de qualidade, tornando o processo de construção mais
            eficiente e acessível para todos.
          </p>
        </div>
        <div className="border-4 border-black p-6">
          <h2 className="text-xl font-bold mb-4 uppercase">Nossa Visão</h2>
          <p className="font-mono">
            Ser a principal referência em soluções arquitetônicas pré-fabricadas no Brasil, combinando inovação,
            sustentabilidade e design.
          </p>
        </div>
        <div className="border-4 border-black p-6">
          <h2 className="text-xl font-bold mb-4 uppercase">Nossos Valores</h2>
          <ul className="font-mono list-disc list-inside">
            <li>Inovação constante</li>
            <li>Compromisso com a qualidade</li>
            <li>Sustentabilidade</li>
            <li>Acessibilidade</li>
            <li>Transparência</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
