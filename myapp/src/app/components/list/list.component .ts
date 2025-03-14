import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { EntityService} from '../../services/entity.service ';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() entityName : any;

  constructor(
    private router: Router,
    private location: Location,
    public entityService : EntityService
    ) { }

  ngOnInit(): void {
    //this.entityName= this.inputEntityName ? this.inputEntityName : this.activatedRoute.snapshot.url[1].path;
    this.entityService.getAll(this.entityName)
  }
  
  //
  selectRow(entity: any) {
    this.entityService.entity=entity;
    this.router.navigate([`/angular/${this.entityName}/update`]);    
  }
  
  delete(entity: any) {
    this.entityService.delete(this.entityName, entity);
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
