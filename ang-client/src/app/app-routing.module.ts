import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [{path: 'register', component: RegisterComponent},
{path: 'login', component: LoginComponent},
{path: 'profile', component: ProfileComponent},
{path: '', component: MainComponent},
{path: 'search', component: SearchComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
