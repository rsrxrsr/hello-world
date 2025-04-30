
import { Routes } from '@angular/router';
import { AutorizacionGuard } from './guards/autorizacion.guard';

import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { TestComponent } from './test/test.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FuncionComponent } from './components/funcion/funcion.component';
import { FuncionesComponent } from './components/funciones/funciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrudComponent } from './components/crud/crud.component';
import { LoginComponent } from './components/login/login.component';

  export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
    { path: 'crud/:update', component: CrudComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] }, 
    { path: 'list', component: ListComponent }, 
    { path: 'form/:update', component: FormComponent}, 
    { path: 'usuarios/list', component: UsuariosComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] },
    { path: 'usuarios/:update', component: UsuarioComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] },
    { path: 'funcions/list', component: FuncionesComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] },
    { path: 'funcions/:update', component: FuncionComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] },
    { path: 'test', component: TestComponent},
    { path: '', redirectTo:  'login', pathMatch: 'full'},
    { path: '**', redirectTo: '' }
  ];
