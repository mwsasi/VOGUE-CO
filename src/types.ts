/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women';
  subcategory: string;
  image: string;
  description: string;
  sizes: string[];
  trending?: boolean;
  newArrival?: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export type Category = 'men' | 'women' | 'all';
