import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../app.routes';

import { EntityService} from './entity.service'; 

@ Injectable({
  providedIn: 'root'
})
export class SecureService {

  private routes=routes;
  public isLogged:boolean=false;
  public user:any={};
  public showMenu:any={};
  private token:any;

  constructor(
    private router: Router,
    private entityService: EntityService) {}
  
  login(entityName, entity) {
    this.entityService.login(entityName, entity)
    .subscribe( user => {
      console.log("login", user);   
      if (user.permisos=="Forbiden") {
        this.isLogged=false;
        alert("Acceso no autorizado");
      } else {
        this.isLogged=true;
        this.user=user;
        sessionStorage.setItem(
          'token',
          //'Basic ' + btoa(user.user + ':' + user.password)
          'Bearer ' + user.password
          //null ''
        );
        this.setAccessRole(user.rutas)
        this.router.navigate(['/home']);
       }          
    })
  }

  logout() {
    this.isLogged=false;
    this.user="";
    window.sessionStorage.clear();
    this.entityService.logout();
  }

  setAccessRole(rutas) {
    console.log("SetAccessRole", rutas);
    this.showMenu=rutas;
/*
    for (let route of this.routes) {
        //console.log("Route", route.path, route.data);
        if (route.data && Array.isArray(route.data)) {
        //console.log("Array", route.data)  
        for (let rol of route.data) {
          if (route.path) {
            //console.log("path",route.path)
            if (roles.includes(rol)) {
              this.showMenu[route.path]=true;
              break;
            }
          }
        }
      }
    }
    //console.log("showMenu", this.showMenu);
  */      
  }

}
