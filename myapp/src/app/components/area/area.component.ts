import { Component} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormComponent } from '../form/form.component';

@Component({
  selector:    'app-area',
  templateUrl: './area.component.html',
  styleUrls:  ['./area.component.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule, FormComponent]
})
export class AreaComponent extends FormComponent {
  catalogos:any =["areas", "usuarios"]
}
