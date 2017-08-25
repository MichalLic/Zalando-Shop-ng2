import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProductsService {

  public API_ENDPOINT = 'https://api.zalando.com/articles';

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
}
