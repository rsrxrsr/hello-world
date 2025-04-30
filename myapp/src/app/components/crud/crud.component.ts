import { Component} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuarioComponent } from '../usuario/usuario.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { TableComponent } from '../table/table.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector:    'app-crud',
  templateUrl: './crud.component.html',
  styleUrls:  ['./crud.component.scss'],
  standalone: true, 
  imports: [UsuarioComponent, UsuariosComponent, TableComponent, LoginComponent]
})
export class CrudComponent {}
