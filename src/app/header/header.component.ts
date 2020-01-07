import { Component, OnInit, HostListener } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize(event.target.innerWidth);
  }
  cartItemCount = 0;
  showMobileMenu = false;
  isSmallScreen = false;
  isMediumLargeScreen = false;
  constructor(private service: ServiceService) {
    this.service.updateCart().subscribe(item => {
      if (item) {
        this.cartItemCount = item.item.length;
      }
    });
  }
  showCart = false;
  ngOnInit() {
    this.checkScreenSize(window.innerWidth);
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
    if (this.showCart) {
      if (this.showMobileMenu) {
        document.querySelector('.modal-custom')['style'].top = '155px';
        document.querySelector('.shopping-cart')['style'].height = '78.5vh';
      } else {
        document.querySelector('.modal-custom')['style'].top = '54px';
        document.querySelector('.shopping-cart')['style'].height = '90vh';
      }
    }
  }

  checkScreenSize(innerWidth) {
    if (innerWidth < 768) {
      this.setScreenSize(true, false);
    } else {
      this.setScreenSize(false, true);
    }
  }
  setScreenSize(small, mediumlarge) {
    this.isSmallScreen = small;
    this.isMediumLargeScreen = mediumlarge;
  }
}
