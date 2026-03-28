/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User as UserIcon, Menu, X, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../AuthContext';
import { loginWithGoogle } from '../lib/firebase';

interface NavbarProps {
  cartCount: number;
}

export default function Navbar({ cartCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'New Arrivals', path: '/' },
    { name: 'Women', path: '/category/women' },
    { name: 'Men', path: '/category/men' },
    { name: 'Collections', path: '/' },
  ];

  const handleAuthAction = async () => {
    if (user) {
      navigate('/profile');
    } else {
      try {
        await loginWithGoogle();
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 md:px-12',
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3' : 'bg-transparent text-white'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-xs uppercase tracking-widest font-medium hover:opacity-50 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link 
          to="/" 
          className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-3xl tracking-tighter font-semibold"
        >
          VOGUE & CO.
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="p-2 hover:opacity-50 transition-opacity">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button 
            onClick={handleAuthAction}
            className="hidden md:flex items-center space-x-2 p-2 hover:opacity-50 transition-opacity"
          >
            {user ? (
              <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={16} strokeWidth={1.5} className="m-1" />
                )}
              </div>
            ) : (
              <UserIcon size={20} strokeWidth={1.5} />
            )}
          </button>
          <Link to="/cart" className="p-2 hover:opacity-50 transition-opacity relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-8 flex flex-col space-y-6 md:hidden shadow-xl text-black"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-serif tracking-tight"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <button 
                onClick={handleAuthAction}
                className="flex items-center space-x-2 text-sm uppercase tracking-widest font-medium"
              >
                {user ? <UserIcon size={18} /> : <LogIn size={18} />}
                <span>{user ? 'Profile' : 'Sign In'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
