import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private service: ServiceService, private route: ActivatedRoute) { }
  originalProducts: any;
  products: any;
  category: any;
  ngOnInit() {
    this.service.getProducts().subscribe(data => {
      this.originalProducts = JSON.parse(JSON.stringify(data));
      this.originalProducts.forEach(element => {
        element.imageURL = '../../assets' + element.imageURL;
      });
      this.products = data;
      this.products.forEach(element => {
        element.imageURL = '../../assets' + element.imageURL;
      });
      this.route.params.subscribe(params => {
        if (params['id'] === '') {
          this.products = JSON.parse(JSON.stringify(this.originalProducts));
        } else {
          this.filterProducts(params['id']);
        }
      });
    })
    this.service.getCategories().subscribe(data => {
      this.category = data;
    })
  }

  filterProducts(id) {
    this.products = [];
    this.originalProducts.forEach(elem => {
      if (id === elem.category) {
        this.products.push(elem);
      }
    })
  }

}
