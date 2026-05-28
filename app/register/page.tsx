"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "../contexts/AuthContext"
import Breadcrumb, { useBreadcrumb } from "../components/breadcrumb"
import Link from "next/link"
import Image from "next/image"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()
  const breadcrumbItems = useBreadcrumb()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await register(name, email, password)
      router.push("/")
    } catch (error) {
      console.error("Erro ao registrar:", error)
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-md mx-auto">
        <div className="border-4 border-black overflow-hidden">
          <div className="relative h-40">
            <Image src="/images/auth-background.jpg" alt="Registro" fill style={{ objectFit: "cover" }} />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h1 className="text-3xl font-bold uppercase text-white">Registro</h1>
            </div>
          </div>
          <div className="p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-bold mb-2 uppercase">
                  Nome
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-2 border-black w-full p-2 font-mono"
                  placeholder="Seu Nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-bold mb-2 uppercase">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-2 border-black w-full p-2 font-mono"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block font-bold mb-2 uppercase">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-2 border-black w-full p-2 font-mono"
                  placeholder="****"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-white hover:text-black border-2 border-black font-mono uppercase disabled:opacity-50"
              >
                {isLoading ? "Criando Conta..." : "Registrar"}
              </Button>
            </form>
            <div className="mt-4 border-t-2 border-black pt-4">
              <p className="font-mono text-center text-sm">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-green-700 hover:underline font-bold">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}
