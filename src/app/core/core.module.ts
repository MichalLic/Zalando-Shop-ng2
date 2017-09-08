import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {OwlModule} from 'ng2-owl-carousel';
import {AppRoutingModule} from '../app.routing.module';
import {ProductsService} from '../products.service';
import {AuthService} from '../auth/auth.service';
import {AuthGuardService} from '../auth/auth-guard.service';
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
    ProductsService,
    AuthService,
    AuthGuardService
  ]
})

export class CoreModule {
}
