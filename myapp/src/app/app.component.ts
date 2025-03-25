import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';

  handleLinkClick(event: MouseEvent): void {
    //event.stopPropagation(); // Detiene la propagación del evento al padre
    console.log('RouterLink clicked, event propagation stopped.');
  }  

}
