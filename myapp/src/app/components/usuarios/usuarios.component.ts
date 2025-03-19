import { Component} from '@angular/core';
import { RouterLink} from '@angular/router';
import { CommonModule} from '@angular/common';

import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true, 
  imports: [CommonModule, RouterLink, ListComponent]
})
export class UsuariosComponent extends ListComponent {

  ngOnInit():void {
    this.entityName = "funcion";
    super.ngOnInit();
  }

}
