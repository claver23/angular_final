import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { SecurityComponent } from './pages/security/security.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BodyComponent } from './pages/body/body.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/login/error/error.component';
import { EncuestasComponent } from './pages/encuestas/encuestas.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { EncuestaEdicionComponent } from './pages/encuestas/encuesta-edicion/encuesta-edicion.component';
import { LenguajeProgramacionPipe } from './util/lenguajeProgramacion.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SecurityComponent,
    LogoutComponent,
    BodyComponent,
    LoginComponent,
    ErrorComponent,
    EncuestasComponent,
    EncuestaComponent,
    EncuestaEdicionComponent,
    LenguajeProgramacionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    //API KEY de google maps configurado en google cloud platform
    //AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyDRlxhDKnHX5ie8Y3gJe1YOYpC4dWpa0no'
    //  apiKey: 'AIzaSyA3c63jz0-oKeV57Ck_IHsQiSg5iPWSVyg'
    //})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
  entryComponents: [
    /*
    DetalleComponent, 
    NuevoComponent, 
    NuevoTipoNegocioComponent, 
    NuevonegocioComponent,
    NuevasedeComponent,
    */
    ErrorComponent]
})
export class AppModule { }
