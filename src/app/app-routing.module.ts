import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { SecurityComponent } from './pages/security/security.component';
import { GuardService } from './_services/guard.service';
import { LogoutComponent } from './pages/logout/logout.component';
import { BodyComponent } from './pages/body/body.component';
import { LoginComponent } from './pages/login/login.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { EncuestaEdicionComponent } from './pages/encuestas/encuesta-edicion/encuesta-edicion.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuardService]},
  {path: 'logout', component: LogoutComponent},
  {path: 'security', component: SecurityComponent},
  {path: 'app', component: BodyComponent, children: [
    {path: 'about', component: AboutComponent},
    {path: 'encuesta', component: EncuestaComponent},
    //{path: 'admin', component: AdminComponent, children: [
    {path: 'encuestas', component: EncuestasComponent, children: [
      {path: 'edicion/:id', component: EncuestaEdicionComponent}
    ]}      
   //]},
  ], canActivate: [GuardService]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
