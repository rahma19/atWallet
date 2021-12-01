import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  url = "http://196.203.219.35:15238/api/Transaction";
  urlCompte = environment.urlCompte;
  urlPay = environment.urlPay;
  transactionSubject: BehaviorSubject<any[]>;
  soldeSubject: BehaviorSubject<any[]> = new BehaviorSubject<any>(null);
  achat: any;
  trans: any;

  constructor(private http: HttpClient) {
    //initialiser subject
    this.transactionSubject = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('transactions')));
    this.soldeSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')).solde);
  }

  //get all transactions as observable
  public get allTransactions$(): Observable<any> {
    return this.transactionSubject.asObservable();
  }

  //get balance as observable
  public get solde$(): Observable<any> {
    return this.soldeSubject.asObservable();
  }
  //get all transactions 
  getAllTransaction(idCompte): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.url}/GetTransactionByCompte?id_Compte=${idCompte}`)//&date_debut=${datedeb}&date_fin=${datefin}
        .pipe(take(1))
        .subscribe(res => {
          this.updateStorage(res)
          resolve(res);
        }, (err) => {
          reject(err);
        });
    })
  }

  //get balance
  getSolde(idCompte): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.urlCompte}/GetSoldeByIdCompte?Id_Compte=${idCompte}`).pipe(take(1))
        .subscribe(res => {
          console.log(res.solde);

          this.soldeSubject.next(res.solde);
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }

  //save the new transactions data
  private updateStorage(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    this.transactionSubject.next(JSON.parse(localStorage.getItem('transactions')));
  }

  //paiement recharge
  async payment(form): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.urlPay + '/api/Paiement/PaiementRechargeTelephonique', form).pipe(take(1)).subscribe(async (res) => {
        await this.getSolde(form.idCompte);
        this.getAllTransaction(form.idCompte);
        let us = JSON.parse(localStorage.getItem('user'));
        us.solde = this.soldeSubject.value;
        localStorage.setItem("user", JSON.stringify(us));
        resolve(res);
        this.trans = res;
      }, (err) => {
        reject(err);
      });
    });
  }

  //paiement QR code
  async paymentQr(form): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.urlPay + '/api/Paiement/PaiementQRCode', form).pipe(take(1)).subscribe(async (res) => {
        await this.getSolde(form.idCompte);
        this.getAllTransaction(form.idCompte);
        let us = JSON.parse(localStorage.getItem('user'));
        us.solde = this.soldeSubject.value;
        localStorage.setItem("user", JSON.stringify(us));
        resolve(res);
        this.trans = res;
      }, (err) => {
        reject(err);
      });
    });
  }


}
