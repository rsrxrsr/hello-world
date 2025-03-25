import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs'; 
import { map, tap, catchError, shareReplay } from 'rxjs/operators';

//import { FirebaseService } from './firebase.service'; 
import { RestService } from './rest.service';
import { DataService } from '../test/data.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  db: any = {};  
  entity: any = {};
  status: string | undefined;

  constructor(
    //private router: Router,
    public repositoryService: RestService
  ) { }

  getAll(entityName: string): Observable<any[]> {
    //console.log("service/getAll:", entityName)
    return this.repositoryService.getAll(entityName)
          .pipe(
            //tap(data => this.db[entityName]=[...data["_emmbedded"][entityName]])
            tap(data => this.db[entityName]=[...data])
            ,map(data => data.map(entity => {
               // entity.usuario=entity.usuario.toUpperCase();
                return entity}))
            ,shareReplay(1)
          );
  }

  save (entityName: string, entity: any): Observable<any> {
    //console.log("service/save", entity);
    return this.repositoryService.save(entityName, entity)
      .pipe(
        tap(data => {
          console.log("res/Save", data);
          this.entity = data;
        }),
        catchError(error => {
          this.errorHandler(error);
          return throwError(() => error);
        })
      )
  }
 
  delete(entityName: string, entity: any): Observable<any> {
    //console.log("service/delete");
    return this.repositoryService.delete(entityName, entity.id)
      .pipe(
        tap(data => {
          console.log("response/delete", data);
        }),
        catchError(error => {
          this.errorHandler(error);
          return throwError(() => error);
        })
      )
  }  

/*
 
  login(entityName: string, entity: any): Observable<any> {
    return this.repositoryService.login(entityName, entity);
  }

  logout(): void {
    this.repositoryService.logout();
  }

  getAll(entityName: string): void {
    console.log("service/getAll");
    this.repositoryService.getAll(entityName)
      .pipe(
        tap(data => {
          console.log("res/getAll", data);
          this.db[entityName] = data;
        }),
        catchError(error => {
          this.errorHandler(error);
          return throwError(error)
        })
      )
      .subscribe();
  }

         return throwError(error);
        })
      )
      .subscribe();
  }
 save (entityName: string, entity: any): void {
    console.log("service/save", entity);
    this.repositoryService.save(entityName, entity)
      .pipe(
        tap(data => {
          console.log("res/Save", data);
          this.entity = data;
        }),
        catchError(error => {
          this.errorHandler(error);
  
 
      .subscribe();
 delete(entityName: string, entity: any): void {
    console.log("service/delete");
    this.repositoryService.delete(entityName, entity.id)
      .pipe(
        tap(data => {
          console.log("res/delete", data);
        }),
        catchError(error => {
          this.errorHandler(error);
          return throwError(error);
        })
      )
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
*/
  errorHandler(error: any): void {
    console.log("Error=", error);
    /*
    if (error.indexOf("Error Code: 401") >= 0) {
      console.log("not Found")
    }
    */
  }
 //
}