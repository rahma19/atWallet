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
    this.user = this.authService.payload;

    this.cred = this.fb.group({
      montant: ['', [Validators.required, Validators.min(1000)]],
      numTel: [this.user.telephone1, [Validators.required, Validators.min(20000000)]],
      idCompte: [this.user.idCompte],
      idWallet: [this.user.idWallet],
      id_prestataire: ['1'],
      id_canal_paiement: ['2'],
    });

    this.transaService.solde$.subscribe((res) => {
      this.solde = res;
    });
    this.check();
  }

  // Easy access for form fields
  get numTel() {
    return this.cred.get('numTel');
  }

  get montant() {
    return this.cred.get('montant');
  }

  //afficher le popup de validation  
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

  //paiment recharge telephonique
  async submit() {
    console.log(this.cred.value);
    if (this.solde > this.cred.value.montant) {
      await this.transaService.payment(this.cred.value);
      this.data = await this.transaService.trans;
      this.presentPopover();
      //this.presentToast('Transaction validée.', 'primary');
    } else {
      this.presentToast('Votre solde est insuffisant.', 'danger');
    }
  }

  //changer la photo du l'operateur selon le premier chiffre du num tel
  check() {
    if (this.cred.value.numTel != '') {
      if (this.cred.value.numTel[0] == 2) {
        this.path = "../../../assets/img/ooredoo.jpg";
      } else
        if (this.cred.value.numTel[0] == 9) {
          this.path = "../../../assets/img/telecom.jfif";
        }
        else
          if (this.cred.value.numTel[0] == 5) {
            this.path = "../../../assets/img/orange.png";
          }
      //si premier chiffre non valide
      // else {
      //   this.presentToast('numero non valide.', 'danger');
      // }
    }
  }

}
