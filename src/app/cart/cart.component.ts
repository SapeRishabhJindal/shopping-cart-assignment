import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItem = [];
  subscription: Subscription;
  totalPrice = 0;
  @Output() closeCart = new EventEmitter<boolean>();

  constructor(private service: ServiceService) {
    this.service.updateCart().subscribe(item => {
      if (item) {
        this.cartItem = item.item;
        this.totalPrice = 0;
        this.cartItem.forEach(elem => {
          this.totalPrice = this.totalPrice + (elem.quantity * elem.price);
        })
      }
    });

  }

  ngOnInit() { }
  closeCartClicked() {
    this.closeCart.emit(true);
  }

  addQuantity(i) {
    this.cartItem[i].quantity++;
    this.totalPrice = this.totalPrice + this.cartItem[i].price;
  }
  substractQuantity(i) {
    if (this.cartItem[i].quantity === 1) {
      this.cartItem.splice(i, 1);
      this.service.removeItemFromCart(this.cartItem);
    } else {
      this.cartItem[i].quantity--;
      this.totalPrice = this.totalPrice - this.cartItem[i].price;
    }
  }
}
