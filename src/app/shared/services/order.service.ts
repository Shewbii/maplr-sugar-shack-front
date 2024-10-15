import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderLine } from '../models/order-line.model';
import { Observable } from 'rxjs';
import { OrderValidationResponse } from '../models/order-validation-response.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  #http = inject(HttpClient);

  public placeOrder = (
    lines: OrderLine[]
  ): Observable<OrderValidationResponse> =>
    this.#http.post<OrderValidationResponse>('/api/order', lines);
}
