import { Component} from '@angular/core';
import { RouterLink} from '@angular/router';
import { CommonModule} from '@angular/common';

import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.scss'],
  standalone: true, 
  imports: [CommonModule, RouterLink, ListComponent]
})
export class FuncionesComponent extends ListComponent {
/*
  ngOnInit():void {
    this.entityName = "funcion";
    super.ngOnInit();
  }
*/
}
