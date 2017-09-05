import {NgModule} from '@angular/core';
import {CartComponent} from './cart.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app.routing.module';
import {CoreModule} from '../core/core.module';
@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CoreModule
  ]
})
export class CartModule {
}
