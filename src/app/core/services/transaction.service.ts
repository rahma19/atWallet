import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  url = "http://10.12.113.152:15271/api/Transaction";
  urlCompte = environment.urlCompte;
  urlPay = environment.urlPay;
  transactionSubject: BehaviorSubject<any[]>;
  soldeSubject: BehaviorSubject<any[]>;
  achat: any;

  constructor(private http: HttpClient) {
    this.transactionSubject = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('transactions')));
    this.soldeSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')).solde);
  }

  public get allTransactions$(): Observable<any> {
    return this.transactionSubject.asObservable();
  }

  public get solde$(): Observable<any> {
    return this.soldeSubject.asObservable();
  }

  getAllTransaction(datedeb, datefin, idCompte): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.url}/GetTransactionByCompte?id_Compte=${idCompte}&date_debut=${datedeb}&date_fin=${datefin}`)
        .pipe(take(1))
        .subscribe(res => {
          this.updateStorage(res)
          resolve(res);
        }, (err) => {
          reject(err);

        });
    })
  }

  getSolde(idCompte): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.urlCompte}/GetSoldeByIdCompte?Id_Compte=${idCompte}`).pipe(take(1))
        .subscribe(res => {
          console.log(res);
          this.soldeSubject.next(res.solde);
          resolve(res);
        }, (err) => {
          reject(err);
        })
    });
  }


  private updateStorage(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    this.transactionSubject.next(JSON.parse(localStorage.getItem('transactions')));
  }

  async payment(form) {
    return this.http.get<any>(this.urlPay + `/api/Paiement/EPaiement?id_Compte=${form.id_Compte}&montant=${form.montant}&id_prestataire=${form.id_prestataire}&id_canal_paiement=${form.id_canal_paiement}`).pipe(take(1)).subscribe(async (res) => {
      await this.getSolde(form.id_Compte);
      // this.updateStorage(res);
      let us = JSON.parse(localStorage.getItem('user'));
      us.solde = this.soldeSubject.value;
      localStorage.setItem("user", JSON.stringify(us));

    });
  }
}
