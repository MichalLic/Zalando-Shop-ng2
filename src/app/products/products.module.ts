import {NgModule} from '@angular/core';
import {ProductComponent} from './product/product.component';
import {ProductsComponent} from './products.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app.routing.module';

@NgModule ({
  declarations: [
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class ProductModule {}
