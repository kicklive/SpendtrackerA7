import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule,MatMenuModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule,MatButtonModule,MatCardModule,MatTableModule,MatDividerModule,MatSnackBarModule } from "@angular/material";
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from "./authenticate.service";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor,ErrorInterceptor } from "./_helpers";
//import { FlexLayoutModule } from "@angular/flex-layout";

 
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatMenuModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule,MatButtonModule,MatCardModule,
    MatTableModule,MatDividerModule,MatSnackBarModule
  
  ],
  providers: [AuthenticationService,
  {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
