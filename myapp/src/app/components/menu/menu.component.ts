import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SecureService } from '../../services/secure.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(public secureService: SecureService) {}
  
  handleLinkClick(event: MouseEvent): void {
    //event.stopPropagation(); // Detiene la propagación del evento al padre
    console.log('RouterLink clicked');
  }

}
