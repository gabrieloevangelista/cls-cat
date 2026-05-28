"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ptBR } from "../i18n/pt-BR"
import Image from "next/image"
import Breadcrumb, { useBreadcrumb } from "../components/breadcrumb"
import { CreditCard, Mail, FileText, Info, Clock, Copy, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "../contexts/CartContext"

export default function Checkout() {
  const { cartItems, clearCart } = useCart()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [pixTimeLeft, setPixTimeLeft] = useState(900) // 15 minutos em segundos
  const [pixCopied, setPixCopied] = useState(false)
  const { toast } = useToast()
  const breadcrumbItems = useBreadcrumb()
  const router = useRouter()

  // Temporizador para o PIX
  useEffect(() => {
    if (paymentMethod === "pix" && pixTimeLeft > 0) {
      const timer = setTimeout(() => {
        setPixTimeLeft(pixTimeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [paymentMethod, pixTimeLeft])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process payment and create order
    toast({
      title: "Pedido realizado com sucesso!",
      description: `Seu projeto será enviado para ${formData.email} em até 24 horas.`,
    })

    // Limpar o carrinho
    clearCart()

    // Redirecionar para uma página de confirmação após 2 segundos
    setTimeout(() => {
      router.push(`/checkout/success?method=${paymentMethod}`)
    }, 2000)
  }

  const handleCopyPix = () => {
    navigator.clipboard.writeText(
      "00020126580014BR.GOV.BCB.PIX0136a629534e-7693-46c5-9b47-8fa3a71900ac0217FASTPROJECT PAGTO52040000530398654040.005802BR5925FASTPROJECT ARQUITETURA6009SAO PAULO62070503***6304E2CA",
    )
    setPixCopied(true)
    toast({
      title: "Código PIX copiado!",
      description: "Cole no seu aplicativo de banco para realizar o pagamento.",
    })
    setTimeout(() => setPixCopied(false), 3000)
  }

  const handlePixPayment = () => {
    toast({
      title: "Verificando pagamento...",
      description: "Estamos processando seu pagamento PIX.",
    })

    // Simular verificação de pagamento
    setTimeout(() => {
      toast({
        title: "Pagamento confirmado!",
        description: "Seu pagamento via PIX foi recebido com sucesso.",
      })

      // Limpar o carrinho
      clearCart()

      // Redirecionar para página de sucesso
      setTimeout(() => {
        router.push("/checkout/success?method=pix")
      }, 1500)
    }, 2000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center gap-3 border-b-4 border-black pb-4 mb-8">
        <CreditCard className="h-8 w-8" />
        <h1 className="text-3xl font-bold uppercase">{ptBR.checkout.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="border-4 border-black p-6 mb-6 bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-green-700" />
              <h2 className="text-xl font-bold uppercase">Como funciona</h2>
            </div>
            <p className="font-mono mb-4">
              Após a confirmação do pagamento, você receberá os arquivos do projeto em seu email em até 24 horas.
            </p>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-green-700" />
              <p className="font-mono">Arquivos PDF com plantas detalhadas</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-green-700" />
              <p className="font-mono">Modelos 3D (quando disponíveis)</p>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-700" />
              <p className="font-mono">Memorial descritivo completo</p>
            </div>
          </div>

          <div className="border-4 border-black p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 uppercase">Informações Pessoais</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block font-bold mb-2 uppercase">
                  Nome Completo
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder={ptBR.checkout.fullName}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="border-2 border-black font-mono"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-bold mb-2 uppercase">
                  Email
                </label>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={ptBR.checkout.email}
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-2 border-black font-mono"
                  />
                </div>
                <p className="text-sm font-mono mt-1 text-gray-500">
                  Os arquivos do projeto serão enviados para este email
                </p>
              </div>
              <div>
                <label htmlFor="phone" className="block font-bold mb-2 uppercase">
                  Celular
                </label>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-gray-500" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="border-2 border-black font-mono"
                  />
                </div>
                <p className="text-sm font-mono mt-1 text-gray-500">
                  Usaremos este número para contato em caso de dúvidas
                </p>
              </div>
            </div>
          </div>

          <div className="border-4 border-black p-6">
            <h2 className="text-xl font-bold mb-4 uppercase">Forma de Pagamento</h2>

            <Tabs defaultValue="card" onValueChange={setPaymentMethod} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="card" className="font-mono uppercase">
                  Cartão de Crédito
                </TabsTrigger>
                <TabsTrigger value="pix" className="font-mono uppercase">
                  PIX
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block font-bold mb-2 uppercase">
                      Número do Cartão
                    </label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder={ptBR.checkout.cardNumber}
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="border-2 border-black font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block font-bold mb-2 uppercase">
                        Data de Validade
                      </label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder={ptBR.checkout.expiryDate}
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-black font-mono"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block font-bold mb-2 uppercase">
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder={ptBR.checkout.cvv}
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="border-2 border-black font-mono"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase transition-colors duration-300 mt-4"
                  >
                    Finalizar Compra
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="pix">
                <div className="text-center space-y-4">
                  <div className="border-2 border-black p-4 bg-gray-50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-red-600" />
                      <p className="font-mono font-bold">Tempo restante: {formatTime(pixTimeLeft)}</p>
                    </div>
                    <p className="text-sm font-mono mb-4">
                      Escaneie o QR code abaixo ou copie o código PIX para realizar o pagamento
                    </p>

                    <div className="bg-white p-4 border-2 border-black mx-auto w-48 h-48 mb-4 relative">
                      <Image src="/pix-qrcode.png" alt="QR Code PIX" width={160} height={160} className="mx-auto" />
                    </div>

                    <div className="flex items-center border-2 border-black p-2 bg-white">
                      <div className="flex-grow font-mono text-xs truncate px-2">
                        00020126580014BR.GOV.BCB.PIX0136a629534e-7693-46c5...
                      </div>
                      <Button onClick={handleCopyPix} variant="outline" size="sm" className="border-2 border-black">
                        <Copy className="h-4 w-4 mr-1" />
                        {pixCopied ? "Copiado!" : "Copiar"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-mono text-sm">
                      Após realizar o pagamento, clique no botão abaixo para verificarmos
                    </p>
                    <Button
                      onClick={handlePixPayment}
                      className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase transition-colors duration-300"
                    >
                      Já realizei o pagamento
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div>
          <div className="border-4 border-black p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4 uppercase">{ptBR.checkout.orderSummary}</h2>
            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b-2 border-black pb-4">
                  <div className="relative h-20 w-20 border-2 border-black">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold uppercase">{item.title}</h3>
                    <div className="flex justify-between">
                      <span className="font-mono">Qtd: {item.quantity}</span>
                      <span className="font-mono">R$ {item.price.toLocaleString("pt-BR")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-black pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="font-mono">{ptBR.cart.subtotal}</span>
                <span className="font-mono">R$ {total.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="uppercase">{ptBR.checkout.orderTotal}</span>
                <span>R$ {total.toLocaleString("pt-BR")}</span>
              </div>

              {paymentMethod === "pix" && (
                <div className="mt-4 p-3 bg-green-50 border-2 border-green-700">
                  <p className="font-mono text-sm text-green-700 font-bold">10% de desconto no PIX!</p>
                  <div className="flex justify-between font-bold mt-2">
                    <span className="uppercase text-green-700">Total com desconto:</span>
                    <span className="text-green-700">R$ {(total * 0.9).toLocaleString("pt-BR")}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
