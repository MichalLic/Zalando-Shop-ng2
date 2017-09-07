import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  productsCart;
  totalPrice: number;
  emptyCart = true;

  constructor(private productsService: ProductsService,
              private router: Router) {
  }

  ngOnInit() {
    this.productsService.getOrderedProducts()
      .subscribe(
        data => {
          if (data) {
            this.productsCart = data;
            console.log(data);
            this.totalCartPrice();
            this.emptyCart = false;
          }
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
    if (this.productsCart.length === 0) {
      this.emptyCart = true;
    }
  }

  navTo() {
    this.router.navigate(['/form']);
  }
}
