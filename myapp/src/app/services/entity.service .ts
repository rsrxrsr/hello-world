import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs'; 
import { tap, catchError } from 'rxjs/operators';

//import { FirebaseService } from './firebase.service'; 
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  entity: any = {};
  db: any | undefined;
  error: string | undefined;

  constructor(
    //private router: Router,
    public repositoryService: RestService
  ) { }

  getAll(entityName: string): void {
    this.repositoryService.getAll(entityName).subscribe({
      next: (data) => {
        this.db[entityName]= data["_embedded"]["usuarios"];
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }

  delete (entityName: string, entity: any): void {
    console.log("service/delete");
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
          return throwError(error);
        })
      )
      .subscribe();
  }

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
      .subscribe();
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
    if (error.indexOf("Error Code: 401") >= 0) {
      this.router.navigate(["login"]);
    }
  }
 */
}