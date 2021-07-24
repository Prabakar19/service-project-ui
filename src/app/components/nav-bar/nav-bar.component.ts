import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() userType: string;

  cartList: Service[];
  badge: number;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getBadge();
  }

  getBadge() {
    this.cartList = JSON.parse(localStorage.getItem('cart'));
    if (this.cartList) this.badge = this.cartList.length;
  }

  logout() {
    this.authService.logout();
    this.authService.spLogout();
    this.router.navigateByUrl('/home');
  }
}
