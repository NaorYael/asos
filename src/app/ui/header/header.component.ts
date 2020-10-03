import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {UserService} from '../../shopping/services/user.service';
import {ShoppingCartService} from '../../shopping/services/shopping-cart.service';
import {Location} from '@angular/common';
import {ProductService} from '../../shopping/services/product.service';
import {MatTableDataSource} from '@angular/material/table';
import {FavoriteService} from '../../shopping/services/favorite.service';
import {animate, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeIn, fadeOut} from '../../utils/animations';
import {ShoppingCart} from '../../shared/models/shopping-cart';
import {Product} from '../../shared/models/product';
import {AppUser} from '../../shared/models/appUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('collapse', [
      state(
        '*',
        style({
          height: '*',
          overflow: 'hidden',
        }),
      ),
      state(
        'void',
        style({
          height: '0px',
          overflow: 'hidden',
        }),
      ),
      transition(`:enter`, animate('350ms')),
      transition(`:leave`, animate('350ms')),
    ]),
    trigger('fadeIn', [transition('void => *', useAnimation(fadeIn))]),
    trigger('fadeOut', [transition('* => void', useAnimation(fadeOut))])
  ]
})

export class HeaderComponent implements OnInit, OnDestroy {

  @Input() deviceXs: boolean;
  searchMode = false;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  subscription: Subscription;
  productsSub: Subscription;
  favSub: Subscription;
  products: MatTableDataSource<any>;
  filteredProducts: Product[];
  filteredProducts2: Product[];
  query: string = '';
  favoriteProducts: number;

  show = true;
  hide = true;
  fadeState: string = 'out';

  constructor(public router: Router,
              private auth: AuthService,
              private location: Location,
              private shoppingCartService: ShoppingCartService,
              private productService: ProductService,
              private userService: UserService,
              private favoriteService: FavoriteService) {

    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl);
        }
      }
    });

    this.productsSub = this.productService.getAll();

    productService.products.subscribe(p =>
      this.filteredProducts = p);

    this.products = new MatTableDataSource(this.filteredProducts);

    this.favSub = this.favoriteService.getAll().valueChanges().subscribe(
      products => {
        this.favoriteProducts = products.length;
      }
    );
  }


  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  filter() {
    this.filteredProducts2 = [];
    this.filteredProducts.filter(p => {
      if (p.name.toLowerCase().startsWith(this.query.toLowerCase())) {
        this.filteredProducts2.push(p);
      }
    });
    if (this.query == '') {
      this.productService.getAll();
    }
    this.productService.products.next(this.filteredProducts2);
    this.products = new MatTableDataSource<any>(this.filteredProducts2);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.favSub) {
      this.favSub.unsubscribe();
    }
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }


}



