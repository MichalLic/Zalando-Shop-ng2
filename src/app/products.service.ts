import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {ProductDetail} from './shared/productDetail.model';

@Injectable()
export class ProductsService {
  public API_ENDPOINT = 'https://api.zalando.com/articles';
  public FIREBASE_ENDPOINT = 'https://zalandoshop-ng2.firebaseio.com/products.json';

  constructor(private http: Http) {
  }

  /**
   * get products from zalando api
   * @returns {Observable<R>}
   */
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

  /**
   * put product as json to firebase database
   * @param products
   * @returns {Observable<Response>}
   */
  putProducts(products) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://zalandoshop-ng2.firebaseio.com/products.json', products, {headers: headers});
  }

  /**
   * get value ( products ) from firebase database (if they are)
   * @returns {Observable<R>}
   */
  getOrderedProducts() {
    return this.http.get(this.FIREBASE_ENDPOINT)
      .map(
        (response: Response) => response.json()
      );
  }
}
