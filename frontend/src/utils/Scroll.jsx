import { motion, useScroll, useSpring } from "framer-motion";

export default function Scroll({ children }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-32 left-0 right-0 h-[4px] bg-agenda-primary origin-[0] w-full z-10"
        style={{ scaleX }}
      />
      {children}
    </>
  );
}
