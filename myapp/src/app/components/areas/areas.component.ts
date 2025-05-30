import { Component} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListComponent } from '../list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule, ListComponent, FontAwesomeModule]
})
export class AreasComponent extends ListComponent {

  fxMayusculas(fila: any): void {
    fila["area"] = fila["area"].toUpperCase();
  }
  fxMinusculas(fila: any): void {
    fila["area"] = fila["area"].toLowerCase();
  }

}
