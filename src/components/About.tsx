'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const team = [
  {
    name: "Pratham Vishwakarma",
    role: "Founder",
    image: "https://avatars.githubusercontent.com/u/197718854",
    initials: "P",
    desc: "If there’s a hole in your system, I’ll find it before the bad guys do. Probably while sipping coffee.",
  },
  {
    name: "Tanmay Dongare",
    role: "SDE 1",
    image: "https://avatars.githubusercontent.com/u/143926865",
    initials: "T",
    desc: "Wrote a function. It worked. Still don’t know why. SDE-1 magic.",
  },
]

export default function About() {
  return (
    <main className="min-h-screen text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-muted-foreground text-lg">
          We're not your average devs. We're building the future—one sarcastic AI at a time.
        </p>
      </motion.div>

      <Separator className="my-8 bg-white/20" />

      <section className="flex flex-col gap-6 max-w-5xl mx-auto">
        {team.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + idx * 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-zinc-800 text-left">
              <CardHeader className="flex gap-4 text-white">
                <Avatar className='w-18 h-18 md:w-25 md:h-25'> 
                  <AvatarImage src={member.image} alt={member.name} className=''/>
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-2'>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="">{member.role}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground pt-2 text-2xl">
                <p>{member.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  )
}
