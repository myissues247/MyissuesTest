import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adpost',
  templateUrl: './adpost.component.html',
  styleUrls: ['./adpost.component.scss']
})
export class AdpostComponent implements OnInit {

  products: any[];

    sortOptions: any[];

    sortOrder: number;

    sortField: string;


  constructor() { }

  ngOnInit(): void {

   // this.productService.getProducts().then(data => this.products = data);

    this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];

    this.products= [
        {
          "id": "1000",
          "code": "f230fh0g3",
          "name": "Homeless",
          "description": "ygubhjvhjv jh",
          "image": "bamboo-watch.jpg",
          "price": 65,
          "category": "Countries Address",
          "quantity": 24,
          "inventoryStatus": "INSTOCK",
          "rating": 5
        },
        {
          "id": "1000",
          "code": "f230fh0g3",
          "name": "Homeless",
          "description": "ygubhjvhjv jh",
          "image": "bamboo-watch.jpg",
          "price": 65,
          "category": "Countries Address",
          "quantity": 24,
          "inventoryStatus": "INSTOCK",
          "rating": 5
        }
      ]
    
    
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

}
