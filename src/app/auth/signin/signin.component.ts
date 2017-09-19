import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isLogged: boolean = true;
  isLoggedSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
    this.isLoggedSubscription = this.authService.isLogged.subscribe(
      (data: boolean) => {
        this.isLogged = data;
        console.log(this.isLogged);
        if (this.isLogged) {
          this.router.navigate(['/']);
        }
      }
    );
  }

}
