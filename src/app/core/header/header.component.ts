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
  constructor(private authService: AuthService,
              private router: Router,
              private productsService: ProductsService) {
  }

  ngOnInit() {
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
