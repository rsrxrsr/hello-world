import { Component} from '@angular/core';
import { CommonModule} from '@angular/common';

import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.scss'],
  standalone: true, 
  imports: [CommonModule, ListComponent]
})
export class FuncionesComponent extends ListComponent {}
