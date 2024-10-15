import { Component, DestroyRef, EventEmitter, inject } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CartService } from '../shared/services/cart.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatTableModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  displayedColumns: string[] = [
    'product-id',
    'image',
    'name',
    'price',
    'qty',
    'actions',
  ];
  #cartService = inject(CartService);
  #destroyRef = inject(DestroyRef);

  refreshList = new EventEmitter();

  cartLines$ = this.refreshList.pipe(
    startWith(null),
    switchMap(() => this.#cartService.getCart()),
    map((values) => values.sort((a, b) => a.productId - b.productId))
  );

  decrementQuantity(productId: number, actualQuantity: number) {
    this.#cartService
      .changeQty(productId, --actualQuantity)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.refreshList.emit());
  }

  incrementQuantity(productId: number, actualQuantity: number) {
    this.#cartService
      .changeQty(productId, ++actualQuantity)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.refreshList.emit());
  }

  removeFromCart(productId: number) {
    this.#cartService
      .removeFromCart(productId)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.refreshList.emit());
  }
}
