import { Component} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormComponent } from '../form/form.component';
@Component({
  selector:    'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls:  ['./usuario.component.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule, FormComponent]
})
export class UsuarioComponent extends FormComponent { }
