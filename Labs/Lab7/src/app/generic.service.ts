import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './product';
import { ProductResponse } from './productResponse';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  cart_items = new BehaviorSubject<Product[]>([]);
  place_holder : Product[] = [];

  private backendUrl = 'https://localhost:7265/api/Products/products';  // URL to web api 
  private loginUrl = "https://localhost:7265/api/login";
  httpOptions = {
   	  headers: new HttpHeaders({ 
   	  		'Content-Type': 'application/json'
   	  })
  }; 

  constructor(private http: HttpClient) {
    //website loads => retrieve any data from local storage
    const ls_string = localStorage.getItem('cart');
    const ls = ls_string !== null ? JSON.parse(ls_string) : null;

    if(ls) {
      this.cart_items.next(ls);
    }
   }

  fetch_products(cat : String, pg : number) : Observable<ProductResponse> {
    //return this.http.get<Product[]>(this.backendUrl+'?action=select&category='+cat+'&page='+pg).pipe(catchError(this.handleError<Product[]>('fetch_products', [])));
    return this.http.get<ProductResponse>(this.backendUrl+ '?category=' + cat + '&page=' + pg).pipe(catchError(this.handleError<ProductResponse>('fetch_products', null as any)));
  }

  get_nr_rows(cat : String) : Observable<number> {
    return this.http.get<number>(this.backendUrl+'?action=rows&category='+cat).pipe(catchError(this.handleError<number>('nr_rows', 0)));
  }

  add_to_cart(product : Product) : String{
    const ls_string = localStorage.getItem('cart');
    const ls = ls_string !== null ? JSON.parse(ls_string) : null;

    if (ls){
      let exist : Product;
      exist = ls.find((item : Product) => {
        return item.id == product.id;
      })

      if(exist){
        return "false";
      }
    }

    if (ls){
      const new_data = [...ls, product];
      this.set_cart_data(new_data);
      this.cart_items.next(JSON.parse(localStorage.getItem('cart')!));
    }
    else{
      this.place_holder.push(product);
      this.set_cart_data(this.place_holder);
      this.cart_items.next(this.place_holder);
    }
    return "true";
  }
  

  set_cart_data(data : any){
    localStorage.setItem('cart', JSON.stringify(data));
  }

  get_last_page() : String{
    const ls_string = localStorage.getItem('page');
    const ls = ls_string !== null ? JSON.parse(ls_string) : null;
    return ls;
  }

  set_last_page(data : any){
    localStorage.setItem('page', JSON.stringify(data));
  }

  login(credentials: any) : Observable<any>{
    return this.http.post<any>(this.loginUrl, credentials).pipe(catchError(this.handleError<any>('login', null)));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
} 
}
