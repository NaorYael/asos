import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireList} from '@angular/fire/database';
import {ProductService} from '../../services/product.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ScrollService} from '../../services/scroll.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {ShoppingCart} from '../../../shared/models/shopping-cart';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: AngularFireList<any>;
  initialProducts: Product[] = [];
  filteredProducts: (Product | number)[] = [];
  category;
  filterSub: Subscription;
  cart$: Observable<ShoppingCart>;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    public scrollService: ScrollService
  ) {

  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();



    this.populateProducts();
  }

  // private populateProducts() {
  //
  //   this.subscription = this.productService.getAll()
  //     .subscribe((p) => {
  //       this.initialProducts = p;
  //       this.route.queryParamMap.subscribe((params) => {
  //         this.category = params.get('category');
  //         this.applyFilter();
  //       });
  //     });
  // }

  private populateProducts() {
    // this.products = this.productService.getAll();

    this.productService.getAll();
    // .snapshotChanges()
    // .pipe(
    //   map((res) =>
    //     res.map((c: any, index) => {
    //       return {
    //         ...c.payload.val(),
    //         position: index + 1,
    //         key: c.payload.key
    //       } as Product;
    //     })
    //   )
    // )
    // .subscribe((p) => {
    // this.initialProducts = p;
    // this.productService.products.next(p);
    this.filterSub = this.productService.products.subscribe(prod =>
      this.filteredProducts = this.initialProducts = prod);

    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      this.applyFilter();
    });
    // });


  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.initialProducts.filter((p) => p.category === this.category)
      : this.initialProducts;
  }

  scrollToId(id: string) {
    this.scrollService.scrollToElementById(id);
  }

  ngOnDestroy() {
    if (this.filterSub) {
      this.filterSub.unsubscribe();
    }

  }
}
