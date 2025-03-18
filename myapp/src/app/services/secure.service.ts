import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { EntityService} from './entity.service'; 

@ Injectable({
  providedIn: 'root'
})
export class SecureService {

  routes:any=[];
  isLogged:boolean=false;
  user:any={};
  showMenu:any={};
  token:any;

  constructor(
    private router: Router,
    private entityService: EntityService) { }
  
  login(entityName, entity) {
    this.entityService.login(entityName, entity)
    .subscribe( user => {
      console.log("login", user);   
      if (user.estatus=="Activo") {
        this.isLogged=true;
        this.user=user;
        //
        sessionStorage.setItem(
          'token',
          //'Basic ' + btoa(user.user + ':' + user.password)
          'Bearer ' + user.password
          //null ''
        );
        this.setAccessRole(user.roles)
        this.router.navigate(['/angular/home']);
      } else {
        this.isLogged=false;
        alert("Authentication failed.");
      }          
    })
  }

  logout() {
    window.sessionStorage.clear();
    this.entityService.logout();
  }

  setAccessRole(roles) {
    console.log("SetAccessRole");
    for (let route of this.routes) {
      if (route.data) {
        for (let rol of route.data) {
          this.showMenu[route.path]=roles.includes(rol);
        }  
      }
    }    
  }

}
