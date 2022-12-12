import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { FourofourComponent } from './fourofour/fourofour.component';
import { AuthGuard } from './authG';


const routes: Routes = [{path: 'register', component: RegisterComponent,  canActivate: [AuthGuard]},
{path: 'login', component: LoginComponent,  canActivate: [AuthGuard]},
{path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard]},
{path: '', component: MainComponent},
{path: 'search', component: SearchComponent},
{path: '404', component: FourofourComponent},
{path: '**', redirectTo: '/404'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
