import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get('http://localhost:5000/categories');
  }

  getProducts() {
    return this.http.get('http://localhost:5000/products')
  }
}
