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
  orderedProduct: ProductDetail;
  item;
  product = {
    size: '',
    quantity: 1,
  };
  productId;
  products = [];
  private subscription: Subscription;
  private productSubscription: Subscription;
  private orderedProductSubscription: Subscription;

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

    /**
     * if 'cart' isnt has any products it still remains empty array
     */
    this.orderedProductSubscription = this.productsService.getOrderedProducts()
      .subscribe(
        (data) => this.products = data || []
      );
  }

  onSubmit(form, event) {
    event.preventDefault();
    this.createProduct();
    this.addProduct();
    this.storageProducts();
  }

  createProduct() {
    this.orderedProduct = {
      name: this.item.name,
      size: this.item.units[0].size || this.product.size,
      price: this.item.units[0].price.value,
      quantity: this.product.quantity,
      url: this.item.media.images[0].thumbnailHdUrl
    };
  }

  addProduct() {
    // if (this.products) {
    //   this.products.map(
    //     (data) => console.log(data)
    //   );
    // }
    console.log(this.products);
    this.products.push(this.orderedProduct);
    console.log(this.products);
  }

  storageProducts() {
    this.productsService.putProducts(this.products)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.productSubscription.unsubscribe();
    this.orderedProductSubscription.unsubscribe();
  }


}
