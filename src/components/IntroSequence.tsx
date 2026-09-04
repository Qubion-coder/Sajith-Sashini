import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroSequenceProps {
  onComplete: () => void;
  onMusicStart: () => void;
  readyToTransition?: boolean;
}

export function IntroSequence({ onComplete, onMusicStart, readyToTransition = true }: IntroSequenceProps) {
  const [stage, setStage] = useState<'button' | 'video' | 'finished'>('button');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setStage('video');
  };

  const handleVideoEnd = () => {
    setStage('finished');
    onMusicStart();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fffff4] overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === 'button' && (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
          >
            <video
              src="/intro.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-60 pointer-events-none"
            />
            
            <div className="relative z-10 flex flex-col items-center p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl">
              <button
                onClick={handleStart}
                disabled={!readyToTransition}
                className="px-10 py-4 bg-white/90 text-stone-900 rounded-full font-sans uppercase tracking-widest text-xs font-bold shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 disabled:opacity-50 hover:-translate-y-1"
              >
                {readyToTransition ? 'View Invitation' : 'Loading...'}
              </button>
            </div>
          </motion.div>
        )}
        
        {stage === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full bg-black flex items-center justify-center"
          >
            <video
              ref={videoRef}
              src="/intro.mp4"
              autoPlay
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover sm:object-contain"
            />
            
            <button
              onClick={handleVideoEnd}
              className="absolute top-8 right-8 sm:top-12 sm:right-12 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-[10px] sm:text-xs font-sans tracking-widest uppercase backdrop-blur-md transition-colors"
            >
              Skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
