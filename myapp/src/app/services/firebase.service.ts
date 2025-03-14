/*

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
//import * as firebase from 'firebase/app';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs : AngularFirestore,
              private storage: AngularFireStorage) { }

  getAll(coleccion): Observable<any> {
    console.log("Firebase/getAll ", coleccion);
    return this.afs.collection(coleccion).snapshotChanges()
    .pipe(
      map(snap => {
        let snapshot = [];
        snap.forEach(item => {
          let row = item.payload.doc.data();
          row["id"] = item.payload.doc.id;
          snapshot.push(row);
        })
        return snapshot
      }),
      catchError(this.errorHandler)
    )
  }

  findByName(coleccion: string, campo:string, operador, value) : Observable<any> {
    console.log("Firebase/findByName ", coleccion);
    return this.afs.collection(coleccion, ref => ref.where(campo, operador, value))
      .snapshotChanges().pipe(
        map(snap => {
          let snapshot = [];
          snap. forEach(doc => {
            let item=doc.payload.doc.data();
            item['id']=doc.payload.doc.id;
            snapshot.push(item);
          });
          return snapshot
        }),
        catchError(this.errorHandler)     
    )
  }

  save(coleccion, entity) : Observable<any> {
    console.log("Firebase/save ", coleccion, entity);
    return new Observable((observer) => {
      if (entity.id) {
        let doc = Object.assign({}, entity);
        delete doc.id;
        this.update(coleccion, entity.id, doc)
        .then(item => {
          return observer.next( entity );
        })
      } else {
        this.add(coleccion, entity)
        .then(item => {
          entity.id=item["id"];
          return observer.next( entity );
        })
      }
    })
  }  

  add(coleccion, doc) {
    return this.afs.collection(coleccion).add(doc)
      .catch(catchError(this.errorHandler));
  }

  update(coleccion, id, doc) {
    return this.afs.collection(coleccion).doc(id).update(doc)
      .catch(catchError(this.errorHandler));
  }

  delete(coleccion, id) {
    console.log("Firebase/delete ", coleccion, id);
    return new Observable((observer) => {
      this.afs.collection(coleccion).doc(id).delete()
      .then(item => { return observer.next( item );} )
      .catch(catchError(this.errorHandler))
    })       
  }

  // FileUpload
  public fileUpload(formData:any): Observable<any> {
    console.log("Subiendo", formData, "fin");
    let coleccion='DataUpload/'+formData.get('file').name;
    const file = this.storage.ref(coleccion);
    return new Observable<any>((observer) => {
      file.put(formData.get('file'))
      .then((snapshot:any) => {
        console.log("fileUpload!");
        file.getDownloadURL().subscribe(downloadUrl=>{
          //console.log(downloadUrl);
          let fileInfo = {
            name: snapshot.metadata.name,
            created: snapshot.metadata.timeCreated,
            downloadUrl: downloadUrl,
            fullPath: snapshot.metadata.fullPath,
            contentType: snapshot.metadata.contentType,
            size: snapshot.metadata.size,
            rk: formData.get('rk') }
          this.save('files',fileInfo).subscribe();
          let suceso={type:4, progress:100, id:snapshot.id, msg:'File uploaded!'}
          observer.next(suceso);
        }) 
      })
      .catch(error => {
        this.errorHandler(error)
      })
    })
  } 

   // Authentication
   login(entityName, entity) {
    console.log('Loging user ' + entity.user);
    let email="rsrxrsr@gmail.com";
    let password="Ventana6561";
    return new Observable<any>((observer) => {
      this.loginFirebase(email,password).then(user => {
        console.log('Credenciales correctas, ¡bienvenido!');
        this.findByName(entityName, "user", "==", entity.user)
        .subscribe(snap => {
          let res={}
          snap.forEach(user => {
            if (user.password==entity.password && user.estatus=="Activo") {
              res=user;
            }      
          })
          observer.next(res);
          observer.unsubscribe();       
        })
      })
      .catch(error => {
        console.log(error);
      })
    })
  }
  
   createUser(email, password) {
    console.log('Creando el usuario con email ' + email);  
    this.afs.firestore.app.auth().createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log('¡Creamos al usuario!');
    })
    .catch(function (error) {
      console.error(error)
    });
  }
  
  loginFirebase(email, password) {
    return this.afs.firestore.app.auth().signInWithEmailAndPassword(email, password);
  }
  
  logout() {
    this.afs.firestore.app.auth().signOut();
    console.log("Logout User");
  }

  errorHandler(error) {
    //console.log("errorHandler");
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}


*/
