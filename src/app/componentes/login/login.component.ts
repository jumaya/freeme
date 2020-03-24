import { Mensaje } from './../../configuration/config';
import { DataService } from './../../services/data.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonButton, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  get user() {
    return this.LoginForm.get("user");
  }

  get password() {
    return this.LoginForm.get("password");
  }

  @ViewChild('btnGuardar', { static: false }) btnGuardar: IonButton;
  @Input() usuario: string;
  @Input() pass: string;
  @Input() buttom: string;
  lan: Observable<Mensaje[]> = this.appService.getErrorMessages();

  LoginForm: FormGroup;
  public errorMessages = {
    user: [
      { type: 'required', message: '' },
    ],
    password: [
      { type: 'required', message: '' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private appService: DataService
  ) {
    localStorage.clear();
    this.LoginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }

  ngOnInit() { }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    this.presentToast('ss');
  }

}
