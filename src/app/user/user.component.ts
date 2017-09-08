import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  user = {
    name: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    postCode: '',
  };
  isOrdered = false;
  orderedProducts;
  orderedProductsSubscription: Subscription;

  constructor(private productsService: ProductsService,
              private router: Router) {
  }

  ngOnInit() {
    this.orderedProductsSubscription = this.productsService.getOrderedProducts()
      .subscribe(
        data => this.orderedProducts = data
      );
  }

  onSubmit() {
    this.isOrdered = true;
  }

  finishOrder() {
    this.router.navigate(['/']);
    this.productsService.removeOrderedProducts()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  ngOnDestroy() {
    this.orderedProductsSubscription.unsubscribe();
  }

}
