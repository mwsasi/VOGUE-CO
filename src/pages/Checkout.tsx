/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { formatPrice, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { db, handleFirestoreError, OperationType, loginWithGoogle } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CheckoutProps {
  items: CartItem[];
  onClearCart: () => void;
}

export default function Checkout({ items, onClearCart }: CheckoutProps) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || ''
      }));
    }
  }, [user]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsProcessing(true);
    
    try {
      const orderData = {
        userId: user.uid,
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          image: item.image
        })),
        total,
        status: 'pending',
        shippingDetails: formData,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      // Update the local ID for the success message if needed
      console.log("Order created with ID: ", docRef.id);
      
      setIsSuccess(true);
      onClearCart();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'orders');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-40 pb-20 px-6 text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-serif mb-4">Sign in to Checkout</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Please sign in with your Google account to complete your purchase and track your order.
        </p>
        <button 
          onClick={() => loginWithGoogle()}
          className="flex items-center space-x-3 mx-auto px-12 py-4 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors"
        >
          <LogIn size={18} />
          <span>Sign In with Google</span>
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="pt-40 pb-20 px-6 text-center max-w-xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-8 flex justify-center"
        >
          <CheckCircle2 size={80} className="text-green-500" strokeWidth={1} />
        </motion.div>
        <h1 className="text-4xl font-serif mb-4">Thank you for your order</h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Your order has been placed successfully. You can track your order status in your profile.
        </p>
        <button 
          onClick={() => navigate('/profile')}
          className="px-12 py-4 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-gray-900 transition-colors"
        >
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-serif tracking-tighter mb-16">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-12">
            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-bold border-b border-gray-100 pb-4">Contact Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Email Address" 
                  className="w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-bold border-b border-gray-100 pb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="First Name" 
                  className="w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <input 
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Last Name" 
                  className="w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <input 
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Address" 
                  className="col-span-2 w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <input 
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="City" 
                  className="w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <input 
                  required
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                  placeholder="Postal Code" 
                  className="w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <input 
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  placeholder="Country" 
                  className="col-span-2 w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <input 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Phone Number" 
                  className="col-span-2 w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-bold border-b border-gray-100 pb-4">Payment Details</h2>
              <div className="grid grid-cols-1 gap-4">
                <input 
                  required
                  placeholder="Card Number" 
                  className="w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required
                    placeholder="Expiry Date (MM/YY)" 
                    className="w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    required
                    placeholder="CVV" 
                    className="w-full bg-brand-gray border border-transparent px-6 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </section>

            <div className="pt-8 flex items-center justify-between">
              <button 
                type="button"
                onClick={() => navigate('/cart')}
                className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold hover:opacity-50 transition-opacity"
              >
                <ArrowLeft size={16} />
                <span>Return to Bag</span>
              </button>
              <button 
                disabled={isProcessing}
                className={cn(
                  "px-12 py-5 text-xs uppercase tracking-widest font-bold transition-all",
                  isProcessing ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-900"
                )}
              >
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
              </button>
            </div>
          </form>
        </div>

        {/* Order Review */}
        <div className="lg:col-span-5">
          <div className="bg-brand-gray p-8 sticky top-32">
            <h2 className="text-xs uppercase tracking-widest font-bold mb-8">Order Review</h2>
            <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2">
              {items.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex space-x-4">
                  <div className="w-16 aspect-[3/4] bg-white flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xs font-bold">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                    <p className="text-xs font-semibold mt-1">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-6 border-t border-gray-200">
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
          </div>
        </div>
      </div>
    </div>
  );
}
