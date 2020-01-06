import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartItemCount = 0;
  showMobileMenu = false;
  constructor(private service: ServiceService) {
    this.service.updateCart().subscribe(item => {
      if (item) {
        this.cartItemCount = item.item.length;
      }
    });
  }
  showCart = false;
  ngOnInit() {
  }

  toggleCart() {
    this.showCart = !this.showCart;
    if (this.showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''
    }
  }
  closeCart() {
    this.showCart = false;
    document.body.style.overflow = ''
  }
  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

}
