import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {OwlModule} from 'ng2-owl-carousel';
import {AppRoutingModule} from '../app.routing.module';
import {ProductsService} from '../products.service';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    OwlModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    OwlModule
  ],
  providers: [
    ProductsService
  ]
})

export class CoreModule {
}
