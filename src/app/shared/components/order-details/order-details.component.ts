import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../../shopping/services/order.service';
import {ShoppingCartService} from '../../../shopping/services/shopping-cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: string;
  order$;
  cart$;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get("id");
    this.order$ =  this.orderService.getOrderInfo(orderId).valueChanges();
    this.cart$ =  this.cartService.getCart();
    // console.log(this.order$);
  }

  // get totalPrice() {
  //   let sum = 0;
  //   for (let productId in this.items) {
  //     sum += this.items[productId].totalPrice;
  //   }
  //   console.log(sum);
  //   return sum;
  // }



}
