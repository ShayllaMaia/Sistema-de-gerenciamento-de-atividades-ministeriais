import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('papel');
    if (role === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/index']);
      return false;
    }
  }
}
