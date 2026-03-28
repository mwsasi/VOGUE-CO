/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { formatPrice, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { ChevronRight, Minus, Plus, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { CartItem, Product } from '../types';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface ProductDetailProps {
  onAddToCart: (item: CartItem) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct(docSnap.data() as Product);
        } else {
          // Fallback to constants
          const found = PRODUCTS.find(p => p.id === id);
          if (found) {
            setProduct(found);
          } else {
            navigate('/category/all');
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        const found = PRODUCTS.find(p => p.id === id);
        if (found) {
          setProduct(found);
        } else {
          navigate('/category/all');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    setIsAdding(true);
    onAddToCart({
      ...product,
      selectedSize,
      quantity
    });
    
    setTimeout(() => {
      setIsAdding(false);
      navigate('/cart');
    }, 800);
  };

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400 mb-12">
        <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
        <ChevronRight size={10} />
        <button onClick={() => navigate(`/category/${product.category}`)} className="hover:text-black">{product.category}</button>
        <ChevronRight size={10} />
        <span className="text-black font-semibold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] bg-gray-100 overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-gray-100 overflow-hidden">
               <img 
                src={product.image} 
                alt={product.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-50 grayscale"
              />
            </div>
            <div className="aspect-square bg-gray-100 overflow-hidden">
               <img 
                src={product.image} 
                alt={product.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-50 sepia"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 space-y-10">
          <header className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold">{product.subcategory}</p>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tighter leading-tight">{product.name}</h1>
            <p className="text-2xl font-light">{formatPrice(product.price)}</p>
          </header>

          <p className="text-gray-500 leading-relaxed text-sm md:text-base">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs uppercase tracking-widest font-bold">Select Size</h4>
              <button className="text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-200">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-12 h-12 flex items-center justify-center text-xs font-medium border transition-all",
                    selectedSize === size 
                      ? "border-black bg-black text-white" 
                      : "border-gray-200 hover:border-black"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center border border-gray-200">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              
              <button className="p-3 border border-gray-200 hover:bg-gray-50 transition-colors">
                <Heart size={20} strokeWidth={1.5} />
              </button>
              <button className="p-3 border border-gray-200 hover:bg-gray-50 transition-colors">
                <Share2 size={20} strokeWidth={1.5} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={cn(
                "w-full py-5 text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center space-x-3",
                isAdding ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-900"
              )}
            >
              <ShoppingBag size={18} />
              <span>{isAdding ? 'Adding to Bag...' : 'Add to Bag'}</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="pt-10 border-t border-gray-100 space-y-6">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                <span className="text-[10px] uppercase tracking-widest font-bold">Composition & Care</span>
                <Plus size={14} className="group-open:rotate-45 transition-transform" />
              </summary>
              <div className="pt-4 text-xs text-gray-500 leading-relaxed">
                Outer: 100% Wool. Lining: 100% Viscose. Dry clean only. Handle with care to maintain the premium finish.
              </div>
            </details>
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none py-2">
                <span className="text-[10px] uppercase tracking-widest font-bold">Shipping & Returns</span>
                <Plus size={14} className="group-open:rotate-45 transition-transform" />
              </summary>
              <div className="pt-4 text-xs text-gray-500 leading-relaxed">
                Complimentary standard shipping on all orders. Returns accepted within 30 days of delivery.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
