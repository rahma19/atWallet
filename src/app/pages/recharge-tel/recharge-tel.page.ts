import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { TransactionService } from 'src/app/core/services/transaction.service';

@Component({
  selector: 'app-recharge-tel',
  templateUrl: './recharge-tel.page.html',
  styleUrls: ['./recharge-tel.page.scss'],
})
export class RechargeTelPage implements OnInit {

  cred: FormGroup;
  user: any;
  tel: any;
  path: any;
  mtant: any;
  solde: any;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private transaService: TransactionService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.cred = this.fb.group({
      montant: ['', [Validators.required]],
      numTel: ['', [Validators.required]]
    });

    this.user = this.authService.payload;
    this.transaService.solde$.subscribe((res) => {
      this.solde = res;
    });
    console.log(this.user, this.solde);

    this.tel = '57383327' //this.user.telephone1;
    this.check();
  }

  // Easy access for form fields
  get numTel() {
    return this.cred.get('numTel').value;
  }

  get montant() {
    return this.cred.get('montant').value;
  }

  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      color: color
    });
    toast.present();
  }


  submit(form) {
    if (this.solde > form.value.montant) {
      form.value.id_Compte = this.user.idCompte;
      form.value.id_prestataire = '1';
      form.value.id_canal_paiement = '1';
      console.log(form.value);
      this.transaService.payment(form.value);
      this.presentToast('transaction validé.', 'primary');
    } else {
      this.presentToast('verifier le montant saisie.', 'danger');
    }
  }

  check() {

    if (this.tel != '') {
      if (this.tel[0] == 2) {
        this.path = "../../../assets/img/ooredoo.jpg";
      } else
        if (this.tel[0] == 9) {
          this.path = "../../../assets/img/telecom.jfif";
        }
        else
          if (this.tel[0] == 5) {
            this.path = "../../../assets/img/orange.png";

          }
          else {
            this.presentToast('numero non valide.', 'danger');

          }
    }

  }

}
