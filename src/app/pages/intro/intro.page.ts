import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { INTRO_KEY, REGISTER_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';

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

  //return user to signup
  async start() {
    await localStorage.setItem(INTRO_KEY, 'true');
    this.router.navigateByUrl('/login');
  }

  //return user to signup
  async startS() {
    await localStorage.setItem(REGISTER_KEY, 'true');
    this.router.navigateByUrl('/signup');
  }


}
