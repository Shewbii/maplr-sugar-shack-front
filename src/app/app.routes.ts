import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { MapleSyrupComponent } from './maple-syrup/maple-syrup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: ':id', component: MapleSyrupComponent },
];
