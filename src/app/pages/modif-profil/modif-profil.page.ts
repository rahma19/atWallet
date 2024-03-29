import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { NetworkService } from 'src/app/core/services/network.service';

@Component({
  selector: 'app-modif-profil',
  templateUrl: './modif-profil.page.html',
  styleUrls: ['./modif-profil.page.scss'],
})
export class ModifProfilPage implements OnInit {
  check: boolean;
  user: any;

  constructor(private connectivity: NetworkService,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.user = this.authService.payload;
    this.connectivity.appIsOnline$.subscribe(async online => {
      if (online) {
        this.check = true;
      }
      else
        this.check = false;
      // const alert = await this.alertController.create({
      //   header: 'Échec de la connexion',
      //   message: 'vérifier votre connexion',
      //   buttons: ['OK'],
      // });

      // alert.present();
    });

  }

  async submit(form) {
    console.log(form.value);
    if (this.check) {


    } else {
      const alert = await this.alertController.create({
        header: 'Échec',
        message: 'vérifier votre connexion',
        buttons: ['OK'],
      });
      alert.present();
    }
  }

  redirectMdp() {
    this.router.navigate(['/modifier-mdp']);
  }

}
