import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BoardService } from './APIService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { boardReducer } from './store/board.reducer';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { loggedReducer } from './store/logged.reducer';
import { FourofourComponent } from './fourofour/fourofour.component';
import { CreateComponent } from './main/create/create.component';


@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        SearchComponent,
        ProfileComponent,
        RegisterComponent,
        LoginComponent,
        FourofourComponent,
        CreateComponent
        
    ],
    providers: [BoardService, authInterceptorProviders],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ test: loggedReducer }),
        
    ]
})
export class AppModule { }
