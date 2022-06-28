import { Product } from "./product";

export interface ProductResponse {
    products : Product[];
    pages : number;
    currentPage : number;
  }