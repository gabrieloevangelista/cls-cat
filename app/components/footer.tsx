import { ptBR } from "../i18n/pt-BR"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 uppercase">CLS Catalog</h3>
            <p className="font-mono">Projetos arquitetônicos rápidos e inovadores desde 2025.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-bold mb-2 uppercase">{ptBR.footer.quickLinks}</h4>
            <ul className="font-mono">
              <li>
                <Link href="/" className="hover:underline">
                  {ptBR.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:underline">
                  {ptBR.nav.projects}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  {ptBR.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  {ptBR.nav.contact}
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-bold mb-2 uppercase">{ptBR.nav.contact}</h4>
            <p className="font-mono">Email: info@clscatalog.com</p>
            <p className="font-mono">Telefone: (11) 1234-5678</p>
          </div>
        </div>
        <div className="border-t-2 border-black mt-8 pt-4 text-center">
          <p className="font-mono">&copy; 2025 CLS Catalog. {ptBR.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
