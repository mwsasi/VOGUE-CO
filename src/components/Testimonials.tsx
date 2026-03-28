/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Fashion Stylist",
    content: "The quality of the wool coat I purchased exceeded all my expectations. VOGUE & CO. has truly mastered the art of minimalist luxury.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Creative Director",
    content: "Finally, a brand that understands fit and fabric. The structured blazer is my new go-to for every high-stakes meeting.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Sophia Loren",
    role: "Model",
    content: "The silk slip dress feels like a second skin. It's rare to find such elegance combined with effortless comfort.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Julian Vane",
    role: "Architect",
    content: "I appreciate the architectural lines in their tailoring. Every piece feels intentional and built to last.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-4"
          >
            Voices of Vogue
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif tracking-tighter"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="p-8 bg-brand-gray flex flex-col justify-between h-full group hover:bg-black hover:text-white transition-all duration-500"
            >
              <div>
                <Quote size={32} className="text-gray-300 group-hover:text-white/20 mb-6 transition-colors" />
                <p className="text-sm italic leading-relaxed mb-8">
                  "{t.content}"
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest">{t.name}</h4>
                  <p className="text-[10px] text-gray-400 group-hover:text-white/50 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
