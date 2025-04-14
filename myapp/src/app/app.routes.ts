
import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { TestComponent } from './test/test.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FuncionComponent } from './components/funcion/funcion.component';
import { FuncionesComponent } from './components/funciones/funciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrudComponent } from './components/crud/crud.component';

  export const routes: Routes = [
    { path: 'crud/:update', component: CrudComponent }, 
    { path: 'list', component: ListComponent }, 
    { path: 'form/:update', component: FormComponent}, 
    { path: 'usuarios/list', component: UsuariosComponent},
    { path: 'usuarios/:update', component: UsuarioComponent},
    { path: 'funcions/list', component: FuncionesComponent},
    { path: 'funcions/:update', component: FuncionComponent},
    { path: 'test', component: TestComponent},
    { path: '', redirectTo:  'test', pathMatch: 'full'},
    { path: '**', redirectTo: '' }
  ];
