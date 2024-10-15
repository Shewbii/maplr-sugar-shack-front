import { Component, DestroyRef, inject } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ProductService } from '../shared/services/product.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../shared/services/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, MatTableModule, CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  displayedColumns: string[] = ['image', 'name', 'price', 'type', 'action'];
  #productService = inject(ProductService);
  #cartService = inject(CartService);
  #destroyRef = inject(DestroyRef);

  catalog$ = this.#productService.getCatalogue();

  addToCart(productId: number) {
    this.#cartService
      .addToCart(productId)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  }
}
