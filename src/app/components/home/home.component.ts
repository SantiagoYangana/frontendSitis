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
  page:number=0;
  size:number=5;
  isfirst:boolean = false;
  isLast: boolean = false;
  totalPages:Array<number>=[];

  users: ListUser[] = [];
  profiles: ProfileUser[] = [];
  filteredUsers: ListUser[] = [];
  profileSelected:string='administrador';
  showNullText:boolean=false;

  constructor( private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    //this.getUsers();
    this.chargePaginationUsers();
    this.getProfiles();

    if(localStorage.getItem('token')===true.toString()){
      this.btnCrear=true;
    }else{
      console.log('Si hay')
    }
  }

  chargePaginationUsers(){
    this.api.getPaginationUsers(this.page, this.size).subscribe(data => {
      this.users = data.content;
      this.isfirst = data.first;
      this.isLast = data.last;
      this.totalPages = new Array(data['totalPages']);
      this.filteredUsers = this.users;
    });
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
    if(this.profileSelected!='Todos'){
      this.filteredUsers=this.users.filter(user => user?.profile?.name==this.profileSelected);
      console.log(this.filteredUsers);
      this.filteredUsers.length==0?this.showNullText=true:this.showNullText=false;
    }else{
      this.filteredUsers=this.users;
      this.showNullText=false;
    }
  }  

  prevPage(){
    if(!this.isfirst){
      this.page--;
      this.chargePaginationUsers();
    }
  }

  nextPage(){
    if(!this.isLast){
      this.page++;
      this.chargePaginationUsers();
    }
  }

  setPage(page:number){
    this.page=page;
    this.chargePaginationUsers();
  }
}
