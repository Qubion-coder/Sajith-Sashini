import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const images = [
  { id: 1, url: '/pre/WhatsApp%20Image%202026-09-07%20at%2019.38.19.jpeg', title: 'The Beginning' },
  { id: 2, url: '/pre/WhatsApp%20Image%202026-09-07%20at%2019.38.20%20(1).jpeg', title: 'Our Journey' },
  { id: 3, url: '/pre/WhatsApp%20Image%202026-09-07%20at%2019.38.20.jpeg', title: 'A Thousand Words' },
  { id: 4, url: '/pre/WhatsApp%20Image%202026-09-07%20at%2019.38.21.jpeg', title: 'Endless Love' },
];

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="w-full relative py-16 md:py-24 overflow-hidden">
      {/* Premium ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-radial from-brand-lavender/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 mb-8 sm:mb-16 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-3 sm:gap-4 mb-3 sm:mb-6 justify-center">
            <div className="w-8 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-brand-plum/60" />
            <span className="text-brand-plum uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[9px] sm:text-[11px] font-bold font-sans drop-shadow-sm">Gallery</span>
            <div className="w-8 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-brand-plum/60" />
          </div>
          <h2 className="text-4xl sm:text-7xl lg:text-[5.5rem] font-display text-stone-800 tracking-tight drop-shadow-sm leading-tight">
            Our <span className="italic font-light text-brand-plum block sm:inline">Moments</span>
          </h2>
        </motion.div>
      </div>

      {/* Elegant Staggered Grid, highly optimized for mobile view */}
      <div className="max-w-6xl mx-auto px-3 sm:px-8 relative z-10 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className={`relative group cursor-pointer 
                ${index === 0 || index === 2 ? 'mb-8 sm:mb-12' : 'mt-8 sm:mt-12'}
                md:mt-0 md:mb-0
                ${index % 2 === 1 ? 'md:translate-y-16' : ''}
              `}
              onClick={() => setSelectedImage(image.url)}
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-[2rem] shadow-[0_15px_35px_rgba(176,137,104,0.15)] bg-white/60 p-1 sm:p-3 border border-white/50 backdrop-blur-sm transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(176,137,104,0.25)]">
                <div className="overflow-hidden rounded-[0.6rem] sm:rounded-[1.5rem] aspect-[3/4] sm:aspect-[4/5] relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Elegant inner shadow for depth */}
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none rounded-[0.6rem] sm:rounded-[1.5rem]" />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end justify-center pb-4 sm:pb-6">
                    <p className="text-white font-serif text-sm sm:text-xl tracking-wider font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-md">
                      {image.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Premium Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[200] bg-stone-900/95 flex items-center justify-center p-2 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/50 hover:text-white transition-colors p-3 sm:p-4 bg-white/10 rounded-full backdrop-blur-md shadow-2xl hover:bg-white/20 group"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              src={selectedImage}
              alt="Gallery Preview"
              className="max-w-full max-h-[85vh] sm:max-h-[90vh] object-contain rounded-xl sm:rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] border-[4px] sm:border-[6px] border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
