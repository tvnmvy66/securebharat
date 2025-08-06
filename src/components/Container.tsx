import {motion} from "framer-motion"

const Box = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: -500 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 5 }}
    viewport={{ once: true, amount: 0.2 }}
    className="p-4 bg-gray-100 rounded-md shadow"
  >
    {children}
  </motion.div>
);

export default Box