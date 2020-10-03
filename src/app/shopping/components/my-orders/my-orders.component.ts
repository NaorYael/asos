import {Component, OnDestroy, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../../auth/auth.service';
import {OrderService} from '../../services/order.service';
import {Subscription} from 'rxjs';
import {Order} from '../../../shared/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders$;
  result: boolean;
  orderSub: Subscription;
  dialogSub: Subscription;

  constructor(
    private authService: AuthService,
    public orderService: OrderService
  ) {
    this.orders$ = authService.user$.pipe(
      switchMap(user =>
        orderService.getOrdersByUserId(user.uid).valueChanges()));
  }

  ngOnInit() {
    this.orderSub = this.orderService.getAllOrders().snapshotChanges().subscribe(
      orders => {
        this.orders$ = orders.map((data: any) => {
            return {
              key: data.payload.key,
              ...data.payload.val(),
            } as Order;
          }
        );
      }
    );

  }


  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }
}
