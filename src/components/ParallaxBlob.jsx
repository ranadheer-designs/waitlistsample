import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxBlob() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 180]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 w-full h-full">
      {/* Primary Blob */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-orange-300/30 to-rose-300/30 rounded-full blur-[80px]"
      />
      
      {/* Secondary Blob */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[40%] right-[-10%] md:right-[-5%] w-[60vw] h-[60vw] md:w-[400px] md:h-[400px] bg-gradient-to-bl from-blue-300/20 to-purple-300/20 rounded-full blur-[60px]"
      />
    </div>
  );
}
