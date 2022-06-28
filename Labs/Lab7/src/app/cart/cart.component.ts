import { Component, OnInit } from '@angular/core';
import { GenericService } from '../generic.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products : Product[] = [];

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    this.genericService.cart_items.subscribe(products=>{
      this.products = products;
    })
  }

  delete_from_cart(prod : Product){
    if(confirm("Are you sure you want to remove from cart?")){
      let i : number = 0;
      this.products.forEach((p, index) =>{
      if (p.id == prod.id){
        i = index;
        return
      }
    })

    this.products.splice(i, 1);
    this.genericService.set_cart_data(this.products);
    }
  }

}
