import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Product} from '../../model/product';
import {Subscription} from 'rxjs';
import {DialogsService} from '../../ui/dialogs/dialogs.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories$;
  productForm: FormGroup;
  regURL = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
  product: any = {};
  id;
  result: any;
  dialogSub: Subscription;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService,
              private dialogsService: DialogsService,
              public location: Location
  ) {
    this.productForm = fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d{0,2}$/g), Validators.maxLength(30)]),
      category: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.pattern(this.regURL), Validators.required])
    });
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id)
        // take 1 product so we dont need yo unsubscribe.
        .pipe(take(1))
        .subscribe(p => {
          const product: any = p.payload.val();
          this.name.setValue(product.name);
          this.price.setValue(product.price);
          this.category.setValue(product.category);
          this.imageUrl.setValue(product.imageUrl);
        });
    }
  }

  saveOrUpdate(productForm: FormGroup) {
    if (this.id) {
      this.productService.update(this.id, productForm.value);
      this.router.navigate(['/admin/products']);
    }
    else {
      this.productService.create(productForm.value);
      this.router.navigate(['/admin/products']);
    }

  }

  remove(id) {
    this.dialogSub = this.dialogsService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')
      .subscribe(res => {
        this.result = res;
        if (res == true) {
          this.productService.remove(id);
          this.router.navigate(['/admin/products']);
        }
      });

  }

  checkError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  };


  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get category() {
    return this.productForm.get('category');
  }

  get imageUrl() {
    return this.productForm.get('imageUrl');
  }

  ngOnDestroy(): void {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }

  back() {
    this.location.back();
  }
}
