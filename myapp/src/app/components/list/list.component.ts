import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule} from '@angular/common';

import { EntityService} from '../../services/entity.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true, 
  imports: [CommonModule, RouterLink]
})
export class ListComponent implements OnInit { 
 
@Input() entityName: any | undefined;
@Input() isRead : string = "false";
@Input() status: string="Consultando...";

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
    this.entityService.getAll(this.entityName).subscribe({
      next: (data) => {
        //this.entityService.db[this.entityName]=[...data];
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

} //End Component