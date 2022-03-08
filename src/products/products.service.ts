/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(input: {
    title: string;
    desc: string;
    price: number;
    storeId: string;
  }): Product {
    const newProduct = new Product(
      uuidv4(),
      input.title,
      input.desc,
      input.price,
      input.storeId,
    );

    this.products.push(newProduct);

    return newProduct;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(input?: { id?: string }): Product {
    return this.products.filter((product) => product.id === input.id)[0];
  }

  updateProduct(input?: {
    id: string;
    productId?: string;
    title?: string;
    description?: string;
    storeId: string;
    price?: number;
  }): void {
    const product = this.getProduct({ id: input.id });
    if (!product) return;
    const updatedProduct = { ...product };
    if (input.title) {
      updatedProduct.title = input.title;
    }
    if (input.description) {
      updatedProduct.desc = input.description;
    }
    if (input.price) {
      updatedProduct.price = input.price;
    }
    if (input.storeId) {
      updatedProduct.storeId = input.storeId;
    }

    this.products = this.products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      }

      return product;
    });
  }

  removeProduct(id: string) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
