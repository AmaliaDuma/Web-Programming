import { Component, OnInit } from '@angular/core';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  home_style = 'btn-default';
  products_style = 'btn-default';
  cart_style = 'btn-default';
  welcome_text = 'textS';

  constructor(private genericService: GenericService) { }

  ngOnInit(): void {
    var page = this.genericService.get_last_page();
    if (page == "home"){
      this.home_clicked();
    }
    else if (page == "prods"){
      this.prods_clicked();
    }
    else {
      this.cart_clicked();
    }
  }

  home_clicked() : void{
    this.cart_style = 'btn-default';
    this.products_style = 'btn-default';
    this.home_style = 'btn-clicked';
    this.welcome_text = 'textS';
    this.genericService.set_last_page("home");
  }

  prods_clicked() : void{
    this.cart_style = 'btn-default';
    this.products_style = 'btn-clicked';
    this.home_style = 'btn-default';
    this.welcome_text = 'textH';
    this.genericService.set_last_page("prods");
  }

  cart_clicked() : void{
    this.cart_style = 'btn-clicked';
    this.products_style = 'btn-default';
    this.home_style = 'btn-default';
    this.welcome_text = 'textH';
    this.genericService.set_last_page("cart");
  }

  logOut(){
    localStorage.removeItem("jwt");
  }

}
