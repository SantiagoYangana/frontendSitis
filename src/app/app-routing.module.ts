import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { guardRouteGuard} from './guards/guard-route.guard';
import { guardRouteGuardLogin} from './guards/guard-route-login.guard';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'createUser',component:CreateUserComponent,canActivate:[guardRouteGuard]},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent, canActivate:[guardRouteGuardLogin]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
