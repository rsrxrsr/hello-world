import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  handleLinkClick(event: MouseEvent): void {
    //event.stopPropagation(); // Detiene la propagación del evento al padre
    console.log('RouterLink clicked');
  }

}
