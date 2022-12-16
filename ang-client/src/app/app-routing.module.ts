import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { FourofourComponent } from './fourofour/fourofour.component';
import { AuthGuard } from './authG';
import { guardMain } from './guardmain';
import { ThreadComponent } from './thread/thread.component';


const routes: Routes = [
  // { path: 'register', component: RegisterComponent, canActivate: [guardMain] },
  // { path: 'login', component: LoginComponent, canActivate: [guardMain] },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guardMain] },
  { path: 'login', component: LoginComponent, canActivate: [guardMain] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '', component: MainComponent },
  { path: 'search', component: SearchComponent },
  { path: '404', component: FourofourComponent },
  { path: 'thread/:id', component: ThreadComponent },
  { path: '**', redirectTo: '/404' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, guardMain]
})
export class AppRoutingModule { 




}
