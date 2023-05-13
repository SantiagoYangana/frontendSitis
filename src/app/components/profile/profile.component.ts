import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ProfileUser } from 'src/app/models/profileUser.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profiles: ProfileUser[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProfiles().subscribe(data => {
      this.profiles = data;
    });
  }

}
