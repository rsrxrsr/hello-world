import { Injectable } from '@angular/core';
import { of, Observable, Subject, throwError } from 'rxjs'; 
import { Irepository } from '../Interface/Irepository';

@Injectable({
  providedIn: 'root'
})
export class ArrayService implements Irepository {

  db: any={}; 
  entity: any={};
  status: string="Seleccione Opción...";
/*
  tree =  {"area":"Empresa",
    "childs":[{"area":"Area.1","childs":[]},
              {"area":"Area.2","childs":[
               {"area":"Area.2.1","childs":[
                 {"area":"Area.2.1.1","childs":[]},
                 {"area":"Area.2.1.2","childs":[]},                
               ]},
               {"area":"Area.2.2","childs":[]},
               {"area":"Area.2.3","childs":[]},              
              ]},
              {"area":"Area.3","childs":[]}]}
*/
  constructor() {}

  read (entityName: string): Observable<any[]> {
    console.log("rest/getAll:", entityName)
    if (!this.db[entityName]) {
      this.db[entityName] = [];
    }
    return of(this.db[entityName]);
  }

  save (entityName: string, entity: any): Observable<any> {
    console.log("rest/save", entity);
    let item = {...entity};
    if (!this.db[entityName]) {
      this.db[entityName] = [];
    }
    if (entity.id) {
      let idx = this.db[entityName].findIndex(item => item.id === entity.id);
      if (idx === -1) {
        throwError(() => new Error("Registro inexistente"));
      } else {
        this.db[entityName][idx] = item;
      }
    } else {      
      item.id = this.db[entityName].length+1; // id autoincremental
      this.db[entityName].push(item);
    }
    return of(entity); 
  }
 
  delete(entityName: string, id: any): Observable<any> {
    let idx = this.db[entityName].findIndex(item => item.id == id);
    console.log("Delete", id)
    if (idx !== -1) {
      this.db[entityName].splice(idx, 1)
    } else {
      console.log("Registro no encontrado", id, idx)      
      return throwError(() => new Error("Registro inexistente"));
    }
    return of(this.db[entityName][idx]);
  }
   
 //
}