import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductsService} from '../../products.service';
import {Subscription} from 'rxjs/Subscription';
import {OwlCarousel} from 'ng2-owl-carousel';
import {ProductDetail} from '../../shared/productDetail.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  productDetail: ProductDetail;
  item;
  product = {
    size: '',
    quantity: 1,
  };
  productId;
  private subscription: Subscription;
  private productSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          console.log(params);
          this.productId = params;
        }
      );
    this.productSubscription = this.productsService.getProducts()
      .subscribe(
        (data) => {
          console.log(data.content[this.productId.id]);
          this.item = data.content[this.productId.id];
          this.owlElement.refresh();
        }
      );
  }

  onSubmit(form) {
    this.createProduct();
    this.storageProducts();
    console.log(this.productDetail);
  }

  createProduct() {
    return this.productDetail = {
      name: this.item.name,
      size: this.item.units[0].size || this.product.size,
      price: this.item.units[0].price.value,
      quantity: this.product.quantity,
      url: this.item.media.images[0].thumbnailHdUrl
    };
  }

  storageProducts() {
    this.productsService.addProduct(this.productDetail);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }


}
