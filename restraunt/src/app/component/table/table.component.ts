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
    order: new FormControl(''),
    selectedTable: new FormControl('')
  });

  tables: number[] = [1, 2, 3, 4, 5];
  orders: any[][] = [[], [], [], [], []];
  itemCounts: any[][] = [[], [], [], [], []]; // Array to store item counts for each table
  menu: MenuItem[] = [
    { name: 'pizza', price: 100 },
    { name: 'pasta', price: 150 },
    { name: 'pizza', price: 100 }, { name: 'pasta', price: 150 }, { name: 'white sauce pasta', price: 170 }, { name: 'sandwitch', price: 80 }, { name: 'burger', price: 120 }, { name: 'brownie', price: 215 }, { name: 'cutlet', price: 150 }, { name: 'momoes', price: 120 }, { name: 'vada pav', price: 15 }, { name: 'pav bhaji', price: 30 }, { name: 'coldrink', price: 25 }, { name: 'lasagna', price: 350 }, { name: 'pancakes', price: 200 }, { name: 'english breakfast', price: 440 }, { name: 'burrito', price: 150 }, { name: 'hot dog', price: 150 }, { name: 'fries', price: 100 }, { name: 'cheesy fries', price: 200 }, { name: 'noodles', price: 70 }, { name: 'taco', price: 180 },
  ];

  onSubmit() {
    const orderValue = this.form.get('order')!.value;
    const tableIndex = this.form.get('selectedTable')!.value;
    if (orderValue && orderValue.trim() !== '' && tableIndex !== null) {
      this.orders[Number(tableIndex)-1].push(orderValue);
      this.updateItemCount(Number(tableIndex)-1, orderValue); // Update item count
      this.form.reset();
    }
  }

  updateItemCount(tableIndex: number, orderValue: string): void {
    const index = this.itemCounts[tableIndex].findIndex(item => item.name === orderValue);
    if (index !== -1) {
      this.itemCounts[tableIndex][index].count++;
    } else {
      this.itemCounts[tableIndex].push({ name: orderValue, count: 1 });
    }
  }

  resetOrders(tableIndex: number): void {
    this.orders[tableIndex] = [];
    this.itemCounts[tableIndex] = [];
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
