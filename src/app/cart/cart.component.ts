import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }
  @Output() closeCart = new EventEmitter<boolean>();
  ngOnInit() {
  }
  closeCartClicked() {
    this.closeCart.emit(true);
  }
}
