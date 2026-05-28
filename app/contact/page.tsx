"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import Breadcrumb, { useBreadcrumb } from "../components/breadcrumb"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

export default function Contact() {
  const breadcrumbItems = useBreadcrumb()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio do formulário
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast({
        title: "Mensagem enviada",
        description: "Agradecemos seu contato. Responderemos em breve!",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="border-4 border-black p-6 mb-8">
        <h1 className=\"text-3xl font-bold uppercase\">Entre em Contato com CLS Catalog</h1>
        <p className="font-mono mt-2">Estamos aqui para responder suas dúvidas e ajudar com seu projeto.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          {isSubmitted ? (
            <div className="border-4 border-black p-8 text-center h-full flex flex-col items-center justify-center">
              <CheckCircle className="h-16 w-16 text-green-700 mb-4" />
              <h2 className="text-2xl font-bold mb-4 uppercase">Mensagem Enviada!</h2>
              <p className="font-mono mb-6">Agradecemos seu contato. Nossa equipe responderá em breve.</p>
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({ name: "", email: "", subject: "", message: "" })
                }}
                className="bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase"
              >
                Enviar Nova Mensagem
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border-4 border-black p-6">
              <h2 className="text-2xl font-bold mb-6 uppercase">Formulário de Contato</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-bold mb-2 uppercase">
                    Nome
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-2 border-black w-full p-2 font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-bold mb-2 uppercase">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-2 border-black w-full p-2 font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block font-bold mb-2 uppercase">
                    Assunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="border-2 border-black w-full p-2 font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-bold mb-2 uppercase">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="border-2 border-black w-full p-2 font-mono min-h-[150px]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
        <div className="border-4 border-black p-6">
          <h2 className="text-2xl font-bold mb-6 uppercase">Informações de Contato</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 mt-1" />
              <div>
                <h3 className="font-bold uppercase">Endereço</h3>
                <p className="font-mono">
                  Av. Paulista, 1000
                  <br />
                  Bela Vista, São Paulo - SP
                  <br />
                  CEP: 01310-100
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 mt-1" />
              <div>
                <h3 className="font-bold uppercase">Telefone</h3>
                <p className="font-mono">(11) 1234-5678</p>
                <p className="font-mono">(11) 98765-4321</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 mt-1" />
              <div>
                <h3 className="font-bold uppercase">Email</h3>
                <p className="font-mono">contato@fastproject.com</p>
                <p className="font-mono">suporte@fastproject.com</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold uppercase mb-4">Horário de Atendimento</h3>
            <div className="font-mono">
              <p>Segunda a Sexta: 9h às 18h</p>
              <p>Sábado: 9h às 13h</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-4 border-black p-0 h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976951333286!2d-46.65390548502211!3d-23.563273284682373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1651345678901!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização FASTPROJECT"
        ></iframe>
      </div>
    </div>
  )
}
