import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location} from '@angular/common';
import { EntityService} from '../../services/entity.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule]
})
export class FormComponent implements OnInit {
  @Input() entityName: string = "usuario";

  entity:any={};
  isUpdate:Boolean=true;
  msg: string = "Ready"
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public entityService : EntityService
    ) { }

  ngOnInit(): void {
    this.entityName = this.activatedRoute.snapshot.url[0].path
    if (this.activatedRoute.snapshot.params["update"]==="create") {
      this.isUpdate=false
      this.entityService.entity={"id":""}
    }
    this.entity=this.entityService.entity
  }
  
  save() {
    this.entityService.save(this.entityName,this.entity).subscribe({
      next: (data) => {
        this.entity = data
        this.msg="Save..."
      },
      error: (error) => {
        this.msg = error.message;
      }
    }); 
  }
  
  delete() {
    this.entityService.delete(this.entityName,this.entity).subscribe({
      next: (data) => {
        this.entity = data
        this.msg="Save..."
      },
      error: (error) => {
        this.msg = error.message;
      }
    });
  }
  
  back() {
  	this.location.back();
  }

/* Utility
  compareFn(c1: any, c2: any): boolean {
    //return c1 && c2 ? c1.id === c2.id : c1 === c2;
    return c1 && c2 && c1 === c2;
  }
*/

}
