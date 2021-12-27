import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-modifier-mdp',
  templateUrl: './modifier-mdp.page.html',
  styleUrls: ['./modifier-mdp.page.scss'],
})
export class ModifierMdpPage implements OnInit {
  credentials: FormGroup;

  constructor(private location: Location,
    private toastController: ToastController,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      use_id: [localStorage.getItem('userId'), [Validators.required]],
      mdp_last_password: [localStorage.getItem('mdp'), [Validators.required]],
      mdp_New_password: ['', [Validators.required, Validators.minLength(6)]],
      confirmed_password: ['', [Validators.required]],
      focerupdate: ['true', [Validators.required]]
    }, {
      validator: ConfirmedValidator('mdp_New_password', 'confirmed_password')
    });
  }

  return() {
    this.location.back();
  }

  submit() {
    this.authService.updatePassword(this.credentials.value).pipe(take(1)).subscribe(async res => {
      await this.presentToast("mot de passe a ete changé avec succes", "success");
      this.authService.logout();
    }, err => {
      if (err.status == "900") {
        this.presentToast("Ancien mot de passe incorrecte", "danger");
      } else
        if (err.status == "902") {
          this.presentToast("mot de passe deja utilisé", "danger");
        }
    });
  }

  // Easy access for form fields
  get mdp_New_password() {
    return this.credentials.get('mdp_New_password');
  }

  get confirmed_password() {
    return this.credentials.get('confirmed_password');
  }

  get mdp_last_password() {
    return this.credentials.get('mdp_last_password');
  }


  async presentToast(msg, color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      color: color
    });
    toast.present();
  }

}
