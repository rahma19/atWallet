import { environment } from './../../../environments/environment';

import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import jwt_decode from "jwt-decode";

import { map, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { now } from '@ionic/core/dist/types/utils/helpers';
import { AuthUtils } from 'src/app/pages/auth/login/auth.utils';
const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  urlProf = environment.urlProf;
  user = null;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router,
    private http: HttpClient,
    private plt: Platform,) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  //get current user value
  public get payload() {
    return this.currentUserSubject.value;
  }

  //get current user as observable
  public get currentUser$(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  //get user 
  async getUser(idClient): Promise<any> {
    return this.http.get<any>(this.urlProf + `/GetProfil?Id_Compte=${idClient}`).pipe(
      tap(async user => {
        //save user en local
        await localStorage.setItem('user', JSON.stringify(user));
        //save user into subject
        await this.currentUserSubject.next(JSON.parse(localStorage.getItem('user')));
      }),
      take(1)
    ).subscribe();
  }

  //check token expiration
  checkToken() {
    const isExpired = AuthUtils.isTokenExpired(localStorage.getItem('TOKEN_KEY'));
    isExpired && this.logout();
  }

  //submit login
  login(credentials) {
    return this.http.post<any>(this.url + `/api/login`, credentials).pipe(
      map(async payload => {
        //decode token
        const decoded = AuthUtils._decodeToken(payload.access_token);
        //get user
        await this.getUser(decoded?.client_id);
        //save token en local if user not null
        //if (this.currentUserSubject.value != null) {
        localStorage.setItem("TOKEN_KEY", payload.access_token);
        // }
        // else {
        //   console.log("erreur du serveur, veuillez reesayer plus tard");
        // }
        return payload;
      }, (err) => {
        console.log('err');
      }));
  }

  //logout
  logout() {
    localStorage.removeItem('TOKEN_KEY')
    localStorage.removeItem('transactions')
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

}

