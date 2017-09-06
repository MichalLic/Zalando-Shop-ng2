import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productsCart;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getOrderedProducts()
      .subscribe(
        data => this.productsCart = data
      );

  }

}
