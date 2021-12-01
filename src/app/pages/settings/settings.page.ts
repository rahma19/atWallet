import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NetworkService } from 'src/app/core/services/network.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  check: boolean;

  constructor(
    private alertController: AlertController,
    private connectivity: NetworkService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.connectivity.appIsOnline$.subscribe(async online => {
      console.log(online)

      if (online) {
        console.log("App is online")
      } else {
        console.log("App is offline")
      }
      this.check = online;
    });
  }

  async alertMSG() {
    const alert = await this.alertController.create({
      header: 'Échec',
      message: 'vérifier votre connexion',
      buttons: ['OK'],
    });
    alert.present();
  }

  navigDetail() {
    this.router.navigate(['/tab3']);
  }

  navigProfil() {
    if (this.check) {
      this.router.navigate(['/modif-profil']);
    } else {
      this.alertMSG();
    }
  }

  navigMdp() {
    if (this.check) {
      this.router.navigate(['/modifier-mdp']);
    } else {
      this.alertMSG();
    }
  }

  return() {
    this.location.back();
  }

}
