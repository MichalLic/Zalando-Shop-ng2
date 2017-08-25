import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products;
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        (data) => {
          console.log(data);
          this.products = data.content;
          console.log(this.products);
        }
      );
  }

}
