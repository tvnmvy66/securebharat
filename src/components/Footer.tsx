"use client"

import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";

export default function Footer() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full bg-gray-950 text-white py-10 px-6 md:px-20 mt-30"
    >   
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-2xl font-bold">Secure<span className="text-blue-500">Bharat</span></div>

        {/* Links */}
        <div className="flex gap-6 text-sm md:text-base">
          <a href="/" className="hover:text-blue-400 transition">Home</a>
          <a href="/reports" className="hover:text-blue-400 transition">Reports</a>
          <a href="/#about" className="hover:text-blue-400 transition">About</a>
        </div>

        {/* Socials */}
        {/* <div className="flex gap-4">
          <Button variant="ghost" size="icon">G
          </Button>
          <Button variant="ghost" size="icon">T
          </Button>
        </div> */}
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-400 mt-8">
        © {new Date().getFullYear()} SecureBharat. All rights reserved.
      </div>
    </motion.div>
  )
}
