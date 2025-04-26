import { Component, OnInit, Input, Output, EventEmitter, ContentChild, inject} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location} from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

import { ArrayService } from '../../services/array.service';
import { EntityService} from '../../services/entity.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true, 
  imports: [CommonModule, FormsModule]
})
export class FormComponent implements OnInit { //, AfterViewChecked {   //OnInit {
  @ContentChild('entityForm', {read: NgForm}) entityForm!: NgForm;
  @Input() entityName: any | undefined;
  @Input() name: string="FormComponent";

  @Output() editChange = new EventEmitter<Boolean>();
  onEditChange(noEdit: Boolean) {
    //console.log(this.name, "onEditChange", noEdit)
    this.editChange.emit(noEdit);
  }
  setEdit(noEdit: Boolean) {
    //console.log(this.name, "setEdit", this.noEdit)
    this.noEdit=noEdit;
  }  

  entity:any={};
  isUpdate:Boolean=true;
  noEdit:Boolean = false;
  status: string="Seleccione opción...";
  //public entityService : Irepository = inject(ArrayService);
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public entityService: EntityService // inyectar servicio
  ) {}
     
  ngOnInit(): void {    
    this.entityName = (this.entityName) ? this.entityName : this.activatedRoute.snapshot.url[0].path;
    this.name = (this.name) ? this.name : this.entityName; 
    console.log("formComponente", this.name, this.entityName)
    if (this.activatedRoute.snapshot.params["update"]==="create") {
      this.isUpdate=false;
      this.noEdit=false;
      this.onEditChange(this.noEdit);
      this.status="Alta de datos...";
      if (this.entityService.entity[this.entityName]) {
        let entity= this.entityService.entity[this.entityName]
        Object.keys(entity).forEach((key) => {delete entity[key]})  
      } else {
        this.entityService.entity[this.entityName] = {}
      }        
    }    
    this.entity=this.entityService.entity[this.entityName]
  }

  edit() {
    this.noEdit=false;
    this.onEditChange(this.noEdit);
    this.status=this.name + " Edición de datos..."
  }

  save() {
    //console.log("save", this.entityName, this.entity)
    this.entityService.save(this.entityName,this.entity).subscribe({
      next: (data) => {
        this.entity.id = data.id
        this.status="Registro efectuado..."
        console.log("save", this.entityName, this.entity)
      },
      error: (error) => {
        this.status = error.message
    }})  
  }
  
  delete() {
    //console.log("delete", this.entityName, this.entity.id)
    this.entityService.delete(this.entityName,this.entity).subscribe({
      next: (data) => {
        this.entity.id = 0
        console.log("delete", this.entityName, this.entity)
        this.status="Baja efectuada..."
      },
      error: (error) => {
        this.status = error.message
    }})
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

/*
  ngAfterViewChecked() {
    if (this.isEdit === undefined
        && this.isUpdate
        && this.entityForm
        && this.entityForm.controls
        && Object.keys(this.entityForm.controls).length > 0) {
        console.log("disable", Object.keys(this.entityForm.controls).length);
        this.isEdit=false
        Object.keys(this.entityForm.controls).forEach(controlName => {
        this.entityForm.controls[controlName].disable();
        })
      }
    //console.log("AfterViewChecked ", this.entityName, " disable", this.isEdit)
  }
*/

}
