/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          <source 
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27ee34512003d056569ae3e9a5d233592d7f792&profile_id=164&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ delay: 0.2, duration: 1.2 }}
            className="text-white text-[10px] md:text-xs uppercase font-bold mb-6 block"
          >
            Spring Summer 2026 Collection
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="text-white text-6xl md:text-9xl font-serif tracking-tighter leading-[0.85] mb-10"
          >
            The Art of <br /> <span className="italic">Minimalism</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/category/all"
              className="group relative px-12 py-4 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold overflow-hidden transition-all hover:pr-16"
            >
              <span className="relative z-10">Shop Collection</span>
              <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" size={16} />
            </Link>
            
            <button className="flex items-center space-x-3 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-70 transition-opacity">
              <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                <Play size={14} fill="white" />
              </div>
              <span>Watch Film</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-white/40 text-[8px] uppercase tracking-widest font-bold">Scroll</span>
      </motion.div>
    </section>
  );
}
