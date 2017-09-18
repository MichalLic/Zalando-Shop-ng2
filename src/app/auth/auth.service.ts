import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {
  token: string;
  isLogged = new Subject();

  constructor() {
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.isLogged.next(true);
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => this.token = token
            );

        }
      )
      .catch(
        error => {
          this.isLogged.next(false);
          console.log(error);
        }
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

}
