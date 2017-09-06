import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productsCart;
  totalPrice: number;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsService.getOrderedProducts()
      .subscribe(
        data => {
          this.productsCart = data;
          console.log(data);
          this.totalCartPrice();
        }
      );
  }

  /**
   * calculation total price of cart
   */
  totalCartPrice() {
    this.totalPrice = 0;
    this.productsCart.map(
      (item) => {
        this.totalPrice += item.quantity * item.price;
        console.log(this.totalPrice);
      }
    );
  }

  /**
   * remove products from the cart and send other value as json to database
   * @param index
   */
  removeProduct(index) {
    this.productsCart.splice(index, 1);
    console.log(this.productsCart);
    this.totalCartPrice();
    this.productsService.putProducts(this.productsCart)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}
