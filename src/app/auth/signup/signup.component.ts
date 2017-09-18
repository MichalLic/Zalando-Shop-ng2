import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  message: string;
  modalActive = false;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
    this.authService.isUsed.subscribe(
      (data) => {
        this.message = data;
        if (this.message === 'Signed up correctly') {
          this.modalActive = true;
        }
      }
    );
  }

  redirectToPanel() {
    this.router.navigate(['signin']);
  }
}
