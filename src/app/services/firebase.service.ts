import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  productsRef: AngularFireList<any>;
  productRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
  }

  addProductToCart(product: Product) {
    this.productsRef.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      amount: product.amount
    });
  }

  getProduct(id: string) {
    this.productRef = this.db.object('products/' + id);
    return this.productRef;
  }


  getProductsList() {
    this.productsRef = this.db.list('products');
    return this.productsRef;
  }


  // updateProduct(product: Product) {
  //   this.productRef.update({
  //     name: product.name,
  //     price: product.price,
  //     image: product.image,
  //     description: product.description,
  //     amount: product.amount
  //   });
  // }
  //
  //
  // deleteProduct(id: string) {
  //   this.productRef = this.db.object('products /' + id);
  //   this.productRef.remove();
  // }

}
