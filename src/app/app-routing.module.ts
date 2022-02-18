import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'search', component:SearchComponent},
  {path: 'playlist', component:PlaylistComponent},
  {path: 'home', component:HomeComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
