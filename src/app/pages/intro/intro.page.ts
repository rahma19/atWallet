import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  next() {
    this.slides.slideNext();
  }

  async start() {
    await localStorage.setItem(INTRO_KEY, 'true');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async startS() {
    await localStorage.setItem(INTRO_KEY, 'true');
    this.router.navigateByUrl('/signup', { replaceUrl: true });
  }
}
