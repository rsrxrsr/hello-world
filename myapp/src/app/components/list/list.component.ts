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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,  
    public entityService : EntityService
  ) { }

  ngOnInit(): void {
    this.entityName = (this.entityName) ? this.entityName : this.activatedRoute.snapshot.params["entityName"] ; 
    console.log("listComponente", this.entityName, "=", this.isRead)
    this.entityService.db = {"usuario": [{"id": 1, "usuario":"un usuario x", "estatus": 1, "password": "un password y"}]}; //test
    this.entityService.status =  "Consulta..."
    if (this.isRead==="true" && !this.entityService.db[this.entityName]) {
      this.read();
    }  
  }

  read() {   
    this.entityService.getAll(this.entityName).subscribe({
      next: (data) => {
        this.entityService.status="Consulta lista..."
      },
      error: (error) => {
        this.entityService.status = error.message;
      },
      complete: () => {
        console.log('Suscripción completada.');
        this.entityService.status="Consulta completa"
      },
    }); 
  }
   
  delete(entity: any) {
    console.log("delete", this.entityName, entity.id)
    this.entityService.delete(this.entityName, entity).subscribe({
      next: (data) => {
        //this.entity = data
        this.entityService.status =  "Baja efectuada...";
      },
      error: (error) => {
        this.entityService.status =  error.message;
      }
    });
  }

  selectRow(entity: any) {
    this.entityService.entity[this.entityName]=entity;
    this.router.navigate([this.entityName, "update"]);    
  }

} //End Component