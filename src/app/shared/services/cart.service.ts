import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartLine } from '../models/cart-line.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  #http = inject(HttpClient);

  public getCart = (): Observable<CartLine[]> =>
    this.#http.get<Array<CartLine>>('/api/cart');

  public addToCart = (productId: number): Observable<void> =>
    this.#http.put<void>(
      '/api/cart',
      {},
      {
        params: { productId },
      }
    );

  public removeFromCart = (productId: number): Observable<void> =>
    this.#http.delete<void>('/api/cart', {
      params: { productId },
    });

  public changeQty = (
    productId: number,
    newQty: number
  ): Observable<CartLine[]> =>
    this.#http.patch<Array<CartLine>>(
      '/api/cart',
      {},
      {
        params: { productId, newQty },
      }
    );
}
