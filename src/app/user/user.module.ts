import {NgModule} from '@angular/core';
import {UserComponent} from './user.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app.routing.module';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class UserModule {
}
