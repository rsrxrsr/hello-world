
import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { TestComponent } from './test/test.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FuncionComponent } from './components/funcion/funcion.component';
import { FuncionesComponent } from './components/funciones/funciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

  export const routes: Routes = [
    { path: 'list', component: ListComponent }, 
    { path: 'form/:update', component: FormComponent}, 
    { path: 'usuario/:update', component: UsuarioComponent},
    { path: 'usuarios/:entityName', component: UsuariosComponent},
    { path: 'funcion/:update', component: FuncionComponent},
    { path: 'funciones/:entityName', component: FuncionesComponent},
    { path: 'test', component: TestComponent},
    { path: '', redirectTo:  'test', pathMatch: 'full'},
    { path: '**', redirectTo: '' }
  ];
