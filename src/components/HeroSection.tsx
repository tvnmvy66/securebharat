"use client"

import { motion } from "framer-motion"
import RotatingText from "@/components/RotatingText"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Slideshow from "@/components/Slideshow"
import About from "@/components/About"
import { useState,useEffect } from "react";
import { toast } from "sonner"

export default function HeroSection() {
    const [url, setUrl] = useState("");
    
    const handleSend = async () => {
        if(!url) return
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/create`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
                credentials: "include", 
            });

        if(response.ok){
            const data = await response.json();
            console.log("Response:", data);
            toast.success(`${url} request send success!`, {
            style: {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(16px)",            
                WebkitBackdropFilter: "blur(16px)",   
                border:"0" ,     
                color:"white"
            },
                position:'top-center'
            });
        }
        } catch (error) {
            console.error("Error sending URL:", error);
            toast.error(`Request send error!`, {
            style: {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(16px)",            
                WebkitBackdropFilter: "blur(16px)",   
                border:"0" ,     
                color:"white"
            },
                position:'top-center'
            });
        }
    
    }
    
    return (
    <main className="text-white w-full text-6xl font-mono m-auto flex flex-col items-center ">
            <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-70 lg:w-100 fixed mt-20 ">
            <motion.path
                d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4 M14 13.12c0 2.38 0 6.38-1 8.88 M17.29 21.02c.12-.6.43-2.3.5-3.02 M2 12a10 10 0 0 1 18-6 M2 16h.01 M21.8 16c.2-2 .131-5.354 0-6 M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2 M8.65 22c.21-.66.45-1.32.57-2 M9 6.8a6 6 0 0 1 9 5.2v2" // actual path from Menu icon
                strokeWidth="2"
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.3}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.6 }}
                transition={{ duration: 5 }}
            />
            </motion.svg>
        <section className="flex flex-col mt-35 text-center px-6 z-1 text-white">
            <motion.div 
            className="text-3xl md:text-6xl lg:w-[80vh] font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            >
                INDIA'S FIRST WEBSITE SCANNER 
            </motion.div>
            

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-sm mt-5"
            >
                Just drop your website URL. We'll scan it for breaches, vulnerabilities, and malware<br/> — instantly. No setup, no fluff.

            </motion.p>
            
            <motion.div
            className="flex flex-col mx-auto w-[70%] mt-5 items-center gap-2 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.2, duration: 1 }}
            >
                    <Input type="text" className="bg-white/20 text-white backdrop-blur-4xl border-0 shadow-gray-800 shadow-md" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} maxLength={66}/>
                    <Button type="submit" variant="outline" className="text-black border-0 " onClick={handleSend}>
                        Generate Report ✨
                    </Button>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-sm mt-8 text-gray-400"
            >
                🇮🇳 Made in Bharat. Securing your digital frontlines.
            </motion.p>
        </section> 
        <section>
            <motion.div 
            className="flex justify-center mt-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            >
            <motion.div className="text-4xl md:text-6xl">We</motion.div>
            
            <RotatingText
            texts={['Scan', 'Secure', 'Shield!']}
            mainClassName="justify-center bg-white/10 backdrop-blur-md ml-2 text-blue-200 shadow-lg rounded-md w-30 md:w-50 text-2xl md:text-5xl my-auto px-2 py-1 shadow-gray-600 shadow-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={4000}
            />
            </motion.div>
        </section>
        <section className="z-1 mt-30">
            <Slideshow />
        </section>
        <section id="about" className="mt-30">
            <About/>
        </section>
    </main>
    )
}