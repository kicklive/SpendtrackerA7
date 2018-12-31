import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationService } from "./authenticate.service";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuardService } from './_guards/auth-guard.service';
import { ListbudgetsComponent } from './listbudgets/listbudgets.component';
import { ErrorComponent } from './error/error.component';
import { ModuleWithProviders } from "@angular/core";
import { LogoutComponent } from './logout/logout.component';
import { TrendsComponent } from './trends/trends.component';
import { STComponent } from './ST/ST.component';
import { HistoryComponent } from './history/history.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { NewbudgetComponent } from './newbudget/newbudget.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'logout',component:LogoutComponent},
{path:'register',component:RegisterComponent},
{path:'error',component:ErrorComponent},
{path:'profile',component:ProfileComponent,canActivate:[AuthGuardService]},
{path:'listbudgets',component:ListbudgetsComponent,canActivate:[AuthGuardService]},
{path:'trends',component:TrendsComponent,canActivate:[AuthGuardService]},
{path:'history',component:HistoryComponent,canActivate:[AuthGuardService]},
{path:'search',component:SearchComponent,canActivate:[AuthGuardService]},
{path:'about',component:AboutComponent,canActivate:[AuthGuardService]},
{path:'ST',component:STComponent,canActivate:[AuthGuardService]},
{path:'newbudget',component:NewbudgetComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    AuthGuardService,AuthenticationService
  ]
})
export class AppRoutingModule { }

//export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

