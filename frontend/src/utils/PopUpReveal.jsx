import { motion } from "framer-motion";

export default function PopUpReveal({
  children,
  className,
  duration = 0.5,
  y = 10,
}) {
  const alertVariants = {
    hidden: {
      opacity: 0,
      y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
      },
    },
    exit: {
      opacity: 0,
      y,
      transition: {
        duration,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={alertVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
