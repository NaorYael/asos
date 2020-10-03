import {AngularFireDatabase} from '@angular/fire/database';
import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../../shared/models/shopping-cart';
import {Product} from '../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((x) => {
          return new ShoppingCart(x ? x['items'] : '');
        })
      );
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    await this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    await this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    await this.updateItem(product, -1);
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item) => {
        let quantity = (item ? item['quantity'] : 0) + change;
        if (quantity === 0) {
          item$.remove();
        } else {
          item$.update({
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: (item ? item['quantity'] : 0) + change,
          });
        }
      });
  }
}
