import { TranslateService } from '@ngx-translate/core';
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
  @Input() text1: string;
  @Input() text2: string;
  @Input() text3: string;
  @Input() text4: string;
  @Input() text5: string;
  @Input() text6: string;  
  @Input() text7: string;    
  @Input() _token: string;  

  
  LoginForm: FormGroup;
  public errorMessages = {
    user: [
      { type: 'required', message: '' },
    ],
    password: [
      { type: 'required', message: '' }
    ],
  };

  cuenta: Observable<any>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private appService: DataService,
    private translateService: TranslateService
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
    this.btnGuardar.disabled = true;
    var data = {
      'user': this.LoginForm.value.user,
      'password': this.LoginForm.value.password,
      'type': 'userpassword'
    }
    this.appService.login(data).toPromise().then((res: any) => {
      localStorage.setItem('token', res.data.dstoken);
      this.router.navigate(['/cuenta']);
    }).catch(err => {
      console.log(err)      
      this.btnGuardar.disabled = false;
      this.presentToast(this.text7)
    });
  }

  routerLink(param){
    this.router.navigate(['/login/'+param]);   
    this.translateService.use(param);
  }

}
