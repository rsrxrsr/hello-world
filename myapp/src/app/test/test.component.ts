import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service'; // Ajusta la ruta
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, HttpClientModule], //Importa HttpClientModule
  template: `
    <h1>Datos de la API</h1>
    <ul *ngIf="data">
      <li *ngFor="let item of data">{{ item.usuario+" - "+item.password}}</li>
    </ul>
    <p *ngIf="error">Error: {{ error }}</p>
  `,
  styleUrls: ['test.component.css'],
})
export class TestComponent implements OnInit {
  data: any[] | undefined;
  error: string | undefined;
  private dataService = inject(DataService);

  ngOnInit() {
    //
    this.dataService.getData().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
    //
  }
}
