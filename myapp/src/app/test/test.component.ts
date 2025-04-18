import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service'; // Ajusta la ruta
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule], //Importa HttpClientModule
  template: `
    <h3>Datos de la API</h3>
    <ul *ngIf="data">
      <li *ngFor="let item of data">{{ item.usuario+" = "+item.password}}</li>
    </ul>
    <p *ngIf="error"> Error: {{ error }}</p>
  `,
  styleUrls: ['test.component.css'],
})
export class TestComponent implements OnInit {
  data: any[] | undefined;
  error: string | undefined;

  //private dataService = inject(DataService);
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
  
}
