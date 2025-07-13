"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Terminal, ArrowLeft, Code, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PortfolioTerminal } from "@/components/terminal"
import Link from "next/link"

export default function TerminalPage() {
  const [showTerminal, setShowTerminal] = useState(false)

  const commands = [
    { cmd: "help", desc: "Afficher la liste des commandes disponibles" },
    { cmd: "about", desc: "En savoir plus sur moi" },
    { cmd: "projects", desc: "Découvrir mes projets" },
    { cmd: "skills", desc: "Voir mes compétences techniques" },
    { cmd: "contact", desc: "Informations de contact" },
    { cmd: "clear", desc: "Nettoyer le terminal" }
  ]

  if (showTerminal) {
    return (
      <div className="min-h-screen bg-black">
        <div className="absolute top-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTerminal(false)}
            className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
        <PortfolioTerminal />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au portfolio
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-500/10 rounded-full border border-green-500/20">
              <Terminal className="w-12 h-12 text-green-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Mode <span className="text-green-400">Développeur</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explorez mon portfolio à travers une interface terminal interactive. 
            Une expérience unique pour les développeurs qui aiment la ligne de commande.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-green-400">
                  <Code className="w-5 h-5 mr-2" />
                  Commandes disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {commands.map((command, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <code className="text-green-400 font-mono text-sm bg-black/50 px-2 py-1 rounded min-w-[80px]">
                        {command.cmd}
                      </code>
                      <span className="text-gray-300 text-sm">{command.desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-400">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Astuces
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>• Utilisez la <code className="bg-black/50 px-1 rounded">Tab</code> pour l'auto-complétion</p>
                  <p>• Naviguez dans l'historique avec <code className="bg-black/50 px-1 rounded">↑</code> et <code className="bg-black/50 px-1 rounded">↓</code></p>
                  <p>• Tapez <code className="bg-black/50 px-1 rounded text-green-400">help</code> pour voir toutes les commandes</p>
                  <p>• Utilisez <code className="bg-black/50 px-1 rounded text-green-400">clear</code> pour nettoyer l'écran</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => setShowTerminal(true)}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 text-lg"
          >
            <Terminal className="w-5 h-5 mr-2" />
            Lancer le Terminal
          </Button>
          
          <p className="text-gray-400 text-sm mt-4">
            Prêt à explorer ? Cliquez pour démarrer l'expérience terminal.
          </p>
        </motion.div>
      </div>
    </div>
  )
}