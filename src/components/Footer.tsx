/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-gray pt-20 pb-10 px-6 md:px-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <div className="space-y-6">
          <h3 className="font-serif text-2xl tracking-tighter font-semibold">VOGUE & CO.</h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
            Redefining modern elegance through minimalist design and premium craftsmanship.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-white rounded-full hover:bg-black hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 bg-white rounded-full hover:bg-black hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="p-2 bg-white rounded-full hover:bg-black hover:text-white transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link to="/category/women" className="hover:text-black transition-colors">Women's Collection</Link></li>
            <li><Link to="/category/men" className="hover:text-black transition-colors">Men's Collection</Link></li>
            <li><Link to="/" className="hover:text-black transition-colors">New Arrivals</Link></li>
            <li><Link to="/" className="hover:text-black transition-colors">Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Press</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-[10px] uppercase tracking-widest text-gray-400">
          © 2026 VOGUE & CO. ALL RIGHTS RESERVED.
        </p>
        <div className="flex space-x-6 text-[10px] uppercase tracking-widest text-gray-400">
          <a href="#" className="hover:text-black transition-colors">Privacy</a>
          <a href="#" className="hover:text-black transition-colors">Terms</a>
          <a href="#" className="hover:text-black transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
