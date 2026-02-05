import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { ProductList } from './components/product-list/product-list';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    ProductList,
    Footer
  ],
  templateUrl: './app.html',
})
export class App {
}
