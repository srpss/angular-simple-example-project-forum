import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
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

import { NgSimpleStateModule } from 'ng-simple-state';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { loggedReducer } from './store/logged.reducer';
import { FourofourComponent } from './fourofour/fourofour.component';
import { CreateComponent } from './main/create/create.component';
import { CounterStore } from './store/counter-store';
import { UserStore } from './store/user-store';
import { ImageStore } from './store/image-store';

import { ThreadComponent } from './thread/thread.component';
import { ErrorIntercept } from './error.interceptor';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        SearchComponent,
        ProfileComponent,
        RegisterComponent,
        LoginComponent,
        FourofourComponent,
        CreateComponent,
        ThreadComponent,

    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorIntercept,
        multi: true
    }, BoardService, authInterceptorProviders, CounterStore, UserStore, ImageStore],
    bootstrap: [AppComponent],
    imports: [BrowserAnimationsModule,
        MaterialModule, 
        SharedModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        StoreModule.forRoot({ test: loggedReducer }),
        NgSimpleStateModule.forRoot({

        }),
        BrowserAnimationsModule,


    ]
})
export class AppModule { }
