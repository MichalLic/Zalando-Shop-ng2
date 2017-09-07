import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCeoIW7762whj7646LwmPemEFQTMf6UJtw',
      authDomain: 'zalandoshop-ng2.firebaseapp.com',
    });
  }
}
