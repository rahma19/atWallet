import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { AfficheTransactionComponent } from '../affiche-transaction/affiche-transaction.component';

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
  verifNum: boolean = true;
  data: any;

  constructor(private fb: FormBuilder,
    private popoverController: PopoverController,
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
  async presentPopover() {
    const popover = await this.popoverController.create({
      component: AfficheTransactionComponent,
      cssClass: 'my-custom-class',
      // event: ev,
      componentProps: {
        'motif_return': this.data.motif_return,
        'montantTransaction': this.data.montantTransaction,

      },
      animated: true
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
  }

  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      color: color
    });
    toast.present();
  }


  async submit(form) {
    if (this.solde > form.value.montant) {
      form.value.idCompte = this.user.idCompte;
      form.value.idWallet = this.user.idWallet;
      form.value.id_prestataire = 1;
      form.value.id_canal_paiement = 2;
      await this.transaService.payment(form.value);
      this.data = await this.transaService.trans;
      console.log(this.data);

      this.presentPopover();
      //this.presentToast('Transaction validée.', 'primary');
    } else {
      this.presentToast('Votre solde est insuffisant.', 'danger');
    }
    if (this.verifNum == false) {
      this.presentToast('Veillez saisir un numero valide.', 'danger');

    }
  }

  check() {

    if (this.tel != '') {
      if (this.tel[0] == 2) {
        this.path = "../../../assets/img/ooredoo.jpg";
        this.verifNum = true;
      } else
        if (this.tel[0] == 9) {
          this.path = "../../../assets/img/telecom.jfif";
          this.verifNum = true;
        }
        else
          if (this.tel[0] == 5) {
            this.path = "../../../assets/img/orange.png";
            this.verifNum = true;
          }
          else {
            this.presentToast('numero non valide.', 'danger');
            this.verifNum = false;
          }
    }

  }

}
