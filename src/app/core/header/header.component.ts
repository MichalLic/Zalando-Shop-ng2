import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {ProductsService} from '../../products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  amount: number;

  constructor(private authService: AuthService,
              private router: Router,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsService.productsAmount
      .subscribe(
        data => {
          console.log(data);
          this.amount = +data.length;
        }
      );
  }

  onLogout() {
    this.productsService.removeOrderedProducts()
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    this.authService.logout();
    this.router.navigate(['/']);
    console.log(this.authService.isAuthenticated());
  }

}
