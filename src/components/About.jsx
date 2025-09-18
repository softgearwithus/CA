import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import i1 from "../assets/1.jpg";
import i2 from "../assets/2.jpg";
import i3 from "../assets/3.jpg";
import i4 from "../assets/4.jpg";

export default function AboutSection() {
  const images = [i1,i2,i3,i4];
  const [index, setIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="about-us"
      className="w-full flex justify-center items-center py-10"
    >
      <div className="relative w-[80%] h-[570px] rounded-xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Slider"
            className="w-full h-full object-cover absolute"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
