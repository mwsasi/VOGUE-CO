/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9]">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
          
          {/* Badge */}
          {product.newArrival && (
            <div className="absolute top-6 left-6 overflow-hidden">
              <motion.span 
                initial={{ x: -50 }}
                whileInView={{ x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-black text-white px-4 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold block"
              >
                New Arrival
              </motion.span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          
          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button className="w-full py-4 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl hover:bg-black hover:text-white transition-all duration-300">
              Add to Bag
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium tracking-tight text-gray-900 group-hover:underline decoration-1 underline-offset-4 transition-all">
              {product.name}
            </h3>
            <p className="text-sm font-semibold tabular-nums">{formatPrice(product.price)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-[1px] bg-gray-300" />
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">{product.subcategory}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
