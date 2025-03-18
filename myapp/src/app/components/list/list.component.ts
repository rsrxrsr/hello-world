import { Component, OnInit, Input, inject} from '@angular/core';
import { Router, RouterLink} from '@angular/router';
import { CommonModule, Location} from '@angular/common';
import { EntityService} from '../../services/entity.service';

@Component({
  selector: 'app-list',
  //template: '<h1>HOla Crayola! {{entityName}}</h1>',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true, 
  imports: [CommonModule, RouterLink]
})
export class ListComponent implements OnInit {

  private router = inject(Router);
  msg : string = "Init";
  error : string | undefined;

  @Input()
  entityName : any = "usuario";

  constructor(
    private location: Location,
    public entityService : EntityService,  
    ) { }

  ngOnInit(): void {
    this.entityService.db = {"usuario": [{"id": 1, "usuario":"un usuario x", "estatus": 1, "password": "un password y"}]};
    //this.entityName= this.inputEntityName ? this.inputEntityName : this.activatedRoute.snapshot.url[1].path;
    this.read();
  }

  read() {   
    this.entityService.getAll(this.entityName).subscribe({
      next: (data) => {
        this.msg="Read..."
      },
      error: (error) => {
        this.error = error.message;
      },
      complete: () => {
        console.log('Suscripción completada.');
        this.msg="complete"
      },
    }); 
  }
 
  selectRow(entity: any) {
    this.entityService.entity=entity;
    this.router.navigate(["/usuario/update"]);    
  }
  
  delete(entity: any) {
    this.entityService.delete(this.entityName, entity);
    this.location.back()
    //this.router.navigate(["/angular/" + entityName + "/list"]);
  }

}
