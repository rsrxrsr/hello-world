import { Component, OnInit, Input, ContentChild} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location} from '@angular/common';
import { EntityService} from '../../services/entity.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule]
})
export class FormComponent implements OnInit {
  @ContentChild('entityForm') entityForm!: NgForm;  
  @Input() entityName: any | undefined;

  entity:any={};
  isUpdate:Boolean=true;
  status: string="Seleccione opción...";
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public entityService : EntityService
    ) { }
     
  ngOnInit(): void {    
    this.entityName = (this.entityName) ? this.entityName : this.activatedRoute.snapshot.url[0].path;
    console.log("formComponente", this.entityName)
    if (this.activatedRoute.snapshot.params["update"]==="create") {
      this.isUpdate=false
      if (this.entityService.entity[this.entityName]) {
        let entity= this.entityService.entity[this.entityName]
        Object.keys(entity).forEach((key) => {delete entity[key]})  
      } else {
        this.entityService.entity[this.entityName] = {}
      }        
    }
    this.entity=this.entityService.entity[this.entityName]
    this.entityService.status="Seleccione opción..."    
  }
  
  save() {
    //console.log("save", this.entityName, this.entity)
    this.entityService.save(this.entityName,this.entity).subscribe({
      next: (data) => {
        this.entity = data
        this.status="Registro efectuado..."
      },
      error: (error) => {
        this.status = error.message
      }
    })  
  }
  
  delete() {
    //console.log("delete", this.entityName, this.entity.id)
    this.entityService.delete(this.entityName,this.entity).subscribe({
      next: (data) => {
        this.entity = data
        this.status="Baja efectuada..."
      },
      error: (error) => {
        this.status = error.message
      }
    })
  }
  
  back() {
  	this.location.back()
  }

/* Utility
  compareFn(c1: any, c2: any): boolean {
    //return c1 && c2 ? c1.id === c2.id : c1 === c2;
    return c1 && c2 && c1 === c2;
  }
*/

/*
  this.entityForm?.valid //valida forma
  this.entityForm?.controls["campo"]?.valid //valida campo
*/ 

}
