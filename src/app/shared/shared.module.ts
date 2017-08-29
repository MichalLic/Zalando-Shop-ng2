import {NgModule} from '@angular/core';
import {ProductDirective} from './product.directive';

@NgModule({
  declarations: [
    ProductDirective,
  ],
  exports: [
    ProductDirective,
  ]
})
export class SharedModule {
}
