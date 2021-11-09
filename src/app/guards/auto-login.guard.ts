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
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = localStorage.getItem('TOKEN_KEY');
    if (currentUser) {

      this.router.navigateByUrl('/tabs', { replaceUrl: true });

      return false;
    }
    else {

      return true;
    }
  }



}
