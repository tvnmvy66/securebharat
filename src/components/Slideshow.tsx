
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const slides = [
  { id: 1, title:'🛡️ Free Scans', content: 'Scan unlimited websites without spending a single rupee.No hidden fees, no credit card traps, just pure scanning power.Perfect for devs, hackers (the ethical kind), and curious cats.You get pro-level tools, absolutely free — because security should be accessible to everyone.' },
  { id: 2, title:'⚠️ Vulnerability Detection', content: 'We dont just check if your site is working — we go under the hood and sniff out the weaknesses before bad actors do. From outdated packages and insecure headers to deeper, more complex threat vectors — our engine exposes what most scanners miss.' },
  { id: 3, title:'🕒 Real-Time Analysis', content: 'Nobody has time to wait for hours to see if their site is secure. Our system delivers results in real-time — faster than your average loading screen. As soon as you hit scan, we get to work, providing instant insights and live feedback.' },
  { id: 4, title:'✅ Easy to Use', content: 'No confusing interfaces, no 30-minute setup tutorials — just clean, intuitive design built with actual users in mind. Getting started is as simple as pasting your URL and clicking a button. From first-time users to seasoned security professionals, our UI is designed to make complex tasks feel stupidly simple.' },
]

export default function Slideshow() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current
        const width = container.clientWidth
        currentIndexRef.current = (currentIndexRef.current + 1) % slides.length
        container.scrollTo({
          left: width * currentIndexRef.current,
          behavior: 'smooth',
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-[90vw] lg:w-[60vw] mx-2 overflow-hidden select-none">
        <h2 className='text-center text-4xl font-bold'>FEATURES</h2>
      <motion.div
        ref={scrollRef}
        className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar p-2"
      >
        {slides.map((slide) => (
          <Card
            key={slide.id}
            className="min-w-full snap-center m-2 h-auto flex flex-col items-center text-xl font-bold bg-white/10 backdrop-blur-md shadow-gray-700 shadow-lg text-white border-0 pt-10"
          >
            <CardContent className="text-center">{slide.title}</CardContent>
            <CardContent className="md:px-15 font-normal">{slide.content}</CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  )
}
