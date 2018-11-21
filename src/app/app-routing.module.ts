import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//components
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { HomeComponent } from './components/home/home.component';
import { CallbackComponent } from './components/callback/callback.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { MasvendidoComponent } from './components/masvendido/masvendido.component';
import { AgrmodtierraComponent } from './components/agrmodtierra/agrmodtierra.component';
import { AdministrarTierraComponent } from './components/administrar-tierra/administrar-tierra.component';
import { AgrmodrecursosComponent } from './components/agrmodrecursos/agrmodrecursos.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { PerfiltierraComponent } from './components/perfiltierra/perfiltierra.component';

import { AuthguardService } from './services/authguard.service';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cuenta', component: CuentaComponent, canActivate:[AuthGuard]},
  { path: 'callback', component: CallbackComponent},
  { path: 'search', component: BusquedaComponent},
  { path: 'promociones', component: PromocionesComponent},
  { path: 'masvendido', component: MasvendidoComponent},
  { path: 'agregartierra', component: AgrmodtierraComponent},
  { path: 'administrartierra', component: AdministrarTierraComponent},
  { path: 'administrarrecursos', component: AgrmodrecursosComponent},
  { path: 'contratos', component: ContratosComponent},
  { path: 'perfiltierra', component: PerfiltierraComponent},
  { path: 'registrarse', component: UserComponent, children: [{ path: '', component: SignUpComponent }]},
  { path: 'login', component: UserComponent, children: [{ path: '', component: SignInComponent }]},

  { path: '**', component: HomeComponent },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}