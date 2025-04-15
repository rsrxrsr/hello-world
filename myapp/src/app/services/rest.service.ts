import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest,  HttpResponse, HttpEventType, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

//import { Router } from '@angular/router';

//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  //private activatedRoute = inject(ActivatedRoute);

  //private apiServer = environment.apiServer;
  //private apiServer = 'https://effective-space-chainsaw-j49r5grgqvqcpp47-8080.app.github.dev'; // Ejemplo de API
  private apiServer = 'http://localhost:8080'; // Ejemplo de API


  constructor(private httpClient: HttpClient,
   	//private router: Router
  ) {}

  getUrl(entityName):string {
    //console.log("getUrl", this.apiServer + "/entity/restapi/" + entityUrl) 
    return this.apiServer + "/entity/restapi/" + entityName    //return this.apiServer + "/entity/" + entityName
  }

  private getHttpOptions() {
    let token = sessionStorage.getItem('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': 'Basic ' + token  
        //'Access-Control-Allow-Origin':'http://localhost:8080, http://localhost:4200',
        //'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        //'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, HEAD, OPTIONS',
      })
    }
    return httpOptions;
  }
  
  login(entityName, entity): Observable<any> {
    console.log("Rest/login ", entityName, entity);
    return this.httpClient.post<any>(this.getUrl(entityName) + '/login', JSON.stringify(entity), this.getHttpOptions())
      .pipe(catchError(this.errorHandler))
  }

  logout() {}

  getAll(entityName): Observable<any[]> {
    return this.httpClient.get<any[]>(this.getUrl(entityName))  //, this.getHttpOptions())
      .pipe(map (data => data["_embedded"][entityName].map(entity => {
                  entity.id=entity["_links"]["self"].href.split("/").pop();
            return entity}))
           ,shareReplay(1)
           , catchError(this.errorHandler))
  }

  save(entityName, entity): Observable<any> {
    console.log("Rest/save ", entityName, entity);
    let url = this.getUrl(entityName);
    return this.httpClient.post<any>(url, entity, this.getHttpOptions()) 
          .pipe(catchError(this.errorHandler)) // *** JSON.stringify(entity) ***
  }

  delete(entityName, id) {
    let url = `${this.getUrl(entityName)}/${id}`;
    console.log("Rest/delete ", url);
    return this.httpClient.delete<any>(url, this.getHttpOptions())
          .pipe(catchError(this.errorHandler))
  }

  fileUpload(formData): Observable<any>  {
    const urlUpload = this.apiServer + '/file/upload';
    let req = new HttpRequest('POST', urlUpload, formData, {reportProgress: true,});
    let progress, suceso;
    return new Observable<any>((observer) => {   
      this.httpClient.request(req).subscribe((event:any) => {
        //console.log("Rest watch", formData.get('file').name,event);  
        if (event.type === HttpEventType.UploadProgress) { // Look for upload progress events.
          progress = Math.round(100 * event.loaded / event.total);
          suceso={type:event.type, progress:progress, msg:`File is ${progress}% uploaded.`}
          observer.next(suceso)
          //console.log(`File is ${progress}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          if (event.status === 200) { 
            suceso={type:event.type, progress:progress, msg:'File uploaded!', id:event.body}
            //console.log('File uploaded!', event.body);
          } else {
            suceso={type:event.type, progress:progress, msg:"File no uploaded"}
            //console.log("File no uploaded")
          }
          observer.next(suceso)
        }
      })
    })   
  }

  errorHandler(error) {
    //console.log("errorHandler");
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else 
    // Get server-side error
      switch (error.status) {
        case 404:
          errorMessage = "Registro no encontrado";
          break;
        case 409:
          errorMessage = "Registro en conflicto";
          break
        default:
          errorMessage = `Code=${error.status}\nMessage: ${error.message}`;
    }    
    console.log("RestService", errorMessage);
    error.message = "Error: " + errorMessage;
    return throwError(() => (error));
  }

}
