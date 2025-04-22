import { Component} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListComponent } from '../list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule, ListComponent, FontAwesomeModule]
})
export class FuncionesComponent extends ListComponent {

  fxMayusculas(fila: any): void {
    fila["funcion"] = fila["funcion"].toUpperCase();
  }
  fxMinusculas(fila: any): void {
    fila["funcion"] = fila["funcion"].toLowerCase();
  }

}
