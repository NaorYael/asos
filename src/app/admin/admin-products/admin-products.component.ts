import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../model/product';
import {map} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['name', 'price', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
  }

  filter(query: string) {
    this.dataSource.filter = query;
  }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .pipe(map( p => {key: p.payload.key, value: p.payload.value}))
      .subscribe(product => {
        this.dataSource = new MatTableDataSource(product);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (
          data: Product,
          filter: string
        ) => data.value.name.toLowerCase()
          .includes(filter.toLowerCase());
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // displayedColumns = ['name', 'price', 'edit'];
  // dataSource: MatTableDataSource<Product>;
  // dataSource1: Product[];
  //
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  //
  //
  // products: Product[] = [] as Product[];
  // productSub: Subscription;
  //
  // constructor(private productService: ProductService) {
  //   this.products = [];
  //   this.dataSource = new MatTableDataSource(this.products);
  //   this.dataSource1 = this.products;
  // }
  //
  // ngOnInit() {
  //   this.productSub = this.productService.getAll()
  //     .subscribe(products => {
  //       this.products = products;
  //       console.log(this.products)
  //     });
  // };
  //
  // ngOnDestroy(): void {
  //   if (this.productSub) {
  //     this.productSub.unsubscribe();
  //   }
  // }
  //
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  //
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim();
  //   filterValue = filterValue.toLowerCase();
  //   this.dataSource.filter = filterValue;
  // }


}

