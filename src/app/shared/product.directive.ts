import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appProductDirective]'
})
export class ProductDirective {
  @HostBinding('style.transform') scaledProduct: string = '1';

  constructor() {
  }

  @HostListener('mouseenter') mouseover() {
    this.scaledProduct = 'scale(1.1)';
  }

  @HostListener('mouseleave') mouseleave() {
    this.scaledProduct = 'scale(1)';
  }
}
