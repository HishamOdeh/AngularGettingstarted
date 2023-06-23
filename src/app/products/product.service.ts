import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
  providedIn:  'root'
})
export class ProductService {
  private producturl = 'api/products/products.json'
  constructor(private http: HttpClient) { }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.producturl).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );   
  }
   //-----getproductById----

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct[]>(this.producturl).pipe(
      map(products => {
        const product = products.find(product => product.productId === id);
        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }
        return product;
      }),
      tap(data => console.log('Product', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse){

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred:${err.error.message}`;
     } else {
        errorMessage = `Server rerurned code:${err.status}`, `error message is: ${err.message }`;
     }
    console.error(errorMessage);
    return throwError(() => errorMessage);
}
}
