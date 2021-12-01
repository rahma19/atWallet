import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanLoad {
  constructor(public authService: AuthService, private router: Router) { }

  //if current user is not null return true, else redirection to login interface
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = localStorage.getItem('TOKEN_KEY');
    if (currentUser) { return true; }
    else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    }
  }

}


