/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
}

export default function Cart({ items, onUpdateQuantity, onRemove }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 px-6 text-center max-w-xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="p-8 bg-brand-gray rounded-full">
            <ShoppingBag size={48} strokeWidth={1} className="text-gray-300" />
          </div>
        </div>
        <h1 className="text-3xl font-serif mb-4">Your bag is empty</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Looks like you haven't added anything to your bag yet. Explore our latest collections and find something you love.
        </p>
        <Link 
          to="/category/all" 
          className="inline-block px-12 py-4 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-serif tracking-tighter mb-16">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={`${item.id}-${item.selectedSize}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex space-x-6 pb-8 border-b border-gray-100"
              >
                <div className="w-24 md:w-32 aspect-[3/4] bg-gray-100 overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium tracking-tight mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{item.subcategory}</p>
                      <p className="text-xs font-medium">Size: {item.selectedSize}</p>
                    </div>
                    <p className="text-base font-semibold">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-gray-200">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => onRemove(item.id, item.selectedSize)}
                      className="text-gray-400 hover:text-black transition-colors flex items-center space-x-1"
                    >
                      <Trash2 size={14} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="bg-brand-gray p-8 sticky top-32">
            <h2 className="text-xs uppercase tracking-widest font-bold mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-lg">{formatPrice(total)}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout"
              className="w-full py-4 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors flex items-center justify-center space-x-3"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>
            
            <div className="mt-8 space-y-4">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Shipping and taxes calculated at checkout. Free shipping on orders over $500.
              </p>
              <div className="flex items-center space-x-4 opacity-30 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
