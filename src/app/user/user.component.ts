import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
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

  constructor(private productsService: ProductsService,
              private router: Router) {
  }

  ngOnInit() {
    this.productsService.getOrderedProducts()
      .subscribe(
        data => this.orderedProducts = data
      );
  }

  onSubmit(form) {
    this.isOrdered = true;
    console.log(form.valid);
    console.log(form.value);
    console.log('kupione!!!!!');
    setTimeout(() => {
      form.reset();
    }, 2500);
  }

  finishOrder() {
    this.router.navigate(['/']);
    this.productsService.removeOrderedProducts()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );;
  }

}
