import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {ProductDetail} from './shared/productDetail.model';

@Injectable()
export class ProductsService {
  public API_ENDPOINT = 'https://api.zalando.com/articles';
  public FIREBASE_ENDPOINT = 'https://zalandoshop-ng2.firebaseio.com/products.json';
  productObject = new Subject();
  products = [];

  constructor(private http: Http) {
  }

  getProducts() {
    const headers = new Headers({'Accept-Language': 'en'});
    const options = new RequestOptions({headers: headers});
    return this.http.get(this.API_ENDPOINT, options
    )
      .map(
        (response: Response) => {
          // console.log(response);
          return response.json();
        }
      );
  }

  addProduct(product: ProductDetail) {
    this.products.push(product);
    // this.productObject.next(this.products);
    this.putProducts()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  putProducts() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://zalandoshop-ng2.firebaseio.com/products.json', this.products, {headers: headers});
  }
}
