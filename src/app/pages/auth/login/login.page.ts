import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NetworkService } from 'src/app/core/services/network.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;
  check: boolean;

  constructor(
    private alertController: AlertController,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private connectivity: NetworkService
  ) { }

  ngOnInit() {

    this.credentials = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      codeApplication: ['001'],

    });

    this.connectivity.appIsOnline$.subscribe(async online => {
      console.log(online)
      this.check = online;
      // if (online == false) {
      //   const alert = await this.alertController.create({
      //     header: 'Échec de la connexion',
      //     message: 'vérifier votre connexion',
      //     buttons: ['OK'],
      //   });

      //   alert.present();

      // }
    });
  }
  async login() {


    if (this.check) {

      this.authService.login(this.credentials.value).subscribe((res) => {

        setTimeout(() => {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });

        }, 250);
      }, async error => {
        const alert = await this.alertController.create({
          header: 'Nom d utilisateur ou mot de passe est incorrecte',
          message: 'vérifier vos données',
          buttons: ['OK'],
        });

        alert.present();
      });
    }
    else {

      const alert = await this.alertController.create({
        header: 'Échec de la connexion',
        message: 'vérifier votre connexion',
        buttons: ['OK'],
      });

      alert.present();
    }
  }

  // Easy access for form fields
  get userName() {
    return this.credentials.get('userName');
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}
