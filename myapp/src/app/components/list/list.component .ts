import { Component, OnInit, Input, inject} from '@angular/core';
import { Router} from '@angular/router';
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

  private router = inject(Router);
  public entityService = inject(EntityService)
  error : string | undefined;

  @Input()
  entityName : any = "usuario";
//
 // entityService: any = {};
 // entity: any = {};

  constructor(
    private location: Location
    //public entityService : EntityService,  
    ) { }

  ngOnInit(): void {
    //this.entityService = {"db": {"usuario": [{"id": 1, "usuario":"un usuario", "estatus": 1, "roles": "ADMIN, USER, OPERATOR"}]}};
    //this.entity = this.entityService["db"]["usuario"][0];
    //this.entityName= this.inputEntityName ? this.inputEntityName : this.activatedRoute.snapshot.url[1].path;
    this.read; 
  }

  read() {
    this.entityService.getAll(this.entityName).subscribe({
      next: (data) => {
        this.entityService.db[this.entityName] = data;
      },
      error: (error) => {
        this.error = error;
      },
      complete: () => {
        console.log('Suscripción completada.');
      },
    });
  }
 
  //
  selectRow(entity: any) {
    this.entityService.entity=entity;
    this.router.navigate(["/test"]);    
  }
  
  delete(entity: any) {
    this.entityService.delete(this.entityName, entity);
    this.location.back()
    //this.router.navigate(["/angular/" + entityName + "/list"]);
  }

//

/* Utility
  compareFn(c1: any, c2: any): boolean {
    //return c1 && c2 ? c1.id === c2.id : c1 === c2;
    return c1 && c2 && c1 === c2;
  }
*/

}
