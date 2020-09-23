import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  // getAll() {
  //   return this.db.list('/products/')
  //     .snapshotChanges();
  // }

  getAll() {
    return this.db.list('/products/')
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({key: c.payload.key, value: c.payload.val()}))));
  }


  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  remove(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
