"use client";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: import("framer-motion").MotionStyle;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
