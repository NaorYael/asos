import {Component, OnDestroy, ViewChild} from '@angular/core';
import {AngularFireList} from '@angular/fire/database';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProductService} from '../../../shopping/services/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnDestroy {

  products: AngularFireList<any>;
  filteredProducts: any[];
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['name', 'price', 'edit'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  prodSub: Subscription;

  constructor(private productService: ProductService) {
    this.prodSub = this.productService.products.subscribe((p) => {
      this.filteredProducts = p;
      this.dataSource = new MatTableDataSource(this.filteredProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.prodSub) {
      this.prodSub.unsubscribe();
    }
  }

}
