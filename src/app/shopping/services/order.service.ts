import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ShoppingCartService} from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private shoppingCartService: ShoppingCartService) {
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders/').push(order);
    await this.shoppingCartService.clearCart();
    return result;
  }

  getAllOrders() {
    return this.db.list('/orders/');
  }


  deleteOrder(orderId) {
    return this.db.object('/orders/' + orderId).remove();
  }

  getOrderInfo(orderId: string) {
    return this.db.object('/orders/' + orderId);
  }

  getOrdersByUserId(userId: string) {
    return this.db.list('/orders/', (ref) => {
      return ref.orderByChild('userId').equalTo(userId);
    });
  }

}
