import { Component, DestroyRef, inject, Input } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ProductService } from '../shared/services/product.service';
import { Observable } from 'rxjs';
import { MapleSyrup } from '../shared/models/maple-syrup.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../shared/services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-maple-syrup',
  standalone: true,
  imports: [
    ToolbarComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './maple-syrup.component.html',
  styleUrl: './maple-syrup.component.scss',
})
export class MapleSyrupComponent {
  #productService = inject(ProductService);
  #cartService = inject(CartService);
  #destroyRef = inject(DestroyRef);

  product$!: Observable<MapleSyrup>;

  @Input()
  set id(productId: number) {
    this.product$ = this.#productService.getProductInfo(productId);
  }

  addToCart(productId: number) {
    this.#cartService
      .addToCart(productId)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }
}
