import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

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

  constructor(private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.cred = this.fb.group({
      montant: ['', [Validators.required]],
      numTel: ['', [Validators.required]]
    });

    this.user = this.authService.payload;
    console.log(this.user);

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

  submit(form) {
    console.log(form.value);

  }

  check() {
    console.log("uguyog");

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
  }

}
