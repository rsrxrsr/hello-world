
import { Routes } from '@angular/router';
import { AutorizacionGuard } from './guards/autorizacion.guard';

import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { TestComponent } from './test/test.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AreaComponent } from './components/area/area.component';
import { AreasComponent } from './components/areas/areas.component';
import { FuncionComponent } from './components/funcion/funcion.component';
import { FuncionesComponent } from './components/funciones/funciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrudComponent } from './components/crud/crud.component';
import { LoginComponent } from './components/login/login.component';
import { TreeComponent } from './components/tree/tree.component';

  export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
    { path: 'crud/:update', component: CrudComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] }, 
    { path: 'list', component: ListComponent }, 
    { path: 'form/:update', component: FormComponent}, 
    { path: 'usuario/list', component: UsuariosComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] },
    { path: 'usuario/:update', component: UsuarioComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] },
    { path: 'area/tree', component: TreeComponent,
        data: { nodeName: 'area', childsName: 'areas' }
    },
    { path: 'area/ctrl', component: AreasComponent, 
      canActivate: [AutorizacionGuard] },    
    { path: 'area/:update', component: AreaComponent, 
      canActivate: [AutorizacionGuard] },    
    { path: 'funcion/list', component: FuncionesComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] },
    { path: 'funcion/:update', component: FuncionComponent,
      canActivate: [AutorizacionGuard], data:['ADMIN', 'USER'] },
    { path: 'usuario/rol/tree', component: TreeComponent,
      data: {  parentName:'usuario', nodeName: 'rol', childsName: 'roles' }
    },
    { path: 'rol/funcion/tree', component: TreeComponent,
      data: { parentName:'rol', nodeName: 'funcion', childsName: 'funciones' }
    },
    { path: 'rol/tree', component: TreeComponent,
      data: { nodeName: 'rol', childsName: 'roles' }
    },
    { path: 'test', component: TestComponent},
    { path: '', redirectTo:  'login', pathMatch: 'full'},
    { path: '**', redirectTo: '' }
  ];
