"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { usePathname } from "next/navigation"

export interface BreadcrumbItem {
  label: string
  href: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-mono hover:text-green-700 border-b-2 border-transparent hover:border-green-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Início
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            <ChevronRight className="w-4 h-4 mx-1" />
            {item.active ? (
              <span className="text-sm font-mono text-gray-500">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="inline-flex items-center text-sm font-mono hover:text-green-700 border-b-2 border-transparent hover:border-green-700"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function useBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbItems: BreadcrumbItem[] = []
  let path = ""

  segments.forEach((segment, index) => {
    path += `/${segment}`

    // Traduzir segmentos para nomes amigáveis
    let label = segment.charAt(0).toUpperCase() + segment.slice(1)

    if (segment === "projects" && segments.length === 1) {
      label = "Plantas"
    } else if (segment === "wishlist") {
      label = "Lista de Desejos"
    } else if (segment === "cart") {
      label = "Carrinho"
    } else if (segment === "checkout") {
      label = "Finalizar Compra"
    } else if (segment === "login") {
      label = "Login"
    } else if (segment === "register") {
      label = "Registro"
    } else if (segment === "about") {
      label = "Sobre"
    } else if (segment === "contact") {
      label = "Contato"
    }

    breadcrumbItems.push({
      label,
      href: path,
      active: index === segments.length - 1,
    })
  })

  return breadcrumbItems
}
