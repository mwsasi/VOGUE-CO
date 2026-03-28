/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PRODUCTS } from '../constants';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const trendingProducts = PRODUCTS.filter(p => p.trending).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.newArrival).slice(0, 4);

  return (
    <div className="pb-0">
      <Hero />

      {/* Category Highlights */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop" 
              alt="Women's Collection"
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4"
              >
                Collection
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tighter">Women</h2>
              <Link to="/category/women" className="group relative px-10 py-4 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold overflow-hidden">
                <span className="relative z-10">Discover More</span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Discover More</span>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden group cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=800&auto=format&fit=crop" 
              alt="Men's Collection"
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4"
              >
                Collection
              </motion.span>
              <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tighter">Men</h2>
              <Link to="/category/men" className="group relative px-10 py-4 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold overflow-hidden">
                <span className="relative z-10">Discover More</span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">Discover More</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-32 bg-brand-gray px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 text-center md:text-left">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <Sparkles size={16} className="text-gray-400" />
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">Curated Selection</p>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">Trending Now</h2>
            </div>
            <Link to="/category/all" className="group flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-black pb-2 hover:opacity-50 transition-all">
              <span>View All Pieces</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative h-[500px] md:h-[650px] overflow-hidden bg-black flex items-center justify-center text-center px-6"
        >
          <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
            alt="Promotion"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10 max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/60 mb-8 block"
            >
              Exclusive Access
            </motion.span>
            <h2 className="text-white text-5xl md:text-8xl font-serif mb-10 leading-[0.9] tracking-tighter">Join the <br /> <span className="italic">VOGUE</span> Circle</h2>
            <p className="text-white/60 text-sm md:text-lg mb-12 max-w-xl mx-auto leading-relaxed font-light">
              Subscribe to our newsletter and receive 15% off your first order, plus early access to new collections and exclusive events.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full md:w-96 bg-white/5 border border-white/10 px-8 py-5 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all text-sm"
              />
              <button className="w-full md:w-auto px-12 py-5 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all duration-500">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* New Arrivals */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 text-center md:text-left">
          <div className="mb-8 md:mb-0">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-4">Just Landed</p>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">New Arrivals</h2>
          </div>
          <Link to="/category/all" className="group flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-black pb-2 hover:opacity-50 transition-all">
            <span>Shop All New</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
