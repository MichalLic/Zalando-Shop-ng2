import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productsCart;
  totalPrice = 0;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsService.getOrderedProducts()
      .subscribe(
        data => {
          this.productsCart = data;
          console.log(data);
          this.totalCartPrice(data);
        }
      );
  }

  totalCartPrice(data) {
    data.map(
      (item) => {
        this.totalPrice += item.quantity * item.price;
        console.log(this.totalPrice);
      }
    );
  }
}
