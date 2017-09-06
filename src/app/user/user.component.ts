import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(f) {
    console.log(f.valid);
    console.log(f.value);
    console.log('kupione!!!!!');
    setTimeout(() => {
      f.reset();
    }, 2500);
  }

}
