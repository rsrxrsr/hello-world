import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSort, faSortUp, faSortDown , faCoffee, faMagnifyingGlass, faPlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';     
import { }   from '@fortawesome/free-regular-svg-icons';

import { EntityService} from '../../services/entity.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink, FontAwesomeModule]
})
export class ListComponent implements OnInit { 
 
@Input() entityName: any | undefined;
@Input() isRead : string = "false";
@Input() status: string="Consultando...";

faCoffee = faCoffee
faMagnifyingGlass = faMagnifyingGlass
faPlus=faPlus
faPenToSquare = faPenToSquare
faTrashCan = faTrashCan
faSort = faSort
faSortUp = faSortUp   
faSortDown = faSortDown

datos: any[] = [];
datosFiltrados: any[] = [];
datosSeleccionados: any[] = []; // Array para almacenar los datos de las filas seleccionadas
filtro: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,  
    public entityService : EntityService
  ) {}

  ngOnInit(): void {
    //this.entityName = (this.entityName) ? this.entityName : this.activatedRoute.snapshot.params["entityName"] ; 
    this.entityName = (this.entityName) ? this.entityName : this.activatedRoute.snapshot.url[0].path;
    console.log("listComponente", this.entityName, "=", this.isRead)
    //this.entityService.db = {"usuario": [{"id": 1, "usuario":"un usuario x", "estatus": 1, "password": "un password y"}]}; //test
    this.status =  "Consulta..."
    if (this.isRead==="false") { //&& !this.entityService.db[this.entityName]) {
      this.read();
    }  
  }

  read() {   
    this.entityService.read(this.entityName).subscribe({
      next: (data) => {
        this.datos=[... data];
        this.datosFiltrados = [... data];        
        this.status="Consulta lista..."
      },
      error: (error) => {
        //console.log("ListComponent", `Error Code: ${error.status}\nMessage: ${error.message}`);
        this.status = error.message;
      },
      complete: () => {
        console.log('Suscripción completa');
        this.status="Consulta completa"
      },
    }); 
  }
   
  delete(entity: any) {
    //console.log("delete", this.entityName, entity)
    this.entityService.delete(this.entityName, entity).subscribe({
      next: (data) => {
        this.status="Baja efectuada..."
        this.read(); //Recargar la lista
      },
      error: (error) => {
        this.status = error.message
    }})
  }

  selectRow(entity: any) {
    //console.log("selectRow", this.entityName, entity)
    this.entityService.entity[this.entityName]=entity;
    this.router.navigate([this.entityName, "update"]);    
  }

  orden = {};
  
  getIcon(column: string) {
    switch (this.orden[column]) {
      case -1: return this.faSortDown;      
      case  1:  return this.faSortUp;
      default: return this.faSort;}
  }
  
  sort (column: any): void {
    let orden = (this.orden[column]===1) ? -1 : 1;
    this.orden = {}; 
    this.orden[column] = orden;      
    console.log("Sort", column, orden);
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
    
  procesarDatos(exfuncion: any) {
    this.datosSeleccionados = this.datosFiltrados.filter(fila => fila.checked);
    console.log('Datos seleccionados:', this.datosSeleccionados);
    this.datosSeleccionados.forEach((fila) => {
      if (exfuncion) {
        exfuncion(fila); // Llama a la función pasada como argumento
      }})
  }

  swCheckAll($event: any) {
    this.datosFiltrados.map(fila => fila.checked = $event.target.checked); 
    //console.log('swCheck:', this.datosFiltrados);
  }

} //End Component