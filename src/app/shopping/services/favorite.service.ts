import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('/favorites/').push(product);
  }

  getAll() {
    return this.db.list('/favorites/');
  }

  get(productId) {
    return this.db.object('/favorites/' + productId);
  }

  delete(productId) {
    return this.db.object('/favorites/' + productId).remove();
  }
}
