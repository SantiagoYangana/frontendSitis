import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user:any="";

  constructor(private api: ApiService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.user = this.api.getCurrentUsername();
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.user = "";
    this.router.navigate(['/login']);
  }


}
