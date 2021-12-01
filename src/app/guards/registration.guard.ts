import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { REGISTER_KEY } from './intro.guard';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanLoad {

  constructor(private router: Router) {
  }

  async canLoad(): Promise<boolean> {
    const Registration = await localStorage.getItem(REGISTER_KEY);

    if (Registration && (Registration === 'true')) {
      this.router.navigateByUrl('signup', { replaceUrl: true });
      return false;
    }
    else {
      return true;
    }
  }
}