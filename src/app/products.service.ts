import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProductsService {

  constructor(private http: Http) {
  }

  getProducts() {
    const headers = new Headers({'Accept-Language': 'en'});
    const options = new RequestOptions({headers: headers});
    return this.http.get('https://api.zalando.com/articles', options
    )
      .map(
        (response: Response) => {
          // console.log(response);
          return response.json();
        }
      );
  }
}
