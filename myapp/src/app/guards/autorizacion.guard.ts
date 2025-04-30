import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SecureService} from '../services/secure.service';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionGuard implements CanActivate {

  constructor(
    private router: Router,
    private secureService: SecureService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    console.log("Guard", next.routeConfig?.path || 'unknown path');
    if (this.secureService.showMenu[next.routeConfig?.path??'']) {
      return true;
    } else {
      console.log('No estás logueado y autorizado');
      this.router.navigate(['login']);  
      return false;
    } 
  }
  
}
