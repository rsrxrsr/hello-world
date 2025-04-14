import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  handleLinkClick(event: MouseEvent): void {
    //event.stopPropagation(); // Detiene la propagación del evento al padre
    console.log('RouterLink clicked');
  }

}
