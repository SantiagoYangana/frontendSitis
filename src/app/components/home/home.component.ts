import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ListUser } from '../../models/listUser.interface';
import { Router } from '@angular/router';
import { ProfileUser } from 'src/app/models/profileUser.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  btnCrear:boolean=false;

  users: ListUser[] = [];
  profiles: ProfileUser[] = [];
  filteredUsers: ListUser[] = [];
  profileSelected:string='administrador';

  constructor( private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.getProfiles();

    if(localStorage.getItem('token')===true.toString()){
      this.btnCrear=true;
    }else{
      console.log('Si hay')
    }
  }

  getUsers(){
    this.api.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = this.users;
    });
  }

  getProfiles(){
    this.api.getProfiles().subscribe(data => {
      this.profiles = data;
    });
  }

  createUser(){
    this.router.navigate(['/createUser']);
  }

  handleFilter(){
    this.filteredUsers=this.users.filter(user => user?.profile?.name==this.profileSelected)
  }

  handleReset(){
    this.filteredUsers=this.users;
    this.profileSelected='administrador';
  }
  

}
