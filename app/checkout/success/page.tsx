"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, FileText, Mail, CreditCard } from "lucide-react"
import Breadcrumb, { useBreadcrumb } from "../../components/breadcrumb"
import { useSearchParams } from "next/navigation"

export default function CheckoutSuccess() {
  const breadcrumbItems = useBreadcrumb()
  const searchParams = useSearchParams()
  const paymentMethod = searchParams.get("method") || "card"

  // Atualizar o último item do breadcrumb para mostrar "Confirmação"
  if (breadcrumbItems.length > 0) {
    breadcrumbItems[breadcrumbItems.length - 1].label = "Confirmação"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-2xl mx-auto border-4 border-black p-8 text-center">
        <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-700" />
        <h1 className="text-3xl font-bold mb-4 uppercase">Pedido Confirmado!</h1>
        <p className="font-mono mb-6">
          Obrigado pela sua compra. Seu projeto será enviado para o seu email em até 24 horas.
        </p>

        <div className="border-2 border-black p-4 mb-8 bg-gray-50 text-left">
          <h2 className="text-xl font-bold mb-4 uppercase">O que esperar agora:</h2>
          <ul className="space-y-3 font-mono">
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 mt-1 text-green-700" />
              <div>
                <p className="font-bold">Email de confirmação</p>
                <p className="text-sm">Você receberá um email com os detalhes do seu pedido em instantes.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CreditCard className="h-5 w-5 mt-1 text-green-700" />
              <div>
                <p className="font-bold">Pagamento {paymentMethod === "pix" ? "via PIX" : "com cartão"}</p>
                <p className="text-sm">
                  {paymentMethod === "pix"
                    ? "Seu pagamento via PIX foi confirmado. Obrigado!"
                    : "Seu pagamento com cartão foi processado com sucesso."}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="h-5 w-5 mt-1 text-green-700" />
              <div>
                <p className="font-bold">Entrega do projeto</p>
                <p className="text-sm">
                  Em até 24 horas, você receberá outro email contendo os arquivos do seu projeto.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase"
          >
            <Link href="/">Voltar para a Página Inicial</Link>
          </Button>
          <Button
            asChild
            className="bg-white text-black hover:bg-black hover:text-white border-2 border-black font-mono uppercase"
          >
            <Link href="/projects">Explorar Mais Projetos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
