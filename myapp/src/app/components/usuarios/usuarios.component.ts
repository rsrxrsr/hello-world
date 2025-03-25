import { Component} from '@angular/core';
import { CommonModule} from '@angular/common';
//import { RouterLink} from '@angular/router';

import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true, 
  imports: [CommonModule, ListComponent]
})
export class UsuariosComponent extends ListComponent {}
