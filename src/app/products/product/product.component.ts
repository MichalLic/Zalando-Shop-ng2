import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductsService} from '../../products.service';
import {Subscription} from 'rxjs/Subscription';
import {OwlCarousel} from 'ng2-owl-carousel';
import {ProductDetail} from '../../shared/productDetail.model';
import {AuthService} from '../../auth/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [
    trigger('alertMessage', [
      state('inactive', style({
        right: '-100%',
        opacity: '0'
      })),
      state('active', style({
        right: '0',
        opacity: '1'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
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
  state: string = 'inactive';
  private subscription: Subscription;
  private productSubscription: Subscription;
  private orderedProductSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private authService: AuthService) {
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
    if (this.authService.isAuthenticated()) {
      this.orderedProductSubscription = this.productsService.getOrderedProducts()
        .subscribe(
          (data) => this.products = data || []
        );
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.createProduct();
    this.addProduct();
    this.storageProducts();
  }

  createProduct() {
    this.orderedProduct = {
      name: this.item.name,
      size: this.product.size || this.item.units[0]['size'],
      price: this.item.units[0]['price'].value,
      quantity: this.product.quantity,
      url: this.item.media.images[0]['thumbnailHdUrl'],
      id: +this.productId.id,
    };
  }

  addProduct() {
    if (this.products.length === 0) {
      this.products.push(this.orderedProduct);
      this.setProductsAmount(this.products);
    } else {
      console.log(this.orderedProduct);
      this.products.map(item => {
          if (item.name === this.orderedProduct.name && item.size === this.orderedProduct.size) {
            this.addNewProduct = false;
            return item.quantity = item.quantity + this.orderedProduct.quantity;
          }
        }
      );
      if (this.addNewProduct) {
        this.products.push(this.orderedProduct);
        this.setProductsAmount(this.products);
      }
    }
    this.state = 'active';
    setTimeout(
      () => {
        this.state = 'inactive';
      }, 2000
    );

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
    if (this.authService.isAuthenticated()) {
      this.orderedProductSubscription.unsubscribe();
    }
  }

  setProductsAmount(data) {
    this.productsService.getProductsAmount(data);
  }


}
