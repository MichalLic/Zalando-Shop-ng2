import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {
  style,
  animate,
  animateChild,
  transition,
  trigger,
  query as q,
  stagger
} from '@angular/animations';
const query = (s, a, o = {optional: true}) => q(s, a, o);

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items',
          stagger(300, animateChild())
        )
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({transform: 'scale(1)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px'}))
      ]),
    ])
  ]
})
export class CartComponent implements OnInit, OnDestroy {
  productsCart;
  totalPrice: number;
  emptyCart = true;
  orderedProductsSubscription: Subscription;

  constructor(private productsService: ProductsService,
              private router: Router) {
  }

  ngOnInit() {
    this.orderedProductsSubscription = this.productsService.getOrderedProducts()
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

  ngOnDestroy() {
    this.orderedProductsSubscription.unsubscribe();
  }
}
