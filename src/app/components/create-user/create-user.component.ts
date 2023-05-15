import { Component } from '@angular/core';
import { FormGroup , FormBuilder, Validators, FormControl} from '@angular/forms';
import { ProfileUser } from 'src/app/models/profileUser.interface';
import { ApiService } from 'src/app/services/api.service';
import { ListUser } from 'src/app/models/listUser.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  formUser: FormGroup;
  profiles: ProfileUser[] = [];
  verifiedUsername:boolean=false;
  verfifiedPassword:boolean=false;
  usersVerified:ListUser[]=[];

  validarRegex=/^(?=.*[A-Z])(?=.*[0-9]).+$/;

  constructor(private fb: FormBuilder, private api: ApiService, private router:Router) {
    this.formUser = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern(this.validarRegex), Validators.minLength(8), Validators.maxLength(10)]],
      passwordConfirm: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
      profile:[Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProfiles();
    this.getUsers();
  }

  getProfiles(){
    this.api.getProfiles().subscribe(data => {
      this.profiles = data;
    });
  }

  getUsers(){
    this.api.getUsers().subscribe(data => {
      this.usersVerified = data;
    });
  }

  createUser(form:ListUser){
    //Verificacion Username no repetido desde el front
    const username = this.formUser.get('username')?.value;
    console.log(username)
    
    if(this.usersVerified.find(user => user.username == username)){
      this.verifiedUsername = true;
    }
    //Verificacion Password iguales
    const password = this.formUser.get('password')?.value;
    const confirmPassword = this.formUser.get('passwordConfirm')?.value;
    if(password === confirmPassword){
      this.verfifiedPassword= true;
    }else{
      this.verfifiedPassword=false;
    }

    console.log(password, confirmPassword)

    
    if(this.formUser.valid && !this.verifiedUsername && this.verfifiedPassword){
      this.api.createUser(form).subscribe(data => {
        console.log(data);
        this.router.navigate(['/home']);
        this.formUser.reset();
      });
    }else{
      console.log('Formulario invalido o Usario ya existe o Contrasena no coincide');
      this.verifiedUsername = false;
      this.verfifiedPassword = false;
    }
  }

  validatePassword(){
    const password = this.formUser.get('password')?.value;
    const confirmPassword = this.formUser.get('confirmPassword')?.value;
    if(password === confirmPassword){
      return true;
    }else{
      return false;
    }
  }

  salir(){
    this.router.navigate(['/home']);
  }

}
