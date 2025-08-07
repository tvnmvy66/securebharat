"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

export default function Login() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("No credential received");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
        credentials: "include",
      });

      if (response.ok){
        const data = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(data.payload));
        setIsOpen(false);
        toast.success(`Hey ${data?.payload.name || null }, Welcome !`, {
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(16px)",            
            WebkitBackdropFilter: "blur(16px)",   
            border:"0" ,     
            color:"white"
          },
          position:'top-center'
        });
        window.location.href = "/";
      } else {
        alert("login failed please try after some time")
      }
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  const handleError = () => {
    toast.error("Google login failed!", {
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",            
        WebkitBackdropFilter: "blur(16px)",   
        border:"0" ,     
        color:"white"
      },
      action: {
        label: "Login",
        onClick: () => {
          window.location.href = "/login";
        },
      },
      actionButtonStyle:{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(16px)",            
        WebkitBackdropFilter: "blur(16px)",   
        border:"0" ,     
        color:"white"
      },
      position:'top-center'
    });
  };



  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.50 }}
            className="bg-white/10 backdrop-blur-2xl text-white w-screen h-screen fixed font-mono text-2xl flex flex-col items-center justify-center gap-4 z-10 -mt-[8.7vh] "
          > 
            <span className="font-bold">Login</span>
            <motion.div
            className="bg-white/10 backdrop-blur-2xl w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] h-[40vh] rounded-xl p-5 flex flex-col items-center justify-center gap-5"
            >
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </motion.div>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-10 h-10 bg-white rounded-full mt-5 text-black p-2" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
