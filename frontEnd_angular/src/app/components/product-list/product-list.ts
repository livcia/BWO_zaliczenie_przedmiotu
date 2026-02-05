import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { confetti } from '@tsparticles/confetti';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private cdr = inject(ChangeDetectorRef);
  naglowki = ['ID', 'Nazwa', 'Producent', 'Kategoria', 'Cena'];
  products: any[] = [];
  selectedId = '';
  name = '';
  producent = '';
  category = 'Karty Graficzne';
  price = 0;
  inflacjaValue = 0;

  pobierzProdukty = async () => {
    try {
      const response = await axios.get('http://localhost:3005/products/');
      this.products = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.log("error", error);
    }
  };

  pobierzProdukt = async () => {
    if (!this.selectedId) {
      this.name = '';
      this.producent = '';
      this.category = 'Karty Graficzne';
      this.price = 0;
      this.cdr.detectChanges();
      return;
    }
    try {
      const response = await axios.get('http://localhost:3005/products/' + this.selectedId);
      this.name = response.data.name;
      this.producent = response.data.producent;
      this.category = response.data.category;
      this.price = response.data.price;
      this.cdr.detectChanges();
    } catch (error) {
      console.log("error", error);
    }
  };

  ngOnInit(): void {
    this.pobierzProdukty();
  }

  async dodaj() {
    if (this.selectedId) {
      alert('Odznacz produkt, aby dodać nowy');
      return;
    }
    if (!this.name || this.name.trim() === '') {
      alert('Podaj nazwę produktu');
      return;
    }
    if (!this.producent || this.producent.trim() === '') {
      alert('Podaj producenta');
      return;
    }
    if (!this.price || this.price <= 0) {
      alert('Podaj poprawną cenę');
      return;
    }
    try {
      await axios.post('http://localhost:3005/products/', {
        name: this.name,
        producent: this.producent,
        category: this.category,
        price: this.price
      });
      this.name = '';
      this.producent = '';
      this.category = 'Karty Graficzne';
      this.price = 0;
      this.pobierzProdukty();
    } catch (error) {
      console.log("error", error);
    }
  }

  async aktualizuj() {
    if (!this.selectedId) {
      alert('Wybierz produkt do edycji');
      return;
    }
    if (!this.name || this.name.trim() === '') {
      alert('Podaj nazwę produktu');
      return;
    }
    if (!this.producent || this.producent.trim() === '') {
      alert('Podaj producenta');
      return;
    }
    if (!this.price || this.price <= 0) {
      alert('Podaj poprawną cenę');
      return;
    }
    try {
      await axios.put('http://localhost:3005/products/' + this.selectedId, {
        name: this.name,
        producent: this.producent,
        category: this.category,
        price: this.price
      });
      this.pobierzProdukty();
    } catch (error) {
      console.log("error", error);
    }
  }

  async usun() {
    if (!this.selectedId) {
      alert('Wybierz produkt do usunięcia');
      return;
    }
    try {
      await axios.delete('http://localhost:3005/products/' + this.selectedId);
      this.selectedId = '';
      this.name = '';
      this.producent = '';
      this.category = 'Karty Graficzne';
      this.price = 0;
      this.pobierzProdukty();
    } catch (error) {
      console.log("error", error);
    }
  }

  async promocja(znizka: number) {
    try {
      await axios.put('http://localhost:3005/products/zmianaCeny/' + znizka);
      
      const duration = 1000;
      const end = Date.now() + duration;
      
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#0d6efd', '#198754', '#ffc107']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#0d6efd', '#198754', '#ffc107']
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
      
      this.pobierzProdukty();
    } catch (error) {
      console.log("error", error);
    }
  }

  async inflacja() {
  if (!this.inflacjaValue || this.inflacjaValue <= 1 || this.inflacjaValue > 100) {
    alert('Podaj wartość podwyżki większą od 1 i mniejszą lub równą 100');
    return;
  }
  try {
    await axios.put('http://localhost:3005/products/zmianaCeny/' + this.inflacjaValue);
    
    const duration = 1500;
    const end = Date.now() + duration;
    
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 270,
        spread: 80,
        origin: { x: Math.random(), y: 0 },
        gravity: 1.5,
        scalar: 2,
        shapes: ['emoji'],
        shapeOptions: {
          emoji: {
            value: ['💸', '😭']
          }
        }
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    
    this.inflacjaValue = 0;
    this.pobierzProdukty();
  } catch (error) {
    console.log("error", error);
  }
}
}