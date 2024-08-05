import { motion } from "framer-motion";

export default function Reveal({
  children,
  className,
  delay = 0.25,
  duration = 0.5,
  y = 50,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
