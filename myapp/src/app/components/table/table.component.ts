import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

//import $ from 'jquery'; // Default import for jQuery

//import 'datatables.net';
//import 'datatables.net-dt';
//import '@types/datatables.net';
//import 'datatables.net-dt/css/jquery.dataTables.css'; // Importar CSS de DataTables como default import
//import 'datatables.net-buttons/js/dataTables.buttons.js'; // Importar DataTables Buttons

//(<any>$.fn.dataTable) = (<any>window).DataTable; // Asignar DataTable a jQuery para evitar conflictos de tipos

interface Dato {
  nombre: string;
  edad: number;
  ciudad: string;
  checked?: boolean; // Propiedad opcional para el checkbox
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class TableComponent {

/*
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  dtOptions: DataTables.Settings={};  
  dtTrigger : Subject<any> = new Subject<any>();
*/

@ViewChild('miTabla', {static:false}) miTabla!: ElementRef;
noEdit: Boolean = true;

  datos: any[] = [
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
  datosFiltrados: any[] = [... this.datos];
  datosSeleccionados: any[] = []; // Array para almacenar los datos de las filas seleccionadas
  filtro: string = '';

  constructor() { }
/*
  ngOnInit(): void {
    this.dtOptions = {
      paging: true,
      pageLength: 5,
      serverSide: false,
      processing: true,
      ordering: true,
      info: true,
      searching: true, // Habilitamos la búsqueda global de DataTables
      lengthMenu: [5, 10, 25, 50],
      data: this.datos,
      columns: [
        { title: 'Nombre', data: 'nombre' },
        { title: 'Edad',   data: 'edad' },
        { title: 'Ciudad', data: 'ciudad' }
      ],
      order: [[0, 'asc']], // Ordenar por la primera columna (Nombre) de forma ascendente
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-MX.json' // O la traducción que prefieras
      }
    }
  }

  ngAfterViewInit(): void {
    console.log("AfterViewInit", (this.tabla && this.tabla.nativeElement));
    $(this.tabla.nativeElement).DataTable(this.dtOptions);
    this.dtTrigger.next(null); // Disparar el evento para inicializar DataTables  
    // Inicializar el filtro personalizado si es necesario
    this.aplicarFiltro(this.filtro);
  }

  ngOnDestroy(): void {
    // Destruir DataTables para evitar fugas de memoria
    this.dtTrigger.unsubscribe();
    if ($(this.tabla.nativeElement).DataTable()) {
      $(this.tabla.nativeElement).DataTable().destroy();
    }   
  }
*/

  sort (column: any, orden:number): void {
    console.log("sort", column, orden);
    //console.log("sort", this.datos, this.datos.length);
    orden=orden === 1 ? 1 : -1; 
    if (this.datosFiltrados.length <= 0) return;
    this.datosFiltrados.sort((a, b) => {
      let x=a[column]
      let y=b[column]
      if (Number(x) && Number(y)) {
        return (x - y) * orden 
      } else {
        x = x.toLowerCase()
        y = y.toLowerCase()
        if (x < y) {return -1 * orden}
        if (x > y) {return  1 * orden}
        return 0;
      }
    }) 
  }

  filtrarDatos() {
    if (!this.filtro) {
      console.log("Datos", this.datos, this.datos.length);  
      this.datosFiltrados = [...this.datos];
    } else { 
      const filtroMinuscula = this.filtro.toLowerCase();
      this.datosFiltrados = this.datos.filter(item => {
        return Object.values(item).some(valor => {
          if (typeof valor === 'string') {
            return valor.toLowerCase().includes(filtroMinuscula)
          }
          return valor === this.filtro; // Si el valor no es string, intenta la comparación directa
        })
      })
    }
  }
    
  seleccionarDatos() {
    this.datosSeleccionados = this.datosFiltrados.filter(fila => fila.checked);
    console.log('Datos seleccionados:', this.datosSeleccionados);
  }

  seleccionarFilas() {
    this.datosSeleccionados = []; // Limpia el array antes de obtener las filas seleccionadas de nuevo
    const filas = this.miTabla.nativeElement.querySelectorAll('tbody tr');
    filas.forEach((fila: HTMLTableRowElement) => {
      const checkbox = fila.querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (checkbox && checkbox.checked) {
        const id = Number(fila.cells[0].textContent);
        const nombre = fila.cells[1].textContent;
        const apellido = fila.cells[2].textContent;
        this.datosSeleccionados.push({ id, nombre, apellido }); // Agrega un objeto con los datos al array
      }
    });
    console.log('Filas seleccionadas:', this.datosSeleccionados);
  }

  alert(msg) {
    console.log(msg);
  }

}
