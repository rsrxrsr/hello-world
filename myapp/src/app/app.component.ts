import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ListComponent } from './components/list/list.component ';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, RouterLink, ListComponent, TestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
