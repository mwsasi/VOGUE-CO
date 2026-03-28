/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Product } from '../types';

export default function ProductList() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, 'products');
        let q = query(productsRef);
        
        if (category && category !== 'all') {
          q = query(productsRef, where('category', '==', category));
        }
        
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => doc.data() as Product);
        
        if (productsData.length > 0) {
          setProducts(productsData);
        } else {
          // Fallback to constants if DB is empty
          const filtered = category === 'all' || !category
            ? PRODUCTS 
            : PRODUCTS.filter(p => p.category === category);
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to constants on error
        const filtered = category === 'all' || !category
          ? PRODUCTS 
          : PRODUCTS.filter(p => p.category === category);
        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Collections';

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-4"
        >
          Explore
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif tracking-tighter"
        >
          {categoryTitle}
        </motion.h1>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-6 border-b border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 md:mb-0">
          Showing {products.length} products
        </p>
        <div className="flex space-x-8">
          <button className="text-[10px] uppercase tracking-widest font-bold hover:opacity-50 transition-opacity">Sort By</button>
          <button className="text-[10px] uppercase tracking-widest font-bold hover:opacity-50 transition-opacity">Filter</button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      {!loading && products.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-gray-400 font-serif text-xl italic">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
