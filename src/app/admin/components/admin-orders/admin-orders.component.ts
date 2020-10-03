import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../../../shopping/services/order.service';
import {DialogsService} from '../../../utils/dialogs/dialogs.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Order} from '../../../shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  orders$: Order[];
  dialogSub: Subscription;
  orderSub: Subscription;
  result: boolean;

  constructor(private orderService: OrderService,
              private dialogsService: DialogsService,
              private router: Router) {
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

  deleteOrder(order: string) {
    this.dialogSub = this.dialogsService
      .confirm('Confirm', 'Are you sure you want to do this order?')
      .subscribe(res => {
        this.result = res;
        if (res == true) {
          this.orderService.deleteOrder(order);
        }
      });
    this.router.navigate(['/admin/orders']);
  }

  ngOnDestroy(): void {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

}
