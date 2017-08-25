import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ProductsService {

  constructor(private http: Http) {
  }

  getProducts() {
    return this.http.get('https://api.zalando.com/articles')
      .map(
        (response: Response) => {
          // console.log(response);
          return response.json();
        }
      );
  }
}
