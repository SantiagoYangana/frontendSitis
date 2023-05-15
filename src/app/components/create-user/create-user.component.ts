import { Component } from '@angular/core';
import { FormGroup , FormBuilder, Validators, FormControl} from '@angular/forms';
import { ProfileUser } from 'src/app/models/profileUser.interface';
import { ApiService } from 'src/app/services/api.service';
import { ListUser } from 'src/app/models/listUser.interface';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  formUser: FormGroup;
  profiles: ProfileUser[] = [];
  verifiedUsername:boolean=false;
  verifiedEmail:boolean=false;
  verfifiedPassword:boolean=false;
  usersVerified:ListUser[]=[];

  validarRegex=/^(?=.*[A-Z])(?=.*[0-9]).+$/;

  constructor(private fb: FormBuilder, private api: ApiService, private router:Router, private alerta: AlertaService) {
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
    this.verifiedUsername = false;
    this.verfifiedPassword = false;
    this.verifiedEmail = false;
    //Verificacion Username no repetido desde el front
    const username = this.formUser.get('username')?.value;
    
    if(this.usersVerified.find(user => user.username == username)){
      this.verifiedUsername = true;
    }

    //Verificacion email no repetido desde el front
    const email = this.formUser.get('email')?.value;
    
    if(this.usersVerified.find(user => user.email == email)){
      this.verifiedEmail = true;
    }

    //Verificacion Password iguales
    const password = this.formUser.get('password')?.value;
    const confirmPassword = this.formUser.get('passwordConfirm')?.value;
    if(password === confirmPassword) this.verfifiedPassword = true;
    

    if(!this.formUser.valid) return this.alerta.showError("Error, digite correctamente los campos", "Creacion Incorrecta");

    if(this.verifiedUsername) return this.alerta.showError("Error, el usuario ya existe", "Error Username");

    if(this.verifiedEmail) return this.alerta.showError("Error, Email ya existe", "Error Email");

    if(!this.verfifiedPassword) return this.alerta.showError("Error, las contrasenas no coinciden", "Error Password");

    this.api.createUser(form).subscribe(data => {
      console.log(data);
      this.router.navigate(['/home']);
      this.formUser.reset();
      this.alerta.showSuccess("Usuario creado correctamente", "Creacion Correcta");
    });
  }

  salir(){
    this.router.navigate(['/home']);
    this.formUser.reset();
  }

}
