import { Component} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormComponent } from '../form/form.component';

@Component({
  selector:    'app-funcion',
  templateUrl: './funcion.component.html',
  styleUrls:  ['./funcion.component.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule, FormComponent]
})
export class FuncionComponent extends FormComponent {}
