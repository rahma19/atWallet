import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-mdp',
  templateUrl: './modifier-mdp.page.html',
  styleUrls: ['./modifier-mdp.page.scss'],
})
export class ModifierMdpPage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  return() {
    this.location.back();
  }
}
