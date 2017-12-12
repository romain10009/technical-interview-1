import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import {UsersService} from "./services/users/users.service";
import { CompanyNavbarComponent } from './components/company-navbar/company-navbar.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MockBackendInterceptor} from "../interceptors/mockBackend.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CompanyValidationErrorsComponent} from "./components/company-validation-errors/company-validation-errors";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CompanyLoaderComponent } from './components/company-loader/company-loader.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    CompanyNavbarComponent,
    CompanyValidationErrorsComponent,
    HomeComponent,
    CompanyLoaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
