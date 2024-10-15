import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MapleSyrup } from '../models/maple-syrup.model';
import { CatalogueItem } from '../models/catalogue-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  #http = inject(HttpClient);

  public getCatalogue = (): Observable<CatalogueItem[]> =>
    this.#http.get<CatalogueItem[]>('/api/products');

  public getProductInfo = (productId: number): Observable<MapleSyrup> =>
    this.#http.get<MapleSyrup>('/api/products/' + productId);
}
