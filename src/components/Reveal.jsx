import React from 'react';
import { motion } from 'framer-motion';

export default function Reveal({ children, className = '', delay = 0, y = 20, duration = 0.6 }) {
  return (
    <div className={className} style={{ overflow: 'visible' }}>
      <motion.div
        initial={{ opacity: 0, y: y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration, delay: delay / 1000, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
