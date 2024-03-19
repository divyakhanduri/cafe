import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface MenuItem {
  name: string;
  price: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  form = new FormGroup({
    order: new FormControl('')
  });

  tables: number[] = [1, 2, 3, 4, 5];
  orders: any[][] = [[], [], [], [], []];
  menu: MenuItem[] = [
    { name: 'pizza', price: 100 },
    { name: 'pasta', price: 150 },
    { name: 'white sauce pasta', price: 170 },
    { name: 'sandwitch', price: 80 },
    { name: 'burger', price: 120 },
    { name: 'brownie', price: 215 },
    { name: 'cutlet', price: 150 },
    { name: 'momoes', price: 120 },
    { name: 'vada pav', price: 15 },
    { name: 'pav bhaji', price: 30 },
    { name: 'coldrink', price: 25 },
    { name: 'lasagna', price: 350 },
    { name: 'pancakes', price: 200 },
    { name: 'english breakfast', price: 440 },
    { name: 'burrito', price: 150 },
    { name: 'hot dog', price: 150 },
    { name: 'fries', price: 100 },
    { name: 'cheesy fries', price: 200 },
    { name: 'noodles', price: 70 },
    { name: 'taco', price: 180 },
    


  ];

  onSubmit(tableIndex: number) {
    const orderValue = this.form.get('order')!.value;
    if (orderValue && orderValue.trim() !== '') {
      this.orders[tableIndex].push(orderValue);
      this.form.reset();
    }
  }

  calculateBill(tableIndex: number): number {
    let total = 0;
    for (const order of this.orders[tableIndex]) {
      const menuItem = this.menu.find(item => item.name === order);
      if (menuItem) {
        total += menuItem.price;
      }
    }
    return total;
  }

  calculateTotalBill(): number {
    let total = 0;
    for (let i = 0; i < this.tables.length; i++) {
      total += this.calculateBill(i);
    }
    return total;
  }
}
