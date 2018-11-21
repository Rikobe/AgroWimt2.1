import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { FooterComponent } from './components/footer/footer.component';
import { CallbackComponent } from './components/callback/callback.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { MasvendidoComponent } from './components/masvendido/masvendido.component';
import { AgrmodtierraComponent } from './components/agrmodtierra/agrmodtierra.component';
import { AdministrarTierraComponent } from './components/administrar-tierra/administrar-tierra.component';
import { AgrmodrecursosComponent } from './components/agrmodrecursos/agrmodrecursos.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { PerfiltierraComponent } from './components/perfiltierra/perfiltierra.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CuentaComponent,
    FooterComponent,
    CallbackComponent,
    BusquedaComponent,
    PromocionesComponent,
    MasvendidoComponent,
    AgrmodtierraComponent,
    AdministrarTierraComponent,
    AgrmodrecursosComponent,
    ContratosComponent,
    PerfiltierraComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
