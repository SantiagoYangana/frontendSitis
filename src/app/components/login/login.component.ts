import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AlertaService } from 'src/app/services/alerta.service';
import { Login } from '../../models/login.interface';

import { Router } from '@angular/router';
import { Auth } from 'src/app/models/auth.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: Login;
  loginForm: FormGroup;
  errorStatus: boolean = false;
  errorMsj:String="";

  // loginForm = new FormGroup({
  //   username: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required)
  // });

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router, private alerta: AlertaService) { 
    this.login = new Login();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onLogin(){
    if(this.loginForm.valid){
      this.login.username = this.loginForm.value.username;
      this.login.password = this.loginForm.value.password;
      this.api.authorize(this.login).subscribe(data => {
        let result:Auth = data;
        if(result.status=="OK"){
          let resp = result.response.split(",");
          let username = resp[1];
          localStorage.setItem('token', resp[0]);
          localStorage.setItem('username', username);
          this.alerta.showSuccess("Bienvenido "+username, "Login Correcto");
          this.router.navigate(['/home']);
        }else{
          this.errorStatus = true;
          this.errorMsj =result.status;
          this.alerta.showError("Error en el login", "Login Incorrecto");
        }
    });
    }else{
      this.alerta.showError("Error, verifique los campos", "Autenticacion Incorrecta");
    }
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
  }

}
