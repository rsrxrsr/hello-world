import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { CommonModule } from '@angular/common';
interface Dato {
  nombre: string;
  edad: number;
  ciudad: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule]
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('miTabla') tabla: ElementRef | undefined;
  dataTable: any;
  datos: Dato[] = [
    { nombre: 'Juan', edad: 30, ciudad: 'México' },
    { nombre: 'María', edad: 25, ciudad: 'Guadalajara' },
    { nombre: 'Pedro', edad: 40, ciudad: 'Monterrey' },
    { nombre: 'Luisa', edad: 22, ciudad: 'Puebla' },
    { nombre: 'Carlos', edad: 35, ciudad: 'Tijuana' },
    { nombre: 'Ana', edad: 28, ciudad: 'León' },
    { nombre: 'Sofía', edad: 31, ciudad: 'Querétaro' },
    { nombre: 'Javier', edad: 27, ciudad: 'Mérida' },
    { nombre: 'Elena', edad: 33, ciudad: 'Oaxaca' },
    { nombre: 'Ricardo', edad: 29, ciudad: 'Cancún' },
  ];
  datosFiltrados: Dato[] = [...this.datos];
  seleccionados: Dato[] = [];
  filtro: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.tabla && this.tabla.nativeElement) {
      this.dataTable = $.default(this.tabla.nativeElement).DataTable({
        paging: true,
        ordering: true,
        info: true,
        searching: true, // Habilitamos la búsqueda global de DataTables
        lengthMenu: [5, 10, 25, 50],
        language: {
          url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-MX.json' // O la traducción que prefieras
        }
      });
    }

    // Inicializar el filtro personalizado si es necesario
    this.aplicarFiltro(this.filtro);
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  aplicarFiltro(texto: string): void {
    this.filtro = texto.toLowerCase();
    if (this.dataTable) {
      this.dataTable.search(this.filtro).draw();
    }
  }

  toggleSeleccion(dato: Dato): void {
    const index = this.seleccionados.indexOf(dato);
    if (index > -1) {
      this.seleccionados.splice(index, 1);
    } else {
      this.seleccionados.push(dato);
    }
  }

  getSeleccionados(): string {
    return this.seleccionados.map(s => s.nombre).join(', ')
  }
  
}