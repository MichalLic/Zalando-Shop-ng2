import {NgModule} from '@angular/core';
import {CartComponent} from './cart.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app.routing.module';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule
  ]
})
export class CartModule {

}
