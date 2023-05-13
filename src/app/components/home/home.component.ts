import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ListUser } from '../../models/listUser.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  btnCrear:boolean=false;

  users: ListUser[] = [];

  constructor( private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(data => {
      this.users = data;
    });

    if(localStorage.getItem('token')===true.toString()){
      this.btnCrear=true;
    }else{
      console.log('Si hay')
    }
  }

  createUser(){
    this.router.navigate(['/createUser']);
  }
  

}
