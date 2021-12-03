import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(public authService: AuthService, private router: Router) { }

  //if current user is not null redirect to tabs, else return true
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = localStorage.getItem('user');

    if (currentUser != null) {
      setTimeout(() => {
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      }, 500);
      return false;
    }
    else {
      return true;
    }
  }

}
