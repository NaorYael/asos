import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../shopping/services/category.service';
import {ProductService} from '../../../shopping/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {AngularFireList} from '@angular/fire/database';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogsService} from '../../../utils/dialogs/dialogs.service';
import {SnackbarService} from '../../../shopping/services/snackbar.service';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent  {
  categories: AngularFireList<any>;
  categories$: Observable<any[]>;
  product = {name: '', category: '', price: null, imageUrl: ''} as Product;
  id;

  dialogSub: Subscription;
  result: any;
  productForm: FormGroup;
  regURL = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private location: Location,
    private fb: FormBuilder,
    private dialogsService: DialogsService,
    private snackService: SnackbarService,
  ) {
    this.productForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/g), Validators.maxLength(30)]),
      category: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.pattern(this.regURL), Validators.required])
    });
    this.categories = this.categoryService.getAll();
    this.categories$ = this.categories
      .snapshotChanges()
      .pipe(
        map((res) =>
          res.map((c) => ({key: c.payload.key, ...c.payload.val()}))
        )
      );
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .get(this.id)
        .valueChanges()
        .pipe(take(1))
        .subscribe((p) => (this.product = p as Product));
    }
  }

  save(product) {
    if (this.id) {
      this.productService.update(product, this.id);
      this.snackService.openSnackBarWithAction('Product updated successfully', 'Close');
    } else {
      this.productService.create(product);
      this.snackService.openSnackBarWithAction('Product saved successfully', 'Close');
    }
    this.router.navigate(['/admin/products']);
  }

  remove(id) {
    this.dialogSub = this.dialogsService
      .confirm('Confirm', 'Are you sure you want to do this product?')
      .subscribe(res => {
        this.result = res;
        if (res == true) {
          this.productService.delete(id);
          this.router.navigate(['/admin/products']);
        }
      });
  }

  checkError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  };

  ngOnDestroy(): void {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }


}
