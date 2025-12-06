'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Activity, TrendingUp, AlertCircle } from 'lucide-react'

export default function Home() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')

  const calculateBMI = () => {
    setError('')
    
    if (!height || !weight) {
      setError('Please enter both height and weight')
      return
    }

    const h = parseFloat(height)
    const w = parseFloat(weight)

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setError('Please enter valid positive numbers')
      return
    }

    if (h < 50 || h > 300) {
      setError('Height must be between 50-300 cm')
      return
    }

    if (w < 20 || w > 500) {
      setError('Weight must be between 20-500 kg')
      return
    }

    const heightInMeters = h / 100
    const calculatedBMI = w / (heightInMeters * heightInMeters)
    setBmi(parseFloat(calculatedBMI.toFixed(1)))

    if (calculatedBMI < 18.5) {
      setCategory('Underweight')
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
      setCategory('Normal')
    } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
      setCategory('Overweight')
    } else {
      setCategory('Obese')
    }
  }

  const getBMIPosition = () => {
    if (!bmi) return 0
    if (bmi < 18.5) return (bmi / 18.5) * 20
    if (bmi < 25) return 20 + ((bmi - 18.5) / (25 - 18.5)) * 30
    if (bmi < 30) return 50 + ((bmi - 25) / (30 - 25)) * 25
    return Math.min(75 + ((bmi - 30) / 10) * 25, 100)
  }

  const reset = () => {
    setHeight('')
    setWeight('')
    setBmi(null)
    setCategory('')
    setError('')
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-4 rounded-2xl shadow-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white text-center mb-2">
            BMI Calculator
          </h1>
          <p className="text-white/80 text-center mb-8 text-sm">
            Calculate your Body Mass Index and track your health
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-white/90 font-medium mb-2 text-sm">
                Height (cm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="170"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
                />
                <TrendingUp className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              </div>
            </div>

            <div>
              <label className="block text-white/90 font-medium mb-2 text-sm">
                Weight (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
                />
                <Activity className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl p-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-200" />
                  <p className="text-red-100 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <button
                onClick={calculateBMI}
                className="flex-1 bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-white/90 transition shadow-lg hover:shadow-xl active:scale-95 transform"
              >
                Calculate BMI
              </button>
              {bmi && (
                <button
                  onClick={reset}
                  className="px-6 bg-white/20 backdrop-blur-sm text-white font-semibold py-3 rounded-xl hover:bg-white/30 transition border border-white/30 active:scale-95 transform"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {bmi && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="mt-8 space-y-6"
              >
                <div className="h-px bg-white/20"></div>

                <div className="text-center space-y-2">
                  <p className="text-white/80 text-sm font-medium">Your BMI</p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-6xl font-bold text-white"
                  >
                    {bmi}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`inline-block px-4 py-2 rounded-full font-semibold text-white ${
                      category === 'Underweight' ? 'bg-blue-500' :
                      category === 'Normal' ? 'bg-green-500' :
                      category === 'Overweight' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                  >
                    {category}
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <p className="text-white/80 text-xs font-medium text-center">BMI Range</p>
                  <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 bg-blue-500"></div>
                      <div className="flex-1 bg-green-500"></div>
                      <div className="flex-1 bg-yellow-500"></div>
                      <div className="flex-1 bg-red-500"></div>
                    </div>
                    <motion.div
                      initial={{ left: 0 }}
                      animate={{ left: `${getBMIPosition()}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-purple-600"
                      style={{ marginLeft: '-8px' }}
                    />
                  </div>
                  <div className="flex justify-between text-white/60 text-xs">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-white/70">Underweight</span>
                    </div>
                    <p className="text-white font-semibold">&lt; 18.5</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-white/70">Normal</span>
                    </div>
                    <p className="text-white font-semibold">18.5 - 24.9</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <span className="text-white/70">Overweight</span>
                    </div>
                    <p className="text-white font-semibold">25 - 29.9</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <span className="text-white/70">Obese</span>
                    </div>
                    <p className="text-white font-semibold">≥ 30</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </main>
  )
}