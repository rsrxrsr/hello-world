import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs'; 
import { map, tap, catchError, shareReplay } from 'rxjs/operators';

//import { FirebaseService } from './firebase.service'; 
import { RestService } from './rest.service';
import { ArrayService } from './array.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  db: any = {};
  tb: any = {};
  pg: any = {};
  status: string = "Consulta...";  
  entity: any = {};

  constructor(
    //private router: Router,
    public repositoryService: RestService //Set RestService OR ArrayService for RestFull API
  ) {}

  readById(entityName, id): Observable<any[]> {
    //console.log("service/getAll:", entityName)
    return this.repositoryService.readById(entityName, id)
  }

  read(entityName: string): Observable<any[]> {
    //console.log("service/getAll:", entityName)
    return this.repositoryService.read(entityName)
          .pipe(
            tap(data => this.db[entityName]=[...data])
            ,map(data => data)
            ,shareReplay(1)
          );
  }

  readPage(entityName: string, page:number=0, size:number=10, sort:string="id"): Observable<any[]> {
    //console.log("Service/readPage:", entityName)
    return this.repositoryService.readPage(entityName, page, size, sort)
          .pipe(
            tap(data => {this.db[entityName]=[...data["content"]]
                         this.tb[entityName]=[...data["content"]]
                         this.pg[entityName]=data["page"]
                         this.pg[entityName]["number"]+=1; //page starts at 0
                        console.log("readPage", this.pg[entityName])})
            ,map(data => data)
            ,shareReplay(1)
          );
  }

  readTree(entityName: string): Observable<any[]> {
    //console.log("service/getAll:", entityName)
    return this.repositoryService.readTree(entityName);
  }

  saveTree (entityName: string, tree: any): Observable<any> {
    //console.log("service/save", entity);
    return this.repositoryService.saveTree(entityName, tree);
  }

  save (entityName: string, entity: any): Observable<any> {
    //console.log("service/save", entity);
    return this.repositoryService.save(entityName, entity);
  }
 
  delete(entityName: string, entity: any): Observable<any> {
    //console.log("service/delete");
    return this.repositoryService.delete(entityName, entity.id);
  }  


 
  login(entityName: string, entity: any): Observable<any> {
    return this.repositoryService.login(entityName, entity);
  }

  logout(): void {
    this.repositoryService.logout();
  }

 /* 

  fileUpload(formData: FormData): Observable<any> {
    return this.repositoryService.fileUpload(formData);
  }

  // Observable
  private subject$ = new Subject<any>();
  getObservable$(): Observable<any> {
    return this.subject$.asObservable();
  }

  save$(entityName: string, entity: any): void {
    console.log("service/save$");
    this.repositoryService.save(entityName, entity)
      .pipe(
        tap(data => {
          console.log("res/save$", data);
          this.entity = data;
          this.subject$.next(this.entity);
        }),
        catchError(error => {
          this.errorHandler(error);
          return throwError(error);
        })
      )
      .subscribe();
  }
  // End Observable

  errorHandler(error: any): void {
    console.log("Error=", error);
    //
    if (error.indexOf("Error Code: 401") >= 0) {
      console.log("not Found")
    }
    //
  }
 */
}