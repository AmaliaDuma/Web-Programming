import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { GenericService } from '../generic.service'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];
  page = 1;
  total_pages = 0;
  has_next = false;
  has_prev = false;
  category = "";

  constructor(private genericService: GenericService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("ngOnInit called for ProductComponent");

    this.category = this.route.snapshot.paramMap.get('category')!;
    if (this.category == 'laptops') this.category = 'Laptop';
    else this.category = 'Phone';

    console.log(this.category);
  	this.get_products();
  }

  get_products() : void{
    //this.genericService.fetch_products(this.category, this.page).subscribe(products => this.products = products);
    this.genericService.fetch_products(this.category, this.page).subscribe(response => {
      console.log(response);
      this.total_pages = response.pages;
      this.products = response.products;

      if (this.total_pages > 1) this.has_next = true;
    });

    // this.genericService.get_nr_rows(this.category).subscribe(rows => {
    //   if (rows % 4 == 0){
    //     this.total_pages = rows / 4;
    //   }
    //   else{
    //     this.total_pages = ~~(rows/4) +1;
    //   }
    //   //console.log(this.total_pages);
    //   if (this.total_pages > 1){
    //     console.log("here")
    //     this.has_next = true;
    //   }
    // })
  }

  onSelect(prod : Product) : void{
    console.log(prod.id + " -> id is selected");
  }

  add_to_cart(prod: Product) : void{
    const response = this.genericService.add_to_cart(prod);
    if (response == "false"){
      alert("Product already added.");
      return;
    }
    alert("Product added successfully.");
  }

  prev_selected() : void{
    this.page = this.page - 1;
    this.genericService.fetch_products(this.category, this.page).subscribe(response =>{
      // if (Array.isArray(response)){
      //   this.products = response;
      // }
      // else{
      //   this.page = this.page + 1;
      //   alert("No previous pages.");
      // }
      this.products = response.products;
    });

    this.check_page_set_buttons();
  }

  next_selected() : void{
    this.page = this.page + 1;
    this.genericService.fetch_products(this.category, this.page).subscribe(response =>{
      // if (Array.isArray(response)){
      //   this.products = response;
      // }
      // else{
      //   this.page = this.page - 1;
      //   alert("No next pages.");
      // }
      this.products = response.products;
    });

    this.check_page_set_buttons();
  }

  check_page_set_buttons() : void{
    if (this.page == 1){
      this.has_prev = false;
      this.has_next = true;
    }
    else if (this.page == this.total_pages){
      this.has_next = false;
      this.has_prev = true;
    }
    else if (this.page > 1 && this.page < this.total_pages){
      this.has_next = true;
      this.has_prev = true;
    }
  }
}
