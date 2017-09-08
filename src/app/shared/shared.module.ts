import {NgModule} from '@angular/core';
import {ProductDirective} from './product.directive';
import {CapitalCasePipe} from './capital-case.pipe';

@NgModule({
  declarations: [
    ProductDirective,
    CapitalCasePipe
  ],
  exports: [
    ProductDirective,
    CapitalCasePipe
  ]
})
export class SharedModule {
}
