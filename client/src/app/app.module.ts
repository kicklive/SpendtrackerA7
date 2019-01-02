import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule,MatMenuModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule,MatButtonModule,MatCardModule,MatTableModule,MatDividerModule,MatSnackBarModule,MatGridListModule, MatDatepickerModule,MatNativeDateModule } from "@angular/material";
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
import { ListbudgetsComponent } from './listbudgets/listbudgets.component';
import { ErrorComponent } from './error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { TrendsComponent } from './trends/trends.component';
import { STComponent } from './ST/ST.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { HistoryComponent } from './history/history.component';
import { NewbudgetComponent } from './newbudget/newbudget.component';
import { BudgetdetailsComponent } from './budgetdetails/budgetdetails.component';
//import { FlexLayoutModule } from "@angular/flex-layout";

 
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    ListbudgetsComponent,
    ErrorComponent,
    LogoutComponent,
    TrendsComponent,
    STComponent,
    AboutComponent,
    SearchComponent,
    HistoryComponent,
    NewbudgetComponent,
    BudgetdetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatMenuModule,MatFormFieldModule,MatInputModule,MatOptionModule,MatSelectModule,MatIconModule,MatButtonModule,MatCardModule,
    MatTableModule,MatDividerModule,MatSnackBarModule,MatGridListModule,MatDatepickerModule,MatNativeDateModule
  
  ],
  providers: [AuthenticationService,
  {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
