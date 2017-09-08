import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {AuthService} from './auth/auth.service';

@Injectable()
export class ProductsService {
  public API_ENDPOINT = 'https://api.zalando.com/articles';
  public FIREBASE_ENDPOINT = 'https://zalandoshop-ng2.firebaseio.com/products.json';

  constructor(private http: Http,
              private authService: AuthService) {
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
    const token = this.authService.getToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(this.FIREBASE_ENDPOINT + '?auth=' + token, products, {headers: headers});
  }

  /**
   * get value ( products ) from firebase database (if they are)
   * @returns {Observable<R>}
   */
  getOrderedProducts() {
    const token = this.authService.getToken();
    return this.http.get(this.FIREBASE_ENDPOINT + '?auth=' + token)
      .map(
        (response: Response) => response.json()
      );
  }

  /**
   * remove all products from database after placed order
   * @returns {Observable<Response>}
   */
  removeOrderedProducts() {
    const token = this.authService.getToken();
    return this.http.delete(this.FIREBASE_ENDPOINT + '?auth=' + token);
  }
}
