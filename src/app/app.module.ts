import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { } from '@angular/material'; 

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
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { MissolicitudesComponent } from './components/missolicitudes/missolicitudes.component';
import { ModificarperilComponent } from './components/modificarperil/modificarperil.component';
import { AdmineventosComponent } from './components/admineventos/admineventos.component';
import { ModalcancelComponent } from './components/modalcancel/modalcancel.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AddeventosComponent } from './components/addeventos/addeventos.component';
import { PanelComponent } from './components/user/panel/panel.component';
import { PagotierraComponent } from './components/pagotierra/pagotierra.component';



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
    SignInComponent,
    SolicitudesComponent,
    MissolicitudesComponent,
    ModificarperilComponent,
    AdmineventosComponent,
    ModalcancelComponent,
    AddeventosComponent,
    PanelComponent,
    PagotierraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgbModalModule,
    FormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBSKNno0k2uTLczSQL08pRkCYN_Q419-hg'})
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
