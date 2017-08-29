import {NgModule} from '@angular/core';
import {ProductComponent} from './product/product.component';
import {ProductsComponent} from './products.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app.routing.module';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';
import {ProductsService} from '../products.service';

@NgModule ({
  declarations: [
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CoreModule,
    FormsModule
  ],
  providers: [ProductsService]
})
export class ProductModule {}
