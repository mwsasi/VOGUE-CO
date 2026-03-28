/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { db, handleFirestoreError, OperationType, logout } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy, writeBatch, doc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { formatPrice, cn } from '../lib/utils';
import { Package, LogOut, ChevronRight, User as UserIcon, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

export default function Profile() {
  const { user, loading, isAdmin } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [fetchingOrders, setFetchingOrders] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef, 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        
        try {
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(ordersData);
        } catch (error) {
          // If index is not ready, it might fail. Handle gracefully.
          console.error("Error fetching orders:", error);
        } finally {
          setFetchingOrders(false);
        }
      };
      
      fetchOrders();
    }
  }, [user]);

  const seedProducts = async () => {
    if (!isAdmin) return;
    setIsSeeding(true);
    try {
      const batch = writeBatch(db);
      PRODUCTS.forEach((product) => {
        const productRef = doc(db, 'products', product.id);
        batch.set(productRef, product);
      });
      await batch.commit();
      alert('Products seeded successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'products');
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 bg-brand-gray rounded-2xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black text-white">
                    <UserIcon size={24} />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">{user.displayName || 'Vogue Member'}</h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{user.email}</p>
                {isAdmin && <span className="text-[8px] bg-black text-white px-2 py-0.5 rounded uppercase tracking-widest font-bold">Admin</span>}
              </div>
            </div>
            
            <nav className="space-y-2">
              <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl text-xs uppercase tracking-widest font-bold">
                <span>Account Details</span>
                <ChevronRight size={14} />
              </button>
              
              {isAdmin && (
                <button 
                  onClick={seedProducts}
                  disabled={isSeeding}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/50 rounded-xl text-xs uppercase tracking-widest font-bold transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Database size={14} />
                    <span>{isSeeding ? 'Seeding...' : 'Seed Products'}</span>
                  </div>
                  <ChevronRight size={14} />
                </button>
              )}

              <button className="w-full flex items-center justify-between p-4 hover:bg-white/50 rounded-xl text-xs uppercase tracking-widest font-bold transition-all">
                <span>Shipping Addresses</span>
                <ChevronRight size={14} />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-white/50 rounded-xl text-xs uppercase tracking-widest font-bold transition-all">
                <span>Payment Methods</span>
                <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => logout()}
                className="w-full flex items-center space-x-3 p-4 text-red-500 text-xs uppercase tracking-widest font-bold hover:bg-red-50 rounded-xl transition-all mt-4"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          <header>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tighter mb-4">Order History</h1>
            <p className="text-gray-400 text-sm">Review and track your recent purchases from VOGUE & CO.</p>
          </header>

          {fetchingOrders ? (
            <div className="py-20 flex justify-center">
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center bg-brand-gray rounded-2xl">
              <Package size={40} className="mx-auto text-gray-300 mb-6" />
              <p className="text-gray-400 font-serif text-xl italic mb-8">You haven't placed any orders yet.</p>
              <button 
                onClick={() => navigate('/category/all')}
                className="px-10 py-4 bg-black text-white text-[10px] uppercase tracking-widest font-bold hover:bg-gray-900 transition-all"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-100 rounded-2xl overflow-hidden"
                >
                  <div className="p-6 bg-brand-gray flex flex-wrap justify-between items-center gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Order ID</p>
                      <p className="text-xs font-mono">{order.id.slice(0, 12)}...</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Date</p>
                      <p className="text-xs">{order.createdAt?.toDate().toLocaleDateString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total</p>
                      <p className="text-xs font-bold">{formatPrice(order.total)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</p>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold",
                        order.status === 'delivered' ? "bg-green-100 text-green-700" :
                        order.status === 'shipped' ? "bg-blue-100 text-blue-700" :
                        "bg-orange-100 text-orange-700"
                      )}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                            Size: {item.selectedSize} | Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
