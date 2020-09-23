import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../model/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private httpClient: HttpClient) {
  }


  public getProductMenById(id: number): Observable<Product> {
    return Observable.create(observer => {
      this.httpClient.get<Product[]>('assets/json/men.json')
        .subscribe(products => {
          const product = products.find(p => p.id === id);
          observer.next(product);
        });
    });
  }

  public getAllMenProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('assets/json/men.json');
  }

  public getAllWomenProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('assets/json/women.json');
  }

  public getProductWomenById(id: number): Observable<Product> {
    return Observable.create(observer => {
      this.httpClient.get<Product[]>('assets/json/women.json')
        .subscribe(products => {
          const product = products.find(p => p.id === id);
          observer.next(product);
        });
    });

  }

}
