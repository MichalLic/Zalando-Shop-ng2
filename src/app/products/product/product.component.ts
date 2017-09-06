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
  addNewProduct = true;
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
      size: this.product.size || this.item.units[0].size,
      price: this.item.units[0].price.value,
      quantity: this.product.quantity,
      url: this.item.media.images[0].thumbnailHdUrl,
      id: +this.productId.id,
    };
  }

  addProduct() {
    if (this.products.length === 0) {
      console.log('był pusty!!!');
      this.products.push(this.orderedProduct);
    } else {
      console.log(this.orderedProduct);
      console.log(this.addNewProduct);
      this.products.map(item => {
          if (item.name === this.orderedProduct.name && item.size === this.orderedProduct.size) {
            this.addNewProduct = false;
            return item.quantity = item.quantity + this.orderedProduct.quantity;
          }
        }
      );
      if (this.addNewProduct) {
        this.products.push(this.orderedProduct);
      }
    }
    console.log(this.products);
  }

  /**
   * put product as json to firebase database
   */
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
