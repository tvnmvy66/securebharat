"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import UserManager from "@/components/UserManager"

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Reports", link: "/reports" },
  { name: "About", link: "/#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black shadow-gray-800 shadow-xl text-white flex h-[4rem] px-[1rem] justify-between items-center">
        <div className="my-auto flex gap-1 ">
            <Image
            src="/logo.png"
            alt="Secure Bharat logo"
            width={25}
            height={25}
            className="w-6 h-auto object-cover rounded-xl" // height:auto maintains aspect ratio
            priority
            />
            <span className="text-xl font-mono ">SecureBharat</span>
        </div>
        <div className=" my-auto mx-2 md:hidden" >
            {isOpen ? <X className="w-6 h-6" /> : (<div className="flex gap-2 justify-center items-center"> <Menu className="w-7 h-7 rounded p-[0.1rem] m-2 shadow-md md:hidden" onClick={() => setIsOpen(!isOpen)}/><UserManager/></div>)}
        </div>
        <div className="hidden md:flex gap-4 my-auto font-mono items-center">
            {
                navLinks.map((nav,index) => (
                    <Link key={index} href={nav.link} className="mr-4">{nav.name}</Link>
                ))
            }
            <UserManager/>
        </div>
        {/* Mobile Menu with Motion */}
        <AnimatePresence>
            {isOpen && (
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="md:hidden bg-white/10 backdrop-blur-2xl text-white mx-[-1rem] mt-[93vh] w-screen h-screen fixed font-mono text-2xl flex flex-col items-center justify-center gap-2 z-2"
            >
                {
                navLinks.map((nav,index) => (
                    <Link key={index} href={nav.link} className="mr-4" onClick={() => setIsOpen(!isOpen)}>{nav.name}</Link>
                ))
            }
            <button onClick={() => setIsOpen(!isOpen)}><X className="w-10 h-10 bg-white rounded-full mt-5 text-black p-2 z-2" /></button>
            </motion.div>
            )}
        </AnimatePresence>
    </nav>
    
  );
}
