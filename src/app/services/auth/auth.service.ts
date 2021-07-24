import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');

    localStorage.removeItem('token');
    localStorage.removeItem('cart');
  }
  spLogout(): void {
    localStorage.setItem('isLoggedInSP', 'false');
    localStorage.removeItem('tokenSP');
  }
}
