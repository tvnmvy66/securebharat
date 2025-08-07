"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function NoItems() {
  
  return (
    <div>
      <AnimatePresence>
        <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.50 }}
        className="bg-white/10 backdrop-blur-2xl w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] h-[40vh] rounded-xl p-5 flex items-center justify-center text-white mx-auto mt-[7rem] shadow-xl shadow-gray-900"
        > 
            <span className="font-bold">No Reports found</span>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
