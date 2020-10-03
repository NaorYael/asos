import {AngularFireDatabase} from '@angular/fire/database';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  products: BehaviorSubject<Product[]> = new BehaviorSubject([]);

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('/products/').push(product);
  }

  getAll() {
    return this.db.list('/products/')
      .snapshotChanges()
      .pipe(
        map((res) =>
          res.map((c: any, index) => {
            return {
              ...c.payload.val(),
              position: index + 1,
              key: c.payload.key
            } as Product;
          })
        )
      ).subscribe(p => {
        this.products.next(p);
      });
  }

  get(productId) {
    return this.db.object('/products/' + productId);
  }

  update(product, productId) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
