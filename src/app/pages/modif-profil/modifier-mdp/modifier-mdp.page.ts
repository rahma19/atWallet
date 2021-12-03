import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-modifier-mdp',
  templateUrl: './modifier-mdp.page.html',
  styleUrls: ['./modifier-mdp.page.scss'],
})
export class ModifierMdpPage implements OnInit {
  credentials: FormGroup;

  constructor(private location: Location,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.credentials = this.fb.group({
      use_id: ['', [Validators.required]],
      mdp_last_password: ['', [Validators.required]],
      mdp_New_password: ['', [Validators.required]],
      confirmed_password: ['', [Validators.required]],
      focerupdate: ['true', [Validators.required]]
    });
  }

  ngOnInit() {

  }

  return() {
    this.location.back();
  }

  submit() {
    this.credentials.value.mdp_last_password = localStorage.getItem('mdp');
    this.credentials.value.use_id = localStorage.getItem('userId');
    console.log(this.credentials.value);
    this.authService.updatePassword(this.credentials.value).pipe(take(1)).subscribe(res => {
      console.log("succes");

    });
  }

}
