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
  entity: any = {};

  constructor(
    //private router: Router,
    public repositoryService: RestService //Set RestService OR ArrayService for RestFull API
   ) {}

  read(entityName: string): Observable<any[]> {
    //console.log("service/getAll:", entityName)
    return this.repositoryService.getAll(entityName)
          .pipe(
            tap(data => this.db[entityName]=[...data])
            ,map(data => data.map(entity => {
               // entity.usuario=entity.usuario.toUpperCase();
                return entity}))
            /*      
            , catchError(error =>{
                //console.log("EntityService", `Error Code: ${error.status}\nMessage: ${error.message}`);
                //this.status = error.message;
                return throwError(() => (error))
              })
            */        
            ,shareReplay(1)
          );
  }

  readPage(entityName: string, page:number=0, size:number=10): Observable<any[]> {
    //console.log("service/getAll:", entityName)
    return this.repositoryService.readPage(entityName, page, size)
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

  save (entityName: string, entity: any): Observable<any> {
    //console.log("service/save", entity);
    return this.repositoryService.save(entityName, entity);
  }
 
  delete(entityName: string, entity: any): Observable<any> {
    //console.log("service/delete");
    return this.repositoryService.delete(entityName, entity.id);
  }  

/*
 
  login(entityName: string, entity: any): Observable<any> {
    return this.repositoryService.login(entityName, entity);
  }

  logout(): void {
    this.repositoryService.logout();
  }

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