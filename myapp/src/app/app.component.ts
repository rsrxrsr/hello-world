import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { NavComponent } from './components/nav/nav.component';
import { SecureService } from './services/secure.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MenuComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'myapp';
  
  constructor(public secureService: SecureService) {}
  
}
