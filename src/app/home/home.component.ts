import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ServiceService) { }
  banner: any;
  categories: any;
  ngOnInit() {
    console.log('inside home ngOnInit');
    this.service.getCategories().subscribe(data => {
      this.categories = data;
      this.categories.forEach(element => {
        element.imageUrl = '../../assets' + element.imageUrl;
      });
      console.log(this.categories);
    });
  }

}
