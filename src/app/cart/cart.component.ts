import { Component, DestroyRef, EventEmitter, inject } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CartService } from '../shared/services/cart.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map, of, startWith, switchMap } from 'rxjs';
import { CartLine } from '../shared/models/cart-line.model';
import { OrderService } from '../shared/services/order.service';
import { OrderLine } from '../shared/models/order-line.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatTableModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    CommonModule,
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
  #orderService = inject(OrderService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  cartLines: CartLine[] = [];
  errors: string[] = [];

  refreshList = new EventEmitter();

  cartLines$ = this.refreshList.pipe(
    startWith(null),
    switchMap(() => this.#cartService.getCart()),
    map((values) => values.sort((a, b) => a.productId - b.productId)),
    map((cl) => (this.cartLines = cl))
  );

  decrementQuantity(productId: number) {
    const productIndex = this.cartLines.findIndex(
      (v) => v.productId === productId
    );
    if (productIndex !== -1) {
      const product = this.cartLines[productIndex];
      const newQuantity = product.qty - 1;
      if (newQuantity === 0) {
        this.removeFromCart(productId);
        return;
      }
      this.#cartService
        .changeQty(productId, newQuantity)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => {
          product.qty = newQuantity;
          this.cartLines[productIndex] = product;
          this.refreshList.emit();
        });
    }
  }

  incrementQuantity(productId: number) {
    const productIndex = this.cartLines.findIndex(
      (v) => v.productId === productId
    );
    if (productIndex !== -1) {
      const product = this.cartLines[productIndex];
      const newQuantity = product.qty + 1;
      this.#cartService
        .changeQty(productId, newQuantity)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe(() => {
          product.qty = newQuantity;
          this.cartLines[productIndex] = product;
          this.refreshList.emit();
        });
    }
  }

  removeFromCart(productId: number) {
    this.#cartService
      .removeFromCart(productId)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.refreshList.emit());
  }

  placeOrder() {
    const orderLines: OrderLine[] = this.cartLines.map((cl) => ({
      productId: cl.productId,
      qty: cl.qty,
    }));
    this.errors = [];
    this.#orderService
      .placeOrder(orderLines)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((result) => {
        if (result.isOrderValid) {
          this.#router.navigate(['/']);
        } else {
          this.errors = result.errors;
        }
      });
  }
}
