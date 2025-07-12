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
  @Input() name: string="FormComponent";
  @Input() entityName: any | undefined;
  @Input() catalogos: any | undefined;

  @Output() editChange = new EventEmitter<Boolean>();
  onEditChange(noEdit: Boolean) {
    //console.log(this.name, "onEditChange", noEdit)
    this.editChange.emit(noEdit);
  }
  setEdit(noEdit: Boolean) {
    //console.log(this.name, "setEdit", this.noEdit)
    this.noEdit=noEdit;
  }  

  path:string="";
  entity:any={};
  isUpdate:Boolean=true;
  noEdit:Boolean = true;
  status: string="Seleccione opción...";
  //public entityService : Irepository = inject(ArrayService);
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public entityService: EntityService // inyectar servicio
  ) {}
     
  ngOnInit(): void {    
    this.path = this.entityName || this.activatedRoute.snapshot.url[0].path;
    this.entityName = this.path.replace(/\/ctrl$/, "");
    this.name = this.name || this.entityName; 
    this.catalogos = this.catalogos || [];
    console.log("formComponente", this.name, this.entityName)
    this.readCatalogos()
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

  readCatalogos() {
    console.log(this.name, "Catalogos", this.catalogos)
    this.catalogos.forEach((catalogo: String) => {
      if (catalogo.includes("Enum/")) {
        this.read(catalogo.substring(catalogo.indexOf('/') + 1));
      } else {
        this.readCatalog(catalogo,catalogo);
      }    
    })
   }       

  readCatalog(catalogName, sort) { 
  this.entityService.readPage(catalogName,0,100,sort).subscribe({
    next: (data) => {
      this.status = "Catalogo listo...";
    },
    error: (error) => {
      console.log("ListComponent", `Error Code: ${error.status}\nMessage: ${error.message}`);
      this.status = error.message;
    } })
  }

  read(catalogName) { 
    this.entityService.read(catalogName).subscribe({
    next: (data) => {
      this.status = "Catalogo listo...";
      //console.log("Read", data, this.entityService.db["area/nivel"]);
    },
    error: (error) => {
      console.log("ListComponent", `Error Code: ${error.status}\nMessage: ${error.message}`);
      this.status = error.message;
    } })
  }

  save() {
    //console.log("save", this.entityName, this.entity)
    this.entityService.save(this.path,this.entity).subscribe({
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
    this.entityService.delete(this.path,this.entity).subscribe({
      next: (data) => {
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

//
  compareFn(c1: any, c2: any): boolean {
    //console.log("compareFn", c1, c2)
    return c1 && c2 ? Number(c1.id) === Number(c2.id) : c1 === c2;
  }
//

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
