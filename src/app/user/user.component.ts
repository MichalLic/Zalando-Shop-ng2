import {Component, OnInit} from '@angular/core';
import {CapitalCasePipe} from '../shared/capital-case.pipe';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  pipes: [CapitalCasePipe]
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
  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(f) {
    this.isOrdered = true;
    console.log(f.valid);
    console.log(f.value);
    console.log('kupione!!!!!');
    setTimeout(() => {
      f.reset();
    }, 2500);
  }

}
