import { Component, OnInit, Input, inject} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {CommonModule, Location} from '@angular/common';
import { EntityService} from '../../services/entity.service ';

@Component({
  selector: 'app-list',
  //template: '<h1>HOla Crayola! {{entityName}}</h1>',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true, 
  imports: [CommonModule]
})
export class ListComponent implements OnInit {
//
  //private router = inject(Router);
  //private entityServices = inject(EntityService)

  @Input()
  entityName : any = "usuario1";
  
  entityService : {} = {"db": [{"id": 1, "usuario":"un usuario", "estatus": 1, "roles": "ADMIN, USER, OPERATOR"}]};
  entity : any;
  
  constructor(
    private location: Location,
    //public entityServices : EntityService,  
    ) { }

  ngOnInit(): void {
    this.entityService = {"db": [{"id": 1, "usuario":"un usuario", "estatus": 1, "roles": "ADMIN, USER, OPERATOR"}]};
    this.entity = this.entityService["db"][0];
    //this.entityName= this.inputEntityName ? this.inputEntityName : this.activatedRoute.snapshot.url[1].path;
    //this.entityService.getAll(this.entityName)
  }
 
  //
  selectRow(entity: any) {
    //this.entityService.entity=entity;
    //this.router.navigate([`/angular/${this.entityName}/update`]);    
  }
  
  delete(entity: any) {
    //this.entityService.delete(this.entityName, entity);
    this.location.back()
    //this.router.navigate(["/angular/" + entityName + "/list"]);
  }

/* Utility
  compareFn(c1: any, c2: any): boolean {
    //return c1 && c2 ? c1.id === c2.id : c1 === c2;
    return c1 && c2 && c1 === c2;
  }
*/

}
