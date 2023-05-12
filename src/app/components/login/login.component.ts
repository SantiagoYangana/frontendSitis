import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Login } from '../../models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: Login;
  loginForm: FormGroup;

  // loginForm = new FormGroup({
  //   username: new FormControl('', Validators.required),
  //   password: new FormControl('', Validators.required)
  // });

  constructor(private api: ApiService, private fb: FormBuilder) { 
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
        console.log(data);
      });
    }
    console.log();
  }

}
