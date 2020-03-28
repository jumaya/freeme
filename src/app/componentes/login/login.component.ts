/**
 * @fileoverview Componente que permite realizar el inicio de sesion al aplicativo. * 
 * @author Juan Sebastian Maya <jumaya19@gmail.com> 
*/
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './../../services/data.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonButton, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  /**
  * Metodo que permite obtener la data del campo ususario del formulario
  * @type {object}
  */
  get user() {
    return this.LoginForm.get("user");
  }

 /**
  * Metodo que permite obtener la data del campo password del formulario
  * @type {object}
  */
  get password() {
    return this.LoginForm.get("password");
  }

  /**
  * Elemento tipo IonButton que obtiene las propiedades del boton guardar del formulario
  * @type {IonButton}
  */
  @ViewChild('btnGuardar', { static: false }) btnGuardar: IonButton;

  /**
  * Propiedades que indican los campos a utilizar en la vista.
  * @type {string}
  */
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

  /**
  * Objeto que permite validar y realizar operaciones al formulario reactivo
  * @type {FormGroup}
  */
  LoginForm: FormGroup;

  /**
   * Objeto donde se tipifica el mensaje de validacion a mostrar en el formulario
   * @type {object}
   */
  public errorMessages = {
    user: [
      { type: 'required', message: '' },
    ],
    password: [
      { type: 'required', message: '' }
    ],
  };

  /** @constructor */
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

  /**
  * Metodo que permite llamar al controlador de IONIC toast para visualizar mensaje en el formulario
  * @param  {string}
  * @return  {object}
  */
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  /**
  * Metodo que permite obtener los datos del formulario y realizar la peticion al servicio para inicio de sesion
  * @return  {void}
  */
  onSubmit() {
    this.btnGuardar.disabled = true;
    var data = {
      'user': this.LoginForm.value.user,
      'password': this.LoginForm.value.password,
      'type': 'userpassword'
    }
    this.appService.login(data).toPromise().then((res: any) => {
      localStorage.setItem('token', res.data.dstoken);
      /*Si el usuario esta correctamente se envia a la pagina cuenta */
      this.router.navigate(['/cuenta']);
    }).catch(err => {
      console.log(err)
      this.btnGuardar.disabled = false;            
      this.presentToast(this.text7)              
    });
  }

  /**
  * Segun el lenguaje seleccionado en vista se redirige a la pagina seleccionada y 
  * se guarda el lenguage para realizar la traducción de la pagina.
  * @return  {Route}
  */
  routerLink(param) {
    this.router.navigate(['/login/' + param]);
    this.translateService.use(param);
  }

}
